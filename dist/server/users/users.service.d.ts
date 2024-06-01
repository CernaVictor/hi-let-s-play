import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findByUsername(username: string): Promise<User>;
    logInWithUsernameAndPassword(username: string, password: string): Promise<User | null>;
    registerWithUsernameAndPassword(username: string, password: string, email: string, name: string, confirmPassword: string, isSportsCenterOwner: string): Promise<User>;
    findOne(id: string): Promise<User | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult | undefined>;
}
