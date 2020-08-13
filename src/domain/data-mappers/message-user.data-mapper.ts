import { JsonConverter, JsonCustomConvert } from "json2typescript";
import { AuthService } from "../services/auth.service";

@JsonConverter
export class MessageUserDataMapper implements JsonCustomConvert<string> {
  serialize(value: string): string {
    return value;
  }

  deserialize(value: string): string {
    const currentUser = AuthService.getInstance().getCurrentUser();
    return value === currentUser.name ? "Me" : value;
  }
}
