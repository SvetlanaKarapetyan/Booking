import { JsonController, Get, Post, Delete, Body, Param } from "routing-controllers";
import { AppDataSource } from "../data-source";
import { ComputerBooking } from "../entity/ComputerBooking";

@JsonController("/computer-bookings")
export class ComputerBookingController {
    @Get()
    async getAll() {
        const bookingRepository = AppDataSource.getRepository(ComputerBooking);
        return bookingRepository.find({ relations: ["user", "computer", "slot"] });
    }

    @Get("/:id")
    async getById(@Param("id") id: number) {
        const bookingRepository = AppDataSource.getRepository(ComputerBooking);
        return bookingRepository.findOne({
            where: { booking_id: id },
            relations: ["user", "computer", "slot"],
        });
    }

    @Post()
    async createBooking(@Body() bookingData: Partial<ComputerBooking>) {
        const bookingRepository = AppDataSource.getRepository(ComputerBooking);
        const booking = bookingRepository.create(bookingData);
        return bookingRepository.save(booking);
    }

    @Delete("/:id")
    async deleteBooking(@Param("id") id: number) {
        const bookingRepository = AppDataSource.getRepository(ComputerBooking);
        const booking = await bookingRepository.findOne({ where: { booking_id: id } });

        if (!booking) {
            return { message: "Booking not found" };
        }

        await bookingRepository.remove(booking);
        return { message: "Booking deleted successfully" };
    }
}
