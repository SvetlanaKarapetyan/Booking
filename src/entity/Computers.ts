import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Laboratories } from "./Laboratories";
import { Bookings } from "./Bookings";

@Entity()
export class Computers {
    @PrimaryGeneratedColumn()
    computer_id: number;

    @Column()
    status: string;

    @ManyToOne(() => Laboratories, (laboratory) => laboratory.computers)
    laboratory: Laboratories;

    @OneToMany(() => Bookings, (booking) => booking.computer)
    bookings: Bookings[];
}
