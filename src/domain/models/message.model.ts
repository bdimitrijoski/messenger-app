import { JsonObject, JsonProperty } from 'json2typescript';
import { Model } from './model';
import { TimeDataMapper } from '../data-mappers/time.data-mapper';
import { MessageUserDataMapper } from '../data-mappers/message-user.data-mapper';

@JsonObject('Message')
export class Message extends Model {
    
    @JsonProperty('time', String)
    time: string = '';

    @JsonProperty('time', TimeDataMapper)
    displayTime: string = '';

    @JsonProperty('message', String)
    message: string = '';

    @JsonProperty('from', MessageUserDataMapper)
    from: string = '';

    @JsonProperty('to', MessageUserDataMapper)
    to: string = '';

    constructor(params: Partial<Message>) {
        super();
        Object.assign(this, params);
    }


    getHashCode(): string {
        return btoa(this.displayTime+'_'+this.message);
    }
}
