import { AppDataSource } from "../data-source";
import { Computers, ComputerStatus } from "../entity/Computers";
import { Faculties } from "../entity/Faculties";
import { Laboratories } from "../entity/Laboratories";
import { Users, UserRole } from "../entity/Users"

const seedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        const computerRepository = AppDataSource.getRepository(Computers);
        const facultyRepository = AppDataSource.getRepository(Faculties);
        const laboratoryRepository = AppDataSource.getRepository(Laboratories);
        const userRepository = AppDataSource.getRepository(Users);

        const faculties = [];
        for (let i = 0; i < 10; i++) {
            const faculty = new Faculties();
            faculty.name = `Faculty ${i + 1}`;
            faculties.push(faculty);
        }
        await facultyRepository.save(faculties);

        const laboratories = [];
        for (let i = 0; i < 10; i++) {
            const laboratory = new Laboratories();
            laboratory.number = `Lab-${i + 1}`;
            laboratory.faculty = faculties[Math.floor(Math.random() * faculties.length)];
            laboratories.push(laboratory);
        }
        await laboratoryRepository.save(laboratories);

        const computers = [];
        for (let i = 0; i < 10; i++) {
            const computer = new Computers();
            computer.status = Math.random() > 0.5 ? ComputerStatus.Working : ComputerStatus.NotWorking;
            computer.laboratory = laboratories[Math.floor(Math.random() * laboratories.length)];
            computers.push(computer);
        }
        await computerRepository.save(computers);

        const users = [];
        for (let i = 0; i < 10; i++) {
            const user = new Users();
            user.name = randomString(8);
            user.email = `user${i + 1}@example.com`;
            user.password = `password${i + 1}`;
            user.role = i % 2 === 0 ? UserRole.Student : UserRole.Lecturer;
            users.push(user);
        }
        await userRepository.save(users);

        console.log("Database has been seeded!");
    } catch (err) {
        console.log("Error seeding database", err);
    }
};

const randomString = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

(async () => {
    await seedDatabase();
})();