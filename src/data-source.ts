import { DataSource } from "typeorm";
import { Users } from "./entity/Users";
import { Faculties } from "./entity/Faculties";
import { Laboratories } from "./entity/Laboratories";
import { Computers } from "./entity/Computers";
import { Bookings } from "./entity/Bookings";
import { SlotTimetables } from "./entity/SlotTimetables";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "db.sqlite",
    synchronize: true,
    logging: false,
    entities: [Users, Faculties, Laboratories, Computers, Bookings, SlotTimetables],
    subscribers: [],
    migrations: [],
});
