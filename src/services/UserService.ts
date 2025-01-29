import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Users } from "../entity/Users";

class UserService {
    private repository: Repository<Users>;

    constructor() {
        this.repository = AppDataSource.getRepository(Users);
    }

    async getAll() {
        return await this.repository.find();
    }

    async getById(id: number) {
        const user = await this.repository.findOne({
            where: { id: id },
        });

        if (!user) {
            throw new Error(`User with ID ${id} not found.`);
        }

        return user;
    }

    async create(userData: Partial<Users>) {
        const user = this.repository.create(userData);
        return await this.repository.save(user);
    }

    async delete(id: number) {
        const user = await this.repository.findOne({
            where: { id: id },
        });

        if (!user) {
            throw new Error(`User with ID ${id} not found.`);
        }

        await this.repository.remove(user);
        return { message: `User with ID ${id} deleted successfully.` };
    }
}

export const userService = new UserService();
