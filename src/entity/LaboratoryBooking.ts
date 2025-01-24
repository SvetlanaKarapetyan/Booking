import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Users } from "./Users";
import { Laboratories } from "./Laboratories";
import { SlotTimetables } from "./SlotTimetables";

@Entity()
export class LaboratoryBooking {
    @PrimaryGeneratedColumn()
    booking_id: number;

    @ManyToOne(() => Users)
    user: Users;

    @ManyToOne(() => Laboratories)
    laboratory: Laboratories;

    @ManyToOne(() => SlotTimetables, { nullable: true })
    slot: SlotTimetables;

    @Column()
    bookingdate: Date;
}
