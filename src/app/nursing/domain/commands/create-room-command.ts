export class CreateRoomCommand {
  capacity!: number;
  type!: string;
  roomNumber!: string;

  constructor(init?: Partial<CreateRoomCommand>) {
    Object.assign(this, init);
  }
}
