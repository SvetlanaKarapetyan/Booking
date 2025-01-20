import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Bookings } from "./Bookings";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: ["admin", "lecturer", "student"],
        default: "student"
    })
    role: "admin" | "lecturer" | "student";

    @OneToMany(() => Bookings, (booking) => booking.user)
    bookings: Bookings[];
}