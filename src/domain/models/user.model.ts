import { JsonObject, JsonProperty } from 'json2typescript';
import { Model } from './model';

@JsonObject('User')
export class User extends Model {
    
    @JsonProperty('name', String)
    name: string = '';

    @JsonProperty('username', String)
    userName: string = '';

    constructor(params: Partial<User>) {
        super();
        Object.assign(this, params);
    }


    getHashCode(): string {
        return btoa(this.name+'_'+this.userName);
    }
}
