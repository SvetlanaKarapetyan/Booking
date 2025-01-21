import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Laboratories } from "./Laboratories";
import { Bookings } from "./Bookings";

export enum ComputerStatus {
    Working = "working",
    NotWorking = "not_working"
}

@Entity()
export class Computers {
    @PrimaryGeneratedColumn()
    computer_id: number;

    @Column({
        type: "simple-enum",
        enum: ComputerStatus,
        default: ComputerStatus.Working,
    })
    status: ComputerStatus;

    @ManyToOne(() => Laboratories, (laboratory) => laboratory.computers)
    laboratory: Laboratories;

    @OneToMany(() => Bookings, (booking) => booking.computer)
    bookings: Bookings[];
}
