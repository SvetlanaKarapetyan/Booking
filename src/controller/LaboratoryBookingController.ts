import { JsonController, Get, Post, Delete, Body, Param } from "routing-controllers";
import { AppDataSource } from "../data-source";
import { LaboratoryBooking } from "../entity/LaboratoryBooking";

@JsonController("/laboratory-bookings")
export class LaboratoryBookingController {
    @Get()
    async getAll() {
        const bookingRepository = AppDataSource.getRepository(LaboratoryBooking);
        return bookingRepository.find({ relations: ["user", "laboratory", "slot"] });
    }

    @Get("/:id")
    async getById(@Param("id") id: number) {
        const bookingRepository = AppDataSource.getRepository(LaboratoryBooking);
        return bookingRepository.findOne({
            where: { booking_id: id },
            relations: ["user", "laboratory", "slot"],
        });
    }

    @Post()
    async createBooking(@Body() bookingData: Partial<LaboratoryBooking>) {
        const bookingRepository = AppDataSource.getRepository(LaboratoryBooking);
        const booking = bookingRepository.create(bookingData);
        return bookingRepository.save(booking);
    }

    @Delete("/:id")
    async deleteBooking(@Param("id") id: number) {
        const bookingRepository = AppDataSource.getRepository(LaboratoryBooking);
        const booking = await bookingRepository.findOne({ where: { booking_id: id } });

        if (!booking) {
            return { message: "Booking not found" };
        }

        await bookingRepository.remove(booking);
        return { message: "Booking deleted successfully" };
    }
}
