import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { NursingStore } from '../../../application/nursing.store';
import { LayoutNursingHome } from '../../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';
import { MatIcon } from '@angular/material/icon';
import { RoomCommand } from '../../../domain/model/room.command';

@Component({
  selector: 'app-room-form',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    TranslatePipe,
    LayoutNursingHome,
    MatIcon
  ],
  templateUrl: './room-form.html',
  styleUrl: './room-form.css'
})
export class RoomForm {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private store = inject(NursingStore);

  form = this.fb.group({
    capacity:   new FormControl<number | null> (null,           { nonNullable: true, validators: [Validators.required] }),
    type:       new FormControl<string>        ('',          { nonNullable: true, validators: [Validators.required] }),
    roomNumber: new FormControl<string>        ('',          { nonNullable: true, validators: [Validators.required] })
  });

  submit() {
    if (this.form.invalid) {
      alert("Datos incompletos");
      this.form.markAllAsTouched();
      return;
    }

    const room = this.form.getRawValue();

    const command = new RoomCommand({
      capacity: room.capacity ?? 0,
      type: room.type,
      roomNumber: room.roomNumber
    });

    if (!confirm("¿Deseas guardar los cambios de la habitación?")) {
      return;
    }

    this.store.createRoomInNursingHome(1, command).subscribe({
      next: () => {
        this.router.navigate(['/rooms/list']).then();
        alert('Habitación registrada exitosamente');
      },
      error: (err) => {
        let errorMessage = 'Error al guardar la habitación.';

        if (err.error?.message) {
          errorMessage = `Error al guardar la habitación: ${err.error.message}`;
        } else if (typeof err.error === 'string') {
          errorMessage = `Error al guardar la habitación: ${err.error}`;
        }

        alert(errorMessage);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/rooms/list']).then();
  }
}
