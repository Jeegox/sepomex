import * as File  from 'fs';
import path = require('path');
import {Singleton} from 'typescript-ioc';
import {Exception} from '../exceptions/Exception';


@Singleton
export class SepomexService {

    public readData(file: string) {
        file = path.resolve(file);

        if (!File.exists(file)) {
            throw new Exception(`File ${file} not found`, 100);
        }
    }

}
