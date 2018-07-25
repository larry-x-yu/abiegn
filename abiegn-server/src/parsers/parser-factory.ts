import { Parser, AutoSpec } from './types';
import ParserMap from './parser-config';

const fs = require('fs');
const util = require('util');

class ParserFactory {
    private static parsers: Map<string, Parser> = ParserMap;

    private static getParser(manufacturer: string, year: number, model?: string): Parser {
        return ParserFactory.parsers.get(manufacturer + year + model) || ParserFactory.parsers.get(manufacturer + year) || ParserFactory.parsers.get(manufacturer);
    }

    static parse(file: string, manufacturer: string, year: number, model?: string): Promise<AutoSpec> {
  
        let parser = ParserFactory.getParser(manufacturer, year, model);
        if (!parser) {
            throw new Error(`No parser found for: ${manufacturer}, ${year}, ${model}`);
        }

        // Read file from local disk
        const readFile = util.promisify(fs.readFile);
        let p = readFile(file, 'utf8').then(text => parser.parse(text));
        return p;
    }
}

export default ParserFactory;
