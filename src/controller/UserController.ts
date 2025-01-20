import { JsonController, Get, Post, Body } from "routing-controllers";
import { AppDataSource } from "../data-source";
import { User } from "../entity/Users";

@JsonController("/users")
export class UserController {
    @Get()
    async getAll() {
        const userRepository = AppDataSource.getRepository(User);
        return await userRepository.find();
    }

    @Post()
    async createUser(@Body() userData: Partial<User>) {
        const userRepository = AppDataSource.getRepository(User);
        const user = userRepository.create(userData);
        return await userRepository.save(user);
    }
}
