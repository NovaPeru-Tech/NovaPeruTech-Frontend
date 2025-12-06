import {Component, inject, OnInit} from '@angular/core';
import {LayoutNursingHome} from '../../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';
import {ActivatedRoute, Router} from '@angular/router';
import {HcmStore} from '../../../application/hcm.store';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {UpdateContractStatusCommand} from '../../../domain/model/update-contract-status.command';
import {MatButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-update-contract-status-form',
  imports: [
    LayoutNursingHome,
    MatButton,
    MatIcon,
    ReactiveFormsModule,
    MatCard,
    TranslatePipe,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatError
  ],
  templateUrl: './update-contract-status-form.html',
  styleUrl: './update-contract-status-form.css'
})
export class UpdateContractStatusForm implements OnInit {
  protected store = inject(HcmStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  staffMemberId: number | null = null;
  contractId: number | null = null;
  currentStatus: string = '';

  form = this.fb.group({
    newStatus: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.staffMemberId = params['staffMemberId'] ? +params['staffMemberId'] : null;
      this.contractId = params['id'] ? +params['id'] : null;

      if (this.staffMemberId && this.contractId) {
        this.store.loadContracts(this.staffMemberId);

        const contract = this.store.contracts().find(c => c.id === this.contractId);
        if (contract) {
          this.currentStatus = contract.status || '';
        }
      }
    });
  }

  /**
   * Handles form submission
   */
  submit(): void {
    if (this.form.invalid) {
      alert('Please select a new status');
      this.form.markAllAsTouched();
      return;
    }

    if (!this.staffMemberId || !this.contractId) {
      alert('Staff member ID or Contract ID not found');
      return;
    }

    const statusData = this.form.getRawValue();

    // Check if new status is different from current
    if (statusData.newStatus === this.currentStatus) {
      alert('The selected status is the same as the current status');
      return;
    }

    const updateContractStatusCommand = new UpdateContractStatusCommand({
      newStatus: statusData.newStatus
    });

    this.store.updateContractStatus(this.staffMemberId!, this.contractId!, updateContractStatusCommand);

    this.router.navigate(['/hcm/staff', this.staffMemberId!, 'contracts']).then();
  }

  /**
   * Cancels form and navigates back
   */
  cancel() {
    this.router.navigate(['/hcm/staff', this.staffMemberId!, 'contracts']).then();
  }

  /**
   * Gets the icon for each status
   */
  getStatusIcon(status: string): string {
    switch (status) {
      case 'ACTIVE':
        return 'check_circle';
      case 'TERMINATED':
        return 'cancel';
      case 'SUSPENDED':
        return 'pause_circle';
      case 'PENDING':
        return 'schedule';
      default:
        return 'help';
    }
  }

  /**
   * Gets the description for each status
   */
  getStatusDescription(status: string): string {
    switch (status) {
      case 'ACTIVE':
        return 'contract.status.active-description';
      case 'TERMINATED':
        return 'contract.status.terminated-description';
      case 'SUSPENDED':
        return 'contract.status.suspended-description';
      case 'PENDING':
        return 'contract.status.pending-description';
      default:
        return '';
    }
  }
}
