import { JsonController, Get, Post, Body, Param } from "routing-controllers";
import { computerService } from "../services/ComputerService";
import { Computers } from "../entity/Computers";

@JsonController("/computers")
export class ComputerController {
    @Get()
    async getAll() {
        return computerService.getAll();
    }

    @Get("/:id")
    async getOne(@Param("id") id: string) {
        const computerId = parseInt(id, 10);
        return computerService.getById(computerId);
    }

    @Post()
    async createComputer(@Body() computerData: Partial<Computers>) {
        return computerService.create(computerData);
    }
}
