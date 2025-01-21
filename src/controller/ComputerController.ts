import { JsonController, Get, Post, Body, Param } from "routing-controllers";
import { AppDataSource } from "../data-source";
import { Computers } from "../entity/Computers";

@JsonController("/computers")
export class ComputerController {
    @Get()
    async getAll() {
        const computerRepository = AppDataSource.getRepository(Computers);
        return computerRepository.find();
    }

    @Get("/:id")
    async getOne(@Param("id") id: number) {
        const computerRepository = AppDataSource.getRepository(Computers);
        const computer =  computerRepository.findOne({ where: { computer_id: id } });

        if (!computer) {
            throw new Error(`Computer with ID ${id} not found.`);
        }

        return computer;
    }

    @Post()
    async createComputer(@Body() computerData: Partial<Computers>) {
        const computerRepository = AppDataSource.getRepository(Computers);
        const computer = computerRepository.create(computerData);
        return computerRepository.save(computer);
    }
}
