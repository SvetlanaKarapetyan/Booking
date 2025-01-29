import { AppDataSource } from "../data-source";
import { ComputerBooking } from "../entity/ComputerBooking";
import { Computers } from "../entity/Computers";
import { Users } from "../entity/Users";
import { SlotTimetables } from "../entity/SlotTimetables";
import { LaboratoryBooking } from "../entity/LaboratoryBooking";

export class ComputerBookingService {
    private computerRepo = AppDataSource.getRepository(Computers);
    private computerBookingRepo = AppDataSource.getRepository(ComputerBooking);
    private labBookingRepo = AppDataSource.getRepository(LaboratoryBooking);
    private userRepo = AppDataSource.getRepository(Users);
    private slotRepo = AppDataSource.getRepository(SlotTimetables);

    async getAllBookings() {
        return this.computerBookingRepo.find({ relations: ["user", "computer", "slot"] });
    }

    async getBookingById(id: number) {
        const booking = await this.computerBookingRepo.findOne({
            where: { booking_id: id },
            relations: ["user", "computer", "slot"],
        });

        if (!booking) {
            throw new Error("Booking not found.");
        }

        return booking;
    }

    async bookComputer(userId: number, computerId: number, bookingdate: Date, slotId: number) {
        const computer = await this.computerRepo.findOne({
            where: { computer_id: computerId },
            relations: ["laboratory"],
        });
        const user = await this.userRepo.findOne({ where: { id: userId } });
        const slot = await this.slotRepo.findOne({ where: { slot_id: slotId } });

        if (!computer || !user || !slot) {
            throw new Error("User, Computer, or Slot not found.");
        }

        const existingLabBooking = await this.labBookingRepo.findOne({
            where: { laboratory: { laboratory_id: computer.laboratory.laboratory_id }, bookingdate, slot },
        });

        if (existingLabBooking) {
            throw new Error("The laboratory containing this computer is already booked.");
        }

        const existingComputerBooking = await this.computerBookingRepo.findOne({
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

        return this.computerBookingRepo.save(newComputerBooking);
    }

    async deleteBooking(id: number) {
        const booking = await this.computerBookingRepo.findOne({ where: { booking_id: id } });

        if (!booking) {
            return { message: "Booking not found." };
        }

        await this.computerBookingRepo.remove(booking);
        return { message: "Booking deleted successfully." };
    }
}
