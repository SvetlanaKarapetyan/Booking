import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Bookings } from "./Bookings";

export enum UserRole {
    Admin = "admin",
    Lecturer = "lecturer",
    Student = "student",
}

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        type: "simple-enum",
        enum: UserRole,
        default: UserRole.Admin
    })
    role: UserRole;

    @OneToMany(() => Bookings, (booking) => booking.user)
    bookings: Bookings[];
}