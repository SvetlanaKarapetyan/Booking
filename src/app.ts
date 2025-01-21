import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { AppDataSource } from "./data-source";
import { UserController } from "./controller/UserController";
import { LaboratoryController } from "./controller/LaboratoryController";
import { BookingController } from "./controller/BookingController";
import { ComputerController } from "./controller/ComputerController";
import { FacultyController } from "./controller/FacultyController";
import { SlotTimetableController } from "./controller/SlotTimetable";

const app = createExpressServer({
    controllers: [UserController, LaboratoryController, BookingController, FacultyController, SlotTimetableController, ComputerController],
});

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected!");
        app.listen(3000, () => {
            console.log("Server is running on http://localhost:3000");
        });
    })
    .catch((error) => console.log("Database connection error:", error));