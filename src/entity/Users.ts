import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { LaboratoryBooking } from "./LaboratoryBooking";

export enum UserRole {
    Admin = "admin",
    Lecturer = "lecturer",
    Student = "student",
}

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
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

    @OneToMany(() => LaboratoryBooking, (booking) => booking.user)
    bookings: LaboratoryBooking[];
}