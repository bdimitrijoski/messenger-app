import { UserDTO } from "../models/types";
import { AuthResourceService } from "./auth-resource.service";
import { User } from "../models/user.model";
import { ModelFactory } from "../factories/model.factory";

export class AuthService { 
    private authResource: AuthResourceService;
    private currentUser: User;
    private static instance: AuthService;

    private constructor() {
        this.authResource = new AuthResourceService();
    }

    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }

        return AuthService.instance;
    }

    authenticate(userDTO: UserDTO): Promise<boolean> {
        return this.authResource.authenticate(userDTO).then(()=>{
            this.currentUser = ModelFactory.getInstance().create<User>(User as any, userDTO);
            return true;
        })
    }   

    getCurrentUser(): User {
        return this.currentUser;
    }

    isAuthenticated(): boolean {
        return (!this.currentUser)?false:true;
    }
}