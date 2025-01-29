import { JsonController, Get, Post, Delete, Body, Param } from "routing-controllers";
import { laboratoryService } from "../services/LaboratoryService";
import { Laboratories } from "../entity/Laboratories";

@JsonController("/laboratories")
export class LaboratoryController {
    @Get()
    async getAll() {
        return laboratoryService.getAll();
    }

    @Get("/:id")
    async getOne(@Param("id") id: string) {
        const laboratoryId = parseInt(id, 10);
        return laboratoryService.getById(laboratoryId);
    }

    @Post()
    async createLaboratory(@Body() laboratoryData: Partial<Laboratories>) {
        return laboratoryService.create(laboratoryData);
    }

    @Delete("/:id")
    async deleteLaboratory(@Param("id") id: string) {
        const laboratoryId = parseInt(id, 10);
        return laboratoryService.delete(laboratoryId);
    }
}
