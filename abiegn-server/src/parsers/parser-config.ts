import { Parser, MANUFACTURER } from './types';

import HondaParser2018 from './honda/parser-2018';

const hondaParser2018 = new HondaParser2018();

const parsers: [string, Parser][] = [
    [MANUFACTURER.HONDA + '2018', hondaParser2018]
];

const ParserMap = new Map<string, Parser>(parsers);
export default ParserMap;
