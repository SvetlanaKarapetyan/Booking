import { JsonController, Get, Post, Body, Param } from "routing-controllers";
import { AppDataSource } from "../data-source";
import { Laboratories } from "../entity/Laboratories";

@JsonController("/laboratories")
export class LaboratoryController {
    @Get()
    async getAll() {
        const laboratoryRepository = AppDataSource.getRepository(Laboratories);
        return  laboratoryRepository.find();
    }

    @Get("/:id")
    async getOne(@Param("id") id: string) {
        const laboratoryRepository = AppDataSource.getRepository(Laboratories);
        const laboratory = await laboratoryRepository.findOneBy({
            laboratory_id: parseInt(id, 10),
        });

        if (!laboratory) {
            throw new Error(`Laboratory with ID ${id} not found.`);
        }

        return laboratory;
    }


    @Post()
    async createLaboratory(@Body() laboratoryData: Partial<Laboratories>) {
        const laboratoryRepository = AppDataSource.getRepository(Laboratories);
        const laboratory = laboratoryRepository.create(laboratoryData);
        return laboratoryRepository.save(laboratory);
    }
}
