export class RoomCommand {
  capacity!: number;
  type!: string;
  roomNumber!: string;

  constructor(init?: Partial<RoomCommand>) {
    Object.assign(this, init);
  }
}
