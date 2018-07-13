import { Parser, AutoSpec } from './types';
import ParserMap from './parser-config';
import { Observable, throwError, from } from 'rxjs';
import { switchAll } from 'rxjs/operators'

const fs = require('fs');
const util = require('util');

class ParserFactory {
    private static parsers: Map<string, Parser> = ParserMap;

    private static getParser(manufacturer: string, year: number, model?: string): Parser {
        return ParserFactory.parsers.get(manufacturer + year + model) || ParserFactory.parsers.get(manufacturer + year) || ParserFactory.parsers.get(manufacturer);
    }

    static parse(file: string, manufacturer: string, year: number, model?: string): Observable<AutoSpec> {
  
        let parser = ParserFactory.getParser(manufacturer, year, model);
        if (!parser) {
            throw new Error(`No parser found for: ${manufacturer}, ${year}, ${model}`);
        }

        // parser.event.subscribe(event => console.log(JSON.stringify(event, null, 4)));

        // Read file from local disk
        const readFile = util.promisify(fs.readFile);
        let p = readFile(file, 'utf8').then(text => parser.parse(text));
        let temp: Observable<AutoSpec> = from(p);
        return temp;
    }
}

export default ParserFactory;
