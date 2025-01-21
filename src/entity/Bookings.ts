import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Users } from "./Users";
import { Laboratories } from "./Laboratories";
import { Computers } from "./Computers";

@Entity()
export class Bookings {
    @PrimaryGeneratedColumn()
    booking_id: number;

    @ManyToOne(() => Users)
    user: Users;

    @ManyToOne(() => Laboratories)
    laboratory: Laboratories;

    @ManyToOne(() => Computers)
    computer: Computers;

    @Column()
    date: Date;
}
