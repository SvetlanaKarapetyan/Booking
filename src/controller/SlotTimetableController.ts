import { JsonController, Get, Post, Body, Param } from "routing-controllers";
import { AppDataSource } from "../data-source";
import { SlotTimetables } from "../entity/SlotTimetables";
import { Laboratories } from "../entity/Laboratories";

@JsonController("/slottimetable")
export class SlotTimetableController {
    @Get()
    async getAll() {
        const slotRepository = AppDataSource.getRepository(SlotTimetables);
        return slotRepository.find({ relations: ["laboratory"] });
    }

    @Get("/:id")
    async getOne(@Param("id") id: number) {
        const slotRepository = AppDataSource.getRepository(SlotTimetables);
        const slot = await slotRepository.findOne({
            where: { slot_id: id },
            relations: ["laboratory"],
        });

        if (!slot) {
            throw new Error(`Slot with ID ${id} not found.`);
        }

        return slot;
    }

    @Post()
    async createSlot(@Body() slotData: Partial<SlotTimetables>) {
        const slotRepository = AppDataSource.getRepository(SlotTimetables);

        if (slotData.laboratory) {
            const laboratoryRepository = AppDataSource.getRepository(Laboratories);
            const laboratory = await laboratoryRepository.findOne({
                where: { laboratory_id: slotData.laboratory.laboratory_id },
            });

            if (!laboratory) {
                throw new Error(
                    `Laboratory with ID ${slotData.laboratory.laboratory_id} not found.`
                );
            }

            slotData.laboratory = laboratory;
        }

        const slot = slotRepository.create(slotData);
        return slotRepository.save(slot);
    }
}
