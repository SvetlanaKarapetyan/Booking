import { AppDataSource } from "./data-source";
import "reflect-metadata";

const main = async () => {
        await AppDataSource.initialize();
        console.log("Database initialized!");
};

main().catch((error) => console.log(error));