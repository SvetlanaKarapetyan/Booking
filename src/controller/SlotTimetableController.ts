import { JsonController, Get, Post, Delete, Body, Param } from "routing-controllers";
import { slotTimetableService } from "../services/SlotTimetableService";
import {SlotTimetables } from "../entity/SlotTimetables";

@JsonController("/slottimetable")
export class SlotTimetableController {
    @Get()
    async getAll() {
        return slotTimetableService.getAll();
    }

    @Get("/:id")
    async getOne(@Param("id") id: string) {
        const slotId = parseInt(id, 10);
        return slotTimetableService.getById(slotId);
    }

    @Post()
    async createSlot(@Body() slotData: Partial<SlotTimetables>) {
        return slotTimetableService.create(slotData);
    }

    @Delete("/:id")
    async deleteSlot(@Param("id") id: string) {
        const slotId = parseInt(id, 10);
        return slotTimetableService.delete(slotId);
    }
}
