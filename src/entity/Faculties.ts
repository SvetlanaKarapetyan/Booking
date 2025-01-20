import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Laboratories } from "./Laboratories";

@Entity()
export class Faculties {
    @PrimaryGeneratedColumn()
    faculty_id: number;

    @Column()
    name: string;

    @OneToMany(() => Laboratories, (laboratory) => laboratory.faculty)
    laboratories: Laboratories[];
}
