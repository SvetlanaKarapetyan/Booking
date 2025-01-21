import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from "typeorm";
import { Laboratories } from "./Laboratories";

@Entity()
export class SlotTimetables {
    @PrimaryGeneratedColumn()
    slot_id: number;

    @ManyToOne(() => Laboratories, (laboratory) => laboratory.slotTimetables, { nullable: true })
    @JoinColumn({ name: "laboratory_id" })
    laboratory: Laboratories;

    @Column()
    start_time: string;

    @Column()
    end_time: string;
}
