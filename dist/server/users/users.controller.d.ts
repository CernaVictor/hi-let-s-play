import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthenticatedRequest } from 'common/types';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    loginWithUsernameAndPassword(username: string, password: string): Promise<import("./entities/user.entity").User | null>;
    registerWithUsernameAndPassword(username: string, password: string, email: string, name: string, confirmPassword: string, isSportsCenterOwner: string): Promise<import("./entities/user.entity").User>;
    authTest(req: AuthenticatedRequest): import("next-auth/jwt").JWT;
    findAll(): Promise<import("./entities/user.entity").User[]>;
    findOne(id: string): Promise<import("./entities/user.entity").User | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult | undefined>;
}
