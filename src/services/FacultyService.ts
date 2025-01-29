import { AppDataSource } from "../data-source";
import { Faculties } from "../entity/Faculties";

export class FacultyService {
    private facultyRepo = AppDataSource.getRepository(Faculties);

    async getAll() {
        return await this.facultyRepo.find();
    }

    async getById(id: number) {
        const faculty = await this.facultyRepo.findOne({ where: { faculty_id: id } });
        if (!faculty) {
            throw new Error(`Faculty with ID ${id} not found.`);
        }
        return faculty;
    }

    async create(data: Partial<Faculties>) {
        const faculty = this.facultyRepo.create(data);
        return await this.facultyRepo.save(faculty);
    }

    async delete(id: number) {
        const faculty = await this.facultyRepo.findOne({ where: { faculty_id: id } });
        if (!faculty) {
            throw new Error(`Faculty with ID ${id} not found.`);
        }
        await this.facultyRepo.remove(faculty);
        return { message: `Faculty with ID ${id} deleted successfully.` };
    }
}

export const facultyService = new FacultyService();
