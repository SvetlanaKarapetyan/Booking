import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Computers } from "../entity/Computers";

class ComputerService {
    private repository: Repository<Computers>;

    constructor() {
        this.repository = AppDataSource.getRepository(Computers);
    }

    async getAll() {
        return await this.repository.find();
    }

    async getById(id: number) {
        const computer = await this.repository.findOne({
            where: { computer_id: id },
        });

        if (!computer) {
            throw new Error(`Computer with ID ${id} not found.`);
        }

        return computer;
    }

    async create(computerData: Partial<Computers>) {
        const computer = this.repository.create(computerData);
        return await this.repository.save(computer);
    }

    async delete(id: number) {
        const computer = await this.repository.findOne({
            where: { computer_id: id },
        });

        if (!computer) {
            throw new Error(`Computer with ID ${id} not found.`);
        }

        await this.repository.remove(computer);
        return { message: `Computer with ID ${id} deleted successfully.` };
    }
}

export const computerService = new ComputerService();
