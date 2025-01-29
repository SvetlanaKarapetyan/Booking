import { AppDataSource } from "../data-source";
import { Laboratories } from "../entity/Laboratories";

class LaboratoryService {
    private repository = AppDataSource.getRepository(Laboratories);

    async getAll() {
        return await this.repository.find();
    }

    async getById(id: number) {
        const laboratory = await this.repository.findOneBy({ laboratory_id: id });
        if (!laboratory) {
            throw new Error(`Laboratory with ID ${id} not found.`);
        }
        return laboratory;
    }

    async create(data: Partial<Laboratories>) {
        const laboratory = this.repository.create(data);
        return await this.repository.save(laboratory);
    }

    async delete(id: number) {
        const laboratory = await this.repository.findOneBy({ laboratory_id: id });
        if (!laboratory) {
            throw new Error(`Laboratory with ID ${id} not found.`);
        }
        await this.repository.remove(laboratory);
        return { message: `Laboratory with ID ${id} deleted successfully.` };
    }
}

export const laboratoryService = new LaboratoryService();
