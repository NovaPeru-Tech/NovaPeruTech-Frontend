import {Component, inject} from '@angular/core';
import {NursingStore} from '../../../application/nursing.store';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {CreateAllergyCommand} from '../../../domain/model/create-allergy.command';
import {LayoutNursingHome} from '../../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';
import {MatCard} from '@angular/material/card';
import {MatInput} from '@angular/material/input';
import {TranslatePipe} from '@ngx-translate/core';
import {MatButton} from '@angular/material/button';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-allergy-form',
  imports: [
    LayoutNursingHome,
    MatCard,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatSelect,
    MatOption,
    TranslatePipe,
    MatButton,
    MatIcon,
    MatProgressSpinner
  ],
  templateUrl: './allergy-form.html',
  styleUrl: './allergy-form.css'
})
export class AllergyForm {
  protected store = inject(NursingStore);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  residentId: number | null = null;

  form = this.fb.group({
    allergenName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)]
    }),
    reaction: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]
    }),
    severityLevel: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    typeOfAllergy: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  constructor() {
    this.route.params.subscribe(params => {
      const id = params['id'] ? +params['id'] : null;
      this.residentId = id;
      if (!id) {
        this.router.navigate(['nursing/residents', id, 'medical-records']).then();
        return;
      }
    });
  }

  /**
   * Handles form submission
   */
  submit(): void {
    if (this.form.invalid) {
      alert('Please complete all required fields');
      this.form.markAllAsTouched();
      return;
    }

    const allergyData = this.form.getRawValue();

    const createAllergyCommand = new CreateAllergyCommand({
      allergenName: allergyData.allergenName,
      reaction: allergyData.reaction,
      severityLevel: allergyData.severityLevel,
      typeOfAllergy: allergyData.typeOfAllergy
    });

    this.store.addAllergy(this.residentId!, createAllergyCommand);

    this.router.navigate(['/nursing/residents', this.residentId!, 'medical-records']).then();
  }

  /**
   * Cancels form and navigates back
   */
  cancel(): void {
    this.router.navigate(['/nursing/residents', this.residentId!, 'medical-records']).then();
  }
}
