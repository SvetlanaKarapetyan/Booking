import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Faculties } from "./Faculties";
import { Computers } from "./Computers";
import { LaboratoryBooking } from "./LaboratoryBooking";
import { SlotTimetables } from "./SlotTimetables";

@Entity()
export class Laboratories {
    @PrimaryGeneratedColumn()
    laboratory_id: number;

    @Column()
    number: string;

    @ManyToOne(() => Faculties, (faculty) => faculty.laboratories)
    faculty: Faculties;


    @OneToMany(() => Computers, (computer) => computer.laboratory)
    computers: Computers[];

    @OneToMany(() => LaboratoryBooking, (booking) => booking.laboratory)
    bookings: LaboratoryBooking[];

    @OneToMany(() => SlotTimetables, (slot) => slot.laboratory)
    slotTimetables: SlotTimetables[];
}
