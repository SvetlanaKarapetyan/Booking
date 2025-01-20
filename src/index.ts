import { AppDataSource } from "./data-source";
import { Users } from "./entity/Users";
import { Faculties } from "./entity/Faculties";
import { Laboratories } from "./entity/Laboratories";
import { Computers } from "./entity/Computers";
import { Bookings } from "./entity/Bookings";
import { SlotTimetables } from "./entity/SlotTimetables";
import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { UserController } from "./controller/UserController"; // Ցույց տվեցինք նախկինում


const main = async () => {
        await AppDataSource.initialize();

        // Creating entities and saving data to the database
        const faculty = new Faculties();
        faculty.name = "Faculty of Engineering";
        await AppDataSource.manager.save(faculty);

        const laboratory = new Laboratories();
        laboratory.number = "Lab 101";
        laboratory.faculty = faculty;
        await AppDataSource.manager.save(laboratory);

        const computer = new Computers();
        computer.status = "Available";
        computer.laboratory = laboratory;
        await AppDataSource.manager.save(computer);

        const user = new Users();
        user.name = "John Doe";
        user.email = "john@example.com";
        user.password = "password";
        user.role = "student";
        await AppDataSource.manager.save(user);

        const booking = new Bookings();
        booking.user = user;
        booking.laboratory = laboratory;
        booking.computer = computer;
        booking.date = new Date("2024-12-20");
        await AppDataSource.manager.save(booking);

        // Creating and saving SlotTimetables
        const slotTimetable = new SlotTimetables();
        slotTimetable.laboratory = laboratory;
        slotTimetable.day_of_week = "Monday";
        slotTimetable.start_time = "09:00 AM";
        slotTimetable.end_time = "12:00 PM";
        await AppDataSource.manager.save(slotTimetable);

        console.log("Data saved!");
};

main().catch((error) => console.log(error));

const app = createExpressServer({
        controllers: [UserController],  // Կենտրոնացնում ենք controller-ը
});

app.listen(3000, () => {
        console.log("Server started on http://localhost:3000");
});