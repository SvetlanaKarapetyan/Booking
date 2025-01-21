import { JsonController, Get, Post, Body, Param } from "routing-controllers";
import { AppDataSource } from "../data-source";
import { Faculties } from "../entity/Faculties";

@JsonController("/faculties")
export class FacultyController {
    @Get()
    async getAll() {
        const facultyRepository = AppDataSource.getRepository(Faculties);
        return facultyRepository.find();
    }

    @Get("/:id")
    async getOne(@Param("id") id: number) {
        const facultyRepository = AppDataSource.getRepository(Faculties);
        const faculty =  facultyRepository.findOne({ where: { faculty_id: id } });

        if (!faculty) {
            throw new Error(`Faculty with ID ${id} not found.`);
        }

        return faculty;
    }

    @Post()
    async createFaculty(@Body() facultyData: Partial<Faculties>) {
        const facultyRepository = AppDataSource.getRepository(Faculties);
        const faculty = facultyRepository.create(facultyData);
        return facultyRepository.save(faculty);
    }
}
