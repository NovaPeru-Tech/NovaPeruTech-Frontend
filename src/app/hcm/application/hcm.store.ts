import { computed, Injectable, Signal, signal } from '@angular/core';
import { StaffMember } from '../domain/model/staff-member.entity';
import { HcmApi } from '../infrastructure/hcm-api';
import { retry } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Contract } from '../domain/model/contract.entity';
import { CreateStaffMemberCommand } from '../domain/model/create-staff-member.command';
import { CreateContractCommand } from '../domain/model/create-contract.command';

@Injectable({
  providedIn: 'root'
})
export class HcmStore {
  private readonly _staffMemberSignal = signal<StaffMember[]>([]);
  private readonly _contractSignal = signal<Contract[]>([]);
  private readonly _loadingSignal = signal<boolean>(false);
  private readonly _errorSignal = signal<string | null>(null);
  readonly error = this._errorSignal.asReadonly();
  readonly loading = this._loadingSignal.asReadonly();
  readonly staff = this._staffMemberSignal.asReadonly();
  readonly contracts = this._contractSignal.asReadonly();

  constructor(private hcmApi: HcmApi) {}

  addStaffMember(nursingHomeId: number, staffMemberCommand: CreateStaffMemberCommand) {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.hcmApi.createStaffMember(nursingHomeId, staffMemberCommand).pipe(retry(2)).subscribe({
      next: createdStaffMember => {
        this._staffMemberSignal.update(staff => [...staff, createdStaffMember]);
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to create staff member'));
        this._loadingSignal.set(false);
      }
    });
  }

  getStaffMemberById(id: number): Signal<StaffMember | undefined> {
    return computed(() => id ? this.staff().find(s => s.id === id) : undefined);
  }

  deleteStaffMember(id: number): void {
    this._loadingSignal.set(false);
    this._errorSignal.set(null);
    this.hcmApi.deleteStaffMember(id).pipe(retry(2)).subscribe({
      next: () => {
        this._staffMemberSignal.update(staffMembers => staffMembers.filter(s => s.id !== id));
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to delete staff member'));
        this._loadingSignal.set(false);
      }
    })
  }

  updateStaffMember(staffMemberId: number, staffMemberCommand: CreateStaffMemberCommand): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.hcmApi.updateStaffMember(staffMemberId, staffMemberCommand).pipe(retry(2)).subscribe({
      next: updatedStaffMember => {
        this._staffMemberSignal.update(staff =>
        staff.map(sta => sta.id === updatedStaffMember.id ? updatedStaffMember : sta));
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to update staff member'));
        this._loadingSignal.set(false);
      }
    });
  }

  addContract(staffMemberId: number, contractCommand: CreateContractCommand): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.hcmApi.createContract(staffMemberId, contractCommand).pipe(retry(2)).subscribe({
      next: createdContract => {
        this._contractSignal.update(contracts => [...contracts, createdContract]);
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to create contract'));
        this._loadingSignal.set(false);
      }
    });
  }

  getContractById(id: number): Signal<Contract | undefined> {
    return computed(() => id ? this.contracts().find(c => c.id === id) : undefined);
  }

  loadStaff(nursingHomeId: number): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.hcmApi.getStaffMembers(nursingHomeId).pipe(takeUntilDestroyed()).subscribe({
      next: staff => {
        this._staffMemberSignal.set(staff);
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to load staff'));
        this._loadingSignal.set(false);
      }
    });
  }

  loadContracts(staffMemberId: number) {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.hcmApi.getContracts(staffMemberId).pipe(takeUntilDestroyed()).subscribe({
      next: contract => {
        this._contractSignal.set(contract);
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
