import { JsonController, Get, Post, Body, Param } from "routing-controllers";
import { userService } from "../services/UserService";
import {Users } from "../entity/Users";

@JsonController("/users")
export class UserController {
    @Get()
    async getAll() {
        return userService.getAll();
    }

    @Get("/:id")
    async getOne(@Param("id") id: string) {
        const userId = parseInt(id, 10);
        return userService.getById(userId);
    }

    @Post()
    async createUser(@Body() userData: Partial<Users>) {
        return userService.create(userData);
    }
}
