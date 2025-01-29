import { JsonController, Get, Post, Delete, Body, Param } from "routing-controllers";
import { ComputerBookingService } from "../services/ComputerBookingService";

@JsonController("/computer-bookings")
export class ComputerBookingController {
    private computerBookingService = new ComputerBookingService();

    @Get()
    async getAll() {
        return this.computerBookingService.getAllBookings();
    }

    @Get("/:id")
    async getById(@Param("id") id: number) {
        return this.computerBookingService.getBookingById(id);
    }

    @Post()
    async createBooking(
        @Body() bookingData: { userId: number; computerId: number; bookingdate: Date; slotId: number }
    ) {
        return this.computerBookingService.bookComputer(
            bookingData.userId,
            bookingData.computerId,
            bookingData.bookingdate,
            bookingData.slotId
        );
    }

    @Delete("/:id")
    async deleteBooking(@Param("id") id: number) {
        return this.computerBookingService.deleteBooking(id);
    }
}
