import { AppDataSource } from "../data-source";
import { LaboratoryBooking } from "../entity/LaboratoryBooking";
import { Laboratories } from "../entity/Laboratories";
import { Users } from "../entity/Users";
import { SlotTimetables } from "../entity/SlotTimetables";
import { ComputerBooking } from "../entity/ComputerBooking";

export class LaboratoryBookingService {
    private laboratoryRepo = AppDataSource.getRepository(Laboratories);
    private labBookingRepo = AppDataSource.getRepository(LaboratoryBooking);
    private computerBookingRepo = AppDataSource.getRepository(ComputerBooking);
    private userRepo = AppDataSource.getRepository(Users);
    private slotRepo = AppDataSource.getRepository(SlotTimetables);

    async getAllBookings() {
        return this.labBookingRepo.find({ relations: ["user", "laboratory", "slot"] });
    }

    async getBookingById(id: number) {
        const booking = await this.labBookingRepo.findOne({
            where: { booking_id: id },
            relations: ["user", "laboratory", "slot"],
        });

        if (!booking) {
            throw new Error("Booking not found.");
        }

        return booking;
    }

    async bookLaboratory(userId: number, laboratoryId: number, bookingdate: Date, slotId: number) {
        const laboratory = await this.laboratoryRepo.findOne({ where: { laboratory_id: laboratoryId } });
        const user = await this.userRepo.findOne({ where: { id: userId } });
        const slot = await this.slotRepo.findOne({ where: { slot_id: slotId } });

        if (!laboratory || !user || !slot) {
            throw new Error("User, Laboratory, or Slot not found.");
        }

        const existingLabBooking = await this.labBookingRepo.findOne({
            where: { laboratory: { laboratory_id: laboratoryId }, bookingdate, slot },
        });

        if (existingLabBooking) {
            throw new Error("The laboratory is already booked for this slot.");
        }

        await this.computerBookingRepo.delete({
            computer: { laboratory: { laboratory_id: laboratoryId } },
            bookingdate,
            slot,
        });

        const newLabBooking = new LaboratoryBooking();
        newLabBooking.user = user;
        newLabBooking.laboratory = laboratory;
        newLabBooking.slot = slot;
        newLabBooking.bookingdate = bookingdate;

        return this.labBookingRepo.save(newLabBooking);
    }

    async deleteBooking(id: number) {
        const booking = await this.labBookingRepo.findOne({ where: { booking_id: id } });

        if (!booking) {
            return { message: "Booking not found." };
        }

        await this.labBookingRepo.remove(booking);
        return { message: "Booking deleted successfully." };
    }
}
