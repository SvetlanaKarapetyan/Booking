import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { SlotTimetables } from "../entity/SlotTimetables";
import { Laboratories } from "../entity/Laboratories";

class SlotTimetableService {
    private repository = AppDataSource.getRepository(SlotTimetables);
    private laboratoryRepository = AppDataSource.getRepository(Laboratories);

    async getAll() {
        return await this.repository.find({ relations: ["laboratory"] });
    }

    async getById(id: number) {
        const slot = await this.repository.findOne({
            where: { slot_id: id },
            relations: ["laboratory"],
        });

        if (!slot) {
            throw new Error(`Slot with ID ${id} not found.`);
        }

        return slot;
    }

    async create(data: Partial<SlotTimetables>) {
        if (data.laboratory) {
            const laboratory = await this.laboratoryRepository.findOne({
                where: { laboratory_id: data.laboratory.laboratory_id },
            });

            if (!laboratory) {
                throw new Error(
                    `Laboratory with ID ${data.laboratory.laboratory_id} not found.`
                );
            }

            data.laboratory = laboratory;
        }

        const slot = this.repository.create(data);
        return await this.repository.save(slot);
    }

    async delete(id: number) {
        const slot = await this.repository.findOneBy({ slot_id: id });

        if (!slot) {
            throw new Error(`Slot with ID ${id} not found.`);
        }

        await this.repository.remove(slot);
        return { message: `Slot with ID ${id} deleted successfully.` };
    }
}

export const slotTimetableService = new SlotTimetableService();
