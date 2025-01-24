import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Users } from "./Users";
import { Computers } from "./Computers";
import { SlotTimetables } from "./SlotTimetables";

@Entity()
export class ComputerBooking {
    @PrimaryGeneratedColumn()
    booking_id: number;

    @ManyToOne(() => Users)
    user: Users;

    @ManyToOne(() => Computers)
    computer: Computers;

    @ManyToOne(() => SlotTimetables, { nullable: true })
    slot: SlotTimetables;

    @Column()
    bookingdate: Date;
}
