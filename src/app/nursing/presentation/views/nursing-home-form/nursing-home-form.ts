import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NursingHome} from '../../../domain/model/nursing-home.entity';
import {TranslatePipe} from '@ngx-translate/core';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {Toolbar} from '../../../../shared/presentation/components/toolbar/toolbar';
import {NursingStore} from '../../../application/nursing.store';

/*
* @purpose: Component for Nursing Home Registration Form
* @description: This component provides a form for registering a new nursing home, including fields for name, RUC, phone number, address, and description. It handles form validation and submission to the NursingStore.
* */

@Component({
  selector: 'app-nursing-home-form',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatButton,
    Toolbar
  ],
  templateUrl: './nursing-home-form.html',
  styleUrl: './nursing-home-form.css'
})

/*
* @purpose: Class for Nursing Home Registration Form
* @description: This class implements the logic for the nursing home registration form, including form controls, validation, and submission handling.
* */

export class NursingHomeForm {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(NursingStore);

  form = this.fb.group({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    ruc: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    phoneNumber: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    address: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  isEdit = false;
  adminId: number | null = null;

  /*
* @purpose: Initialize Nursing Home Form Component
* @description: The constructor initializes the component, subscribes to route query parameters to retrieve the adminId, and sets up the form controls with validation.
* */

  constructor() {
    this.route.queryParams.subscribe(params => {
      this.adminId = params['adminId'] ? Number(params['adminId']) : null;
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const newNursingHome = new NursingHome({
      id: 0,
      name: this.form.value.name!,
      ruc: this.form.value.ruc!,
      phoneNumber: this.form.value.phoneNumber!,
      address: this.form.value.address!,
      description: this.form.value.description!,
      adminId: this.adminId!
    });

    this.store.addNursingHome(newNursingHome);

    this.router.navigate(['/nursing-homes']).then();
  }

}
