import { JsonConverter, JsonCustomConvert } from 'json2typescript';

@JsonConverter
export class TimeDataMapper implements JsonCustomConvert<string> {
    serialize(value: string): string {
        return value;
    }

    deserialize(value: string): string {
        return new Date((+value)).toLocaleTimeString();
    }
}
