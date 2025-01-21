import { JsonController, Get, Post, Body, Param } from "routing-controllers";
import { AppDataSource } from "../data-source";
import { Users } from "../entity/Users";

@JsonController("/users")
export class UserController {
    @Get()
    async getAll() {
        const userRepository = AppDataSource.getRepository(Users);
        return userRepository.find();
    }

    @Get("/:id")
    async getOne(@Param("id") id: number) {
        const userRepository = AppDataSource.getRepository(Users);
        const user =  userRepository.findOne({
            where: { id: id },
        });

        if (!user) {
            throw new Error(`User with ID ${id} not found.`);
        }

        return user;
    }

    @Post()
    async createUser(@Body() userData: Partial<Users>) {
        const userRepository = AppDataSource.getRepository(Users);
        const users = userRepository.create(userData);
        return  userRepository.save(users);
    }
}
