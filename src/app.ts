import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { AppDataSource } from "./data-source";
import { UserController } from "./controller/UserController";
import { LaboratoryController } from "./controller/LaboratoryController";
import { LaboratoryBookingController } from "./controller/LaboratoryBookingController";
import { ComputerController } from "./controller/ComputerController";
import { FacultyController } from "./controller/FacultyController";
import { SlotTimetableController } from "./controller/SlotTimetableController";
import {ComputerBookingController} from "./controller/ComputerBookingController";

const app = createExpressServer({
    controllers: [UserController, LaboratoryController, LaboratoryBookingController, FacultyController, SlotTimetableController, ComputerController, ComputerBookingController],
});

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected!");
        app.listen(3000, () => {
            console.log("Server is running on http://localhost:3000");
        });
    })
    .catch((error) => console.log("Database connection error:", error));