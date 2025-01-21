import {Repository} from "typeorm";
import {AppDataSource} from "../data-source";
import {Users} from "../entity/Users";

class UserService {
    repository: Repository<Users>;

    constructor() {
        this.repository = AppDataSource.getRepository(Users)
    }
    getAll() {
        return this.repository.find();
    }
}

export const userService = new UserService();