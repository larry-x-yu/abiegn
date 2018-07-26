import { Observable, Subject } from 'rxjs';
import { debug } from 'util';

export enum MANUFACTURER {
    HONDA = 'Honda',
    TOYOTA = 'Toyota',
    FORD = 'Ford'
}

export class AutoSpecLineItem {
    item: string;
    description: string;
    price: number;
}

export class AutoSpec {
    title: string;
    base: AutoSpecLineItem[];
    packages: AutoSpecLineItem[];
    optionalPackages: AutoSpecLineItem[];
    options: AutoSpecLineItem[];
    optionalOptions: AutoSpecLineItem[];
    destinationAndHandling: number;
}

export enum PARSING_EVENT_TYPE { INFO = "INFO", WARNING = "WARNING", ERROR = "ERROR" };
export class AutoSpecParsingEvent {
    time: Date = new Date();
    manufacturer: string;
    year: number;
    model?: string;
    type: PARSING_EVENT_TYPE = PARSING_EVENT_TYPE.INFO;
    message = '';

    // Returns a new object with an updated time and empty message
    copy(): AutoSpecParsingEvent {
        return Object.assign({}, this, {time: new Date(), message: '', type: PARSING_EVENT_TYPE.INFO });
    }
}

/*
 Extract the details of the auto specification from the html (fragment).
 By default, the system would use jsdom for html parsing, which can be
 computation intensive, so using 'RawParser' to extract the minimal html fragment
 if possible before channeling to this parser is highly preferrable.
 */
export abstract class Parser {
    event: Subject<AutoSpecParsingEvent> = new Subject<AutoSpecParsingEvent>();
    abstract parse(spec: string): Promise<AutoSpec>;
}
