import { AppDataSource } from "../data-source";
import { Users } from "../entity/Users";
import * as bcrypt from "bcrypt";
import { UserRole } from "../entity/Users";

async function createAdmin() {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
        console.log("Data Source has been initialized.");
    }
    const userRepository = AppDataSource.getRepository(Users);
    const existingAdmin = await userRepository.findOne({ where: { role: UserRole.Admin } });
    if (existingAdmin) {
        console.log("Admin user already exists.");
        return;
    }
    const admin = new Users();
    admin.email = "admin@example.com";
    admin.password = await bcrypt.hash("admin_password", 10);
    admin.role = UserRole.Admin;

    await userRepository.save(admin);
    console.log("Admin user created successfully.");
}
createAdmin().catch((error) => {
    console.error("Error creating admin:", error);
});
