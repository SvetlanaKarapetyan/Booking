import { JsonController, Get, Post, Delete, Body, Param } from "routing-controllers";
import { facultyService } from "../services/FacultyService";
import { Faculties } from "../entity/Faculties";

@JsonController("/faculties")
export class FacultyController {
    @Get()
    async getAll() {
        return facultyService.getAll();
    }

    @Get("/:id")
    async getOne(@Param("id") id: number) {
        return facultyService.getById(id);
    }

    @Post()
    async createFaculty(@Body() facultyData: Partial<Faculties>) {
        return facultyService.create(facultyData);
    }

    @Delete("/:id")
    async deleteFaculty(@Param("id") id: number) {
        return facultyService.delete(id);
    }
}
