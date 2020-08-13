import { JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';
import { Model } from '../models/model';

export class ModelFactory {
    private static instance: ModelFactory;

    private converter = new JsonConvert(OperationMode.ENABLE, ValueCheckingMode.ALLOW_NULL, true);

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}

    static getInstance(): ModelFactory {
        if (!ModelFactory.instance) {
            ModelFactory.instance = new ModelFactory();
        }

        return ModelFactory.instance;
    }

    create<T extends Model>(model: { new (): T }, params: Object): T {
        let obj: T = {} as T;

        try {
            obj = this.converter.deserializeObject(params, model);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);
        }

        return obj;
    }
}
