import { computed, Injectable, Signal, signal } from '@angular/core';
import { StaffMember } from '../domain/model/staff-member.entity';
import { StaffManagementApi } from '../infrastructure/staff-management-api';
import { retry } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class StaffManagementStore {
  private readonly _staffMemberSignal = signal<StaffMember[]>([]);
  private readonly _loadingSignal = signal<boolean>(false);
  private readonly _errorSignal = signal<string | null>(null);
  readonly error = this._errorSignal.asReadonly();
  readonly loading = this._loadingSignal.asReadonly();
  readonly staffMembers = this._staffMemberSignal.asReadonly();

  constructor(private staffManagementApi: StaffManagementApi) {
    this.loadStaffMembers();
  }

  addStaffMember(staffMember: StaffMember) {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.staffManagementApi.createStaffMember(staffMember).pipe(retry(2)).subscribe({
      next: createdStaffMember => {
        this._staffMemberSignal.update(staffMembers => [...staffMembers, createdStaffMember]);
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to create staff member'));
        this._loadingSignal.set(false);
      }
    });
  }

  getStaffMemberById(id: number): Signal<StaffMember | undefined> {
    return computed(() => id ? this.staffMembers().find(s => s.id === id) : undefined);
  }

  deleteStaff(id: number): void {
    this._loadingSignal.set(false);
    this._errorSignal.set(null);
    this.staffManagementApi.deleteStaffMember(id).pipe(retry(2)).subscribe({
      next: () => {
        this._staffMemberSignal.update(staffMembers => staffMembers.filter(s => s.id !== id));
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to delete staff member'));
        this._loadingSignal.set(false);
      }
    })
  }

  updateStaff(staffMember: StaffMember) {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.staffManagementApi.updateStaffMember(staffMember).pipe(retry(2)).subscribe({
      next: updatedStaffMember => {
        this._staffMemberSignal.update(staffMembers => staffMembers.map(s => s.id == updatedStaffMember.id ? updatedStaffMember : s));
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to update staff member'));
        this._loadingSignal.set(false);
      }
    })
  }

  loadStaffMembers() {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.staffManagementApi.getStaffMembers().pipe(takeUntilDestroyed()).subscribe({
      next: staffMember => {
        this._staffMemberSignal.set(staffMember);
        this._loadingSignal.set(false);
      }
    })
  }

  formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found') ? `${fallback}: Not Found` : error.message;
    }
    return fallback;
  }
}
