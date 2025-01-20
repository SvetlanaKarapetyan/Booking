import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { AppDataSource } from "./data-source";
import { UserController } from "./controller/UserController";



const app = createExpressServer({
    controllers: [UserController],
});

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected!");
        app.listen(3000, () => {
            console.log("Server is running on http://localhost:3000");
        });
    })
    .catch((error) => console.log("Database connection error:", error));

