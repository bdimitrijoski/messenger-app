export abstract class Model {
    toJson(){
        return JSON.parse(JSON.stringify(this));
    }

    abstract getHashCode(): string;
}