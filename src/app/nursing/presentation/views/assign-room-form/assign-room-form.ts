import {Component, computed, inject} from '@angular/core';
import {NursingStore} from '../../../application/nursing.store';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AssignRoomCommand} from '../../../domain/model/assign-room.command';
import {TranslatePipe} from '@ngx-translate/core';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {LayoutNursingHome} from '../../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';
import {MatIcon} from '@angular/material/icon';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-assign-room-form',
  imports: [
    TranslatePipe,
    MatCard,
    MatIcon,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatError,
    MatButton,
    LayoutNursingHome
  ],
  templateUrl: './assign-room-form.html',
  styleUrl: './assign-room-form.css'
})
export class AssignRoomForm {
  protected store = inject(NursingStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  residentId: number | null = null;

  form = new FormGroup({
    roomNumber: new FormControl<string>('',   { nonNullable: true, validators: [Validators.required] })
  });

  resident = computed(() => {
    if (!this.residentId) return undefined;
    return this.store.residents().find(r => r.id === this.residentId);
  });

  availableRooms = computed(() => {
    return this.store.rooms().filter(room => room.status === 'AVAILABLE' || room.status === 'PARTIALLY_OCCUPIED');
  });

  selectedRoom = computed(() => {
    const roomNumber = this.form.value.roomNumber;
    if (!roomNumber) return null;
    return this.availableRooms().find(r => r.roomNumber === roomNumber);
  });

  get loading() {
    return this.store.loading();
  }

  get error() {
    return this.store.error();
  }

  constructor() {
    this.route.params.subscribe(params => {
      this.residentId = +params['id'];
      this.store.loadResidentsByNursingHome(1);
      this.store.loadRoomsByNursingHome(1);
    });
  }

  submit() {
    if (this.form.valid && this.residentId) {
      const roomNumber = this.form.value.roomNumber!;

      const assignRoomCommand = new AssignRoomCommand({
        roomNumber: roomNumber
      });

      this.store.assignRoom(1, this.residentId, assignRoomCommand);

      alert('Habitación asignada exitosamente');

      this.router.navigate(['/residents/list']).then();
    } else {
      this.form.markAllAsTouched();
    }
  }

  onCancel() {
    this.router.navigate(['/residents/list']).then();
  }

  getRoomCapacityInfo(room: any): string {
    const occupied = room.occupied || 0;
    const total = room.capacity || 0;
    return `${occupied}/${total}`;
  }

  getRoomTypeLabel(type: string): string {
    const types: { [key: string]: string } = {
      'single': 'Single',
      'double': 'Double',
      'shared': 'Shared',
      'suite': 'Suite'
    };
    return types[type.toLowerCase()] || type;
  }
}
