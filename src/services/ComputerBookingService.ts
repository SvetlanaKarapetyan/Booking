import { AppDataSource } from "../data-source";
import { LaboratoryBooking } from "../entity/LaboratoryBooking";
import { ComputerBooking } from "../entity/ComputerBooking";
import { Users } from "../entity/Users";
import { Computers } from "../entity/Computers";
import { SlotTimetables } from "../entity/SlotTimetables";

export class ComputerBookingService {
    static async bookComputer(userId: number, computerId: number, bookingdate: Date, slotId: number) {
        const computerRepo = AppDataSource.getRepository(Computers);
        const computerBookingRepo = AppDataSource.getRepository(ComputerBooking);
        const labBookingRepo = AppDataSource.getRepository(LaboratoryBooking);
        const userRepo = AppDataSource.getRepository(Users);
        const slotRepo = AppDataSource.getRepository(SlotTimetables);

        const computer = await computerRepo.findOne({
            where: { computer_id: computerId },
            relations: ["laboratory"],
        });
        const user = await userRepo.findOne({ where: { id: userId } });
        const slot = await slotRepo.findOne({ where: { slot_id: slotId } });

        if (!computer || !user || !slot) {
            throw new Error("User, Computer, or Slot not found.");
        }

        const existingLabBooking = await labBookingRepo.findOne({
            where: { laboratory: { laboratory_id: computer.laboratory.laboratory_id }, bookingdate, slot },
        });

        if (existingLabBooking) {
            throw new Error("The laboratory containing this computer is already booked.");
        }

        const existingComputerBooking = await computerBookingRepo.findOne({
            where: { computer: { computer_id: computerId }, bookingdate, slot },
        });

        if (existingComputerBooking) {
            throw new Error("This computer is already booked for the selected slot.");
        }

        const newComputerBooking = new ComputerBooking();
        newComputerBooking.user = user;
        newComputerBooking.computer = computer;
        newComputerBooking.slot = slot;
        newComputerBooking.bookingdate = bookingdate;

        await computerBookingRepo.save(newComputerBooking);
        return newComputerBooking;
    }
}
