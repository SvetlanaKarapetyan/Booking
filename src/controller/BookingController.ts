import { JsonController, Get, Post, Body, Param } from "routing-controllers";
import { AppDataSource } from "../data-source";
import { Bookings } from "../entity/Bookings";

@JsonController("/bookings")
export class BookingController {
    @Get()
    async getAll() {
        const bookingRepository = AppDataSource.getRepository(Bookings);
        return bookingRepository.find();
    }

    @Get("/:id")
    async getOne(@Param("id") id: number) {
        const bookingRepository = AppDataSource.getRepository(Bookings);
        const booking = await bookingRepository.findOne({
            where: { booking_id: id },
        });

        if (!booking) {
            throw new Error(`Booking with ID ${id} not found.`);
        }

        return booking;
    }

    @Post()
    async createBooking(@Body() bookingData: Partial<Bookings>) {
        const bookingRepository = AppDataSource.getRepository(Bookings);
        const booking = bookingRepository.create(bookingData);
        return bookingRepository.save(booking);
    }
}
