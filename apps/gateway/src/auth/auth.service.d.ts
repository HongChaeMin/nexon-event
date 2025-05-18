import { ClientProxy } from '@nestjs/microservices';
import { CreateMemberRequest } from './dto';
export declare class AuthService {
    private readonly authClient;
    constructor(authClient: ClientProxy);
    create(request: CreateMemberRequest): import("rxjs").Observable<any>;
    findAll(): import("rxjs").Observable<any>;
}
