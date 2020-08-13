import { UserDTO } from "../models/types";

export class AuthResourceService {
    authenticate(user: UserDTO): Promise<boolean>{
        return fetch('/api/authenticate',{
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(user)
        })
        .then((res) => { return true; });
    }
}