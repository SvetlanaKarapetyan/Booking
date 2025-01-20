import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./Users";
import { Laboratories } from "./Laboratories";
import { Computers } from "./Computers";

@Entity()
export class Bookings {
    @PrimaryGeneratedColumn()
    booking_id: number;

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Laboratories)
    laboratory: Laboratories;

    @ManyToOne(() => Computers)
    computer: Computers;

    @Column()
    date: Date;
}
