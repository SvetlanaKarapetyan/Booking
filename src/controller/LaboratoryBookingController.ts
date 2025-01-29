import { JsonController, Get, Post, Delete, Body, Param } from "routing-controllers";
import { LaboratoryBookingService } from "../services/LaboratoryBookingService";

@JsonController("/laboratory-bookings")
export class LaboratoryBookingController {
    private laboratoryBookingService = new LaboratoryBookingService();

    @Get()
    async getAll() {
        return this.laboratoryBookingService.getAllBookings();
    }

    @Get("/:id")
    async getById(@Param("id") id: number) {
        return this.laboratoryBookingService.getBookingById(id);
    }

    @Post()
    async createBooking(
        @Body() bookingData: { userId: number; laboratoryId: number; bookingdate: Date; slotId: number }
    ) {
        return this.laboratoryBookingService.bookLaboratory(
            bookingData.userId,
            bookingData.laboratoryId,
            bookingData.bookingdate,
            bookingData.slotId
        );
    }

    @Delete("/:id")
    async deleteBooking(@Param("id") id: number) {
        return this.laboratoryBookingService.deleteBooking(id);
    }
}
