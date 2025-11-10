import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Room } from '../../../domain/model/room.entity';
import { TranslatePipe } from '@ngx-translate/core';
import { MatSelect, MatOption } from '@angular/material/select';
import { NursingStore } from '../../../application/nursing.store';
import { LayoutNursingHome } from '../../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';
import { MatIcon } from '@angular/material/icon';

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
    MatSelect,
    MatOption,
    LayoutNursingHome,
    MatIcon
  ],
  templateUrl: './room-form.html',
  styleUrl: './room-form.css'
})
export class RoomForm {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(NursingStore);

  form = this.fb.group({
    number:   new FormControl<string> ('',          { nonNullable: true, validators: [Validators.required] }),
    capacity: new FormControl<number> (0,           { nonNullable: true, validators: [Validators.required] }),
    occupied: new FormControl<number> (0,           { nonNullable: true }),
    type:     new FormControl<string> ('',          { nonNullable: true, validators: [Validators.required] }),
    status:   new FormControl<string> ('Available', { nonNullable: true, validators: [Validators.required] })
  });
  isEdit = false;
  roomId: number | null = null;

  constructor() {
    this.route.params.subscribe(params => {
      this.roomId = params['id'] ? +params['id'] : null;
      this.isEdit = !!this.roomId;
      if (this.isEdit && this.roomId) {
        let id = this.roomId;
        const room = this.store.getRoomById(id)();
        if (room) {
          this.form.patchValue({
            number: room.number,
            capacity: room.capacity,
            occupied: room.occupied,
            type: room.type,
            status: room.status
          });
        }
      }
    });
  }

  submit() {
    if (this.form.invalid) return;
    const room: Room = new Room({
      id: this.roomId ?? 0,
      number: this.form.value.number!,
      capacity: this.form.value.capacity!,
      occupied: this.form.value.occupied! ?? 0,
      type: this.form.value.type!,
      status: this.form.value.status!
    });

    if(this.isEdit) {
      if(this.form.value.capacity! < this.form.value.occupied!){
        alert('The maximum capacity cannot be less than the number of occupants.')
        return;
      }
      this.store.updateRoom(room);
    }
    else {
      this.store.addRoom(room);
    }

    this.router.navigate(['/rooms/list']).then();
  }

  onCancel(): void {
    this.router.navigate(['/rooms/list']).then();
  }
}
