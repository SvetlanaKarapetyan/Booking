import { JsonController, Get, Post, Body, Param } from "routing-controllers";
import { AppDataSource } from "../data-source";
import { SlotTimetables } from "../entity/SlotTimetables";

@JsonController("/slottimetable")
export class SlotTimetableController {
    @Get()
    async getAll() {
        const slotRepository = AppDataSource.getRepository(SlotTimetables);
        return slotRepository.find();
    }

    @Get("/:id")
    async getOne(@Param("id") id: number) {
        const slotRepository = AppDataSource.getRepository(SlotTimetables);
        const slot = await slotRepository.findOne({ where: { slot_id : id } });

        if (!slot) {
            throw new Error(`Slot with ID ${id} not found.`);
        }

        return slot;
    }

    @Post()
    async createSlot(@Body() slotData: Partial<SlotTimetables>) {
        const slotRepository = AppDataSource.getRepository(SlotTimetables);
        const slot = slotRepository.create(slotData);
        return slotRepository.save(slot);
    }
}
