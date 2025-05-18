import { AuthService } from './auth.service';
import { CreateMemberRequest } from './dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    create(request: CreateMemberRequest): import("rxjs").Observable<any>;
    findAll(): import("rxjs").Observable<any>;
}
