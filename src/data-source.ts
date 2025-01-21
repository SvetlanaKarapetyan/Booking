import { DataSource } from "typeorm";
import { Users } from "./entity/Users";
import { Faculties } from "./entity/Faculties";
import { Laboratories } from "./entity/Laboratories";
import { Computers } from "./entity/Computers";
import { LaboratoryBooking } from "./entity/LaboratoryBooking";
import { ComputerBooking } from "./entity/ComputerBooking";
import { SlotTimetables } from "./entity/SlotTimetables";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "db.sqlite",
    synchronize: true,
    logging: false,
    entities: [Users, Faculties, Laboratories, Computers, LaboratoryBooking, SlotTimetables, ComputerBooking],
    subscribers: [],
    migrations: [],
});
