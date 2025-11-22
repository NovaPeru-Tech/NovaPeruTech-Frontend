import { computed, Injectable, Signal, signal } from '@angular/core';
import { StaffMember } from '../domain/model/staff-member.entity';
import { HcmApi } from '../infrastructure/hcm-api';
import {catchError, Observable, retry, tap, throwError} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Contract } from '../domain/model/contract.entity';
import {CreateStaffMemberCommand} from '../domain/commands/create-staff-member-command';

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

  constructor(private hcmApi: HcmApi) {
    this.loadStaffByNursingHome(1);
    this.loadContracts();
  }

  addStaffMember(staffMember: StaffMember) {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.hcmApi.createStaffMember(staffMember).pipe(retry(2)).subscribe({
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

  updateStaffMember(staffMemberId: number, command: CreateStaffMemberCommand): Observable<StaffMember> {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    return this.hcmApi.updateStaffMember(staffMemberId, command).pipe(retry(2),
      tap(updatedStaffMember => {
        this._staffMemberSignal.update(staff =>
          staff.map(s => s.id == updatedStaffMember.id ? updatedStaffMember : s)
        );
        this._loadingSignal.set(false);
      }),
      catchError(err => {
        this._errorSignal.set(this.formatError(err, 'Failed to update staff member'));
        this._loadingSignal.set(false);
        return throwError(() => err);
      })
    );
  }

  addContract(contract: Contract) {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.hcmApi.createContract(contract).pipe(retry(2)).subscribe({
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

  createStaffMemberInNursingHome(nursingHomeId: number, command: CreateStaffMemberCommand): Observable<StaffMember> {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);

    return this.hcmApi.createStaffMemberToNursingHome(nursingHomeId, command).pipe(retry(2),
      tap(createdStaffMember => {
        this._staffMemberSignal.update(staff => [...staff, createdStaffMember]);
        this._loadingSignal.set(false);
      }),
      catchError(err => {
        this._errorSignal.set(this.formatError(err, 'Failed to create staff member in nursing home'));
        this._loadingSignal.set(false);
        return throwError(() => err);
      })
    );
  }

  loadStaffByNursingHome(nursingHomeId: number) {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);

    this.hcmApi.getStaffByNursingHome(nursingHomeId).pipe(takeUntilDestroyed()).subscribe({
      next: staff => {
        this._staffMemberSignal.set(staff);
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to load staff for nursing home'));
        this._loadingSignal.set(false);
      }
    });
  }

  loadStaff() {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.hcmApi.getStaffMembers().pipe(takeUntilDestroyed()).subscribe({
      next: staffMember => {
        this._staffMemberSignal.set(staffMember);
        this._loadingSignal.set(false);
      }
    })
  }

  loadContracts() {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.hcmApi.getContracts().pipe(takeUntilDestroyed()).subscribe({
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
