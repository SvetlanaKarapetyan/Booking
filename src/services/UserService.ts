import {Repository} from "typeorm";
import {AppDataSource} from "../data-source";
import {User} from "../entity/Users";

class UserService {
    repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User)
    }
    getAll() {
        return this.repository.find();
    }
}

export const userService = new UserService();