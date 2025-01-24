import { AppDataSource } from "../data-source";
import { LaboratoryBooking } from "../entity/LaboratoryBooking";
import { ComputerBooking } from "../entity/ComputerBooking";
import { Users } from "../entity/Users";
import { Laboratories } from "../entity/Laboratories";
import { SlotTimetables } from "../entity/SlotTimetables";

export class LaboratoryBookingService {
    static async bookLaboratory(userId: number, laboratoryId: number, bookingdate: Date, slotId: number) {
        const laboratoryRepo = AppDataSource.getRepository(Laboratories);
        const labBookingRepo = AppDataSource.getRepository(LaboratoryBooking);
        const computerBookingRepo = AppDataSource.getRepository(ComputerBooking);
        const userRepo = AppDataSource.getRepository(Users);
        const slotRepo = AppDataSource.getRepository(SlotTimetables);

        const laboratory = await laboratoryRepo.findOne({ where: { laboratory_id: laboratoryId } });
        const user = await userRepo.findOne({ where: { id: userId } });
        const slot = await slotRepo.findOne({ where: { slot_id: slotId } });

        if (!laboratory || !user || !slot) {
            throw new Error("User, Laboratory, or Slot not found.");
        }

        const existingLabBooking = await labBookingRepo.findOne({
            where: { laboratory: { laboratory_id: laboratoryId }, bookingdate, slot },
        });

        if (existingLabBooking) {
            throw new Error("The laboratory is already booked for this slot.");
        }

        await computerBookingRepo.delete({
            computer: { laboratory: { laboratory_id: laboratoryId } },
            bookingdate,
            slot,
        });
        const newLabBooking = new LaboratoryBooking();
        newLabBooking.user = user;
        newLabBooking.laboratory = laboratory;
        newLabBooking.slot = slot;
        newLabBooking.bookingdate = bookingdate;

        await labBookingRepo.save(newLabBooking);
        return newLabBooking;
    }
}
