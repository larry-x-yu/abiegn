import { MANUFACTURER, PARSING_EVENT_TYPE } from './../types';
import { Parser, AutoSpec, AutoSpecParsingEvent, AutoSpecLineItem } from '../types';
import { Observable, from } from 'rxjs';
import { JSDOM } from 'jsdom';
const parseNum = require('parse-num');

class Sections {
    baseNodes: any[] = [];
    optionalOptionNodes: any[] = [];
    destinationAndHandling: string;
}

function getChildNodeText(node: HTMLElement, tagName: string, index = 0): string {
    let result = null;

    if (node && tagName) {
        result = node.getElementsByTagName(tagName)[index] && node.getElementsByTagName(tagName)[index].textContent;
    }

    return result;
}

// use a separate function instead of a class method here: object destructuring is not supported for class method
function nodeToItem(node,  {itemTag = 'p', priceTag = 'h5', descriptionTag = undefined } = {}): AutoSpecLineItem {
    let item: AutoSpecLineItem = null;

    if (node) {
        item = new AutoSpecLineItem();
        item.item = getChildNodeText(node, itemTag);
        item.price = parseNum(getChildNodeText(node, priceTag));
        if (descriptionTag) {
            item.description = getChildNodeText(node, descriptionTag);
        }

        // Ignore entries without an 'item' or 'description'
        if (!item.item && !item.description) {
            item = null;
        }
    }

    return item;
}

function parseBaseNode(node): AutoSpecLineItem {
    let item: AutoSpecLineItem = null;

    if (node) {
        item = new AutoSpecLineItem();
        let ps = node.getElementsByTagName("p");
        let h4text = getChildNodeText(node, 'h4');
        if(ps && ps.length) {
            let p1text = ps[0].textContent;
            switch(ps.length){
                case 1: {
                    item.item = h4text;
                    if(p1text) item.description = p1text;
                    break;
                }
                case 2: {
                    let p2text = ps[1].textContent;
                    item.item = p1text;
                    item.description = h4text;
                    if(p2text) item.description += ", " + p2text;
                    break;
                }
                default:
                    break;
            } 
        }
        item.price = parseNum(getChildNodeText(node, "h5"));

        // Ignore entries without an 'item' or 'description'
        if (!item.item && !item.description) {
            item = null;
        }
    }

    return item;
}

export default class Parser2018 extends Parser {
    private eventTemplate: AutoSpecParsingEvent = new AutoSpecParsingEvent();

    constructor() {
        super();

        this.eventTemplate.manufacturer = MANUFACTURER.HONDA;
        this.eventTemplate.year = 2018;
        // this.eventTemplate.model = model;
    }

    protected extractFragment(html: string): string {
        let result: string = null;
        let idx1 = html.indexOf('<bp_summary class="goLeft">');
        if (idx1 > 0) {
            html = html.substring(idx1);

            idx1 = html.indexOf('</bp_summary>');
            if (idx1 > 0) {
                idx1 += '</bp_summary>'.length;
                result = html.substring(0, idx1 + 1);
            } else {
                this.raiseEvent("Unable to find target string: " + '</bp_summary>. Is it a valid file?', PARSING_EVENT_TYPE.ERROR);
            }
        } else {
            this.raiseEvent("Unable to find target string: " + '<bp_summary class="goLeft">. Is it a valid file?', PARSING_EVENT_TYPE.ERROR);
        }
        return result;
    }

    protected cleanDom(dom): void {
        let document = dom.window.document;

        let clazzez = ['div.summary-row.summary-zip', 'div.summary-row.summary-footer'];
        clazzez.forEach(clazz => {
            let ele = document.querySelector(clazz);
            if (ele) {
                ele.parentNode.removeChild(ele);
            }
        });

        let anchors = document.querySelectorAll("a");
        anchors.forEach(anchor => {
            anchor.parentNode.removeChild(anchor);
        });

        console.log(dom.serialize());
    }

    protected extractSections(dom): Sections {
        let sections: Sections = null;
        let document = dom.window.document;

        let containerNode = document.querySelector('bp_summary.goLeft div');
        if (containerNode) {
            sections = new Sections();
            let sectionNames: string[] = ['baseNodes', 'optionalOptionNodes'];
            let currentSection = 0;
            for (let i = 0; i < containerNode.children.length; i++) {
                let currentNode = containerNode.children[i];
                if (currentNode.className === 'summary-row-disclaimer') {
                    currentSection = 1;
                }
                if (currentNode.className === 'summary-row subtotal') {
                    break;
                }
                let currentSectionName = sectionNames[currentSection];
                if (currentNode.className === 'summary-row') {
                    // console.log(`Current section name: ${currentSectionName}`);
                    sections[currentSectionName] && sections[currentSectionName].push(currentNode);
                }
            }

            // Extract 'Destination and Handling'
            let dandhNode = document.querySelectorAll('div.internal-row div h5')[1];
            if (dandhNode) {
                sections.destinationAndHandling = dandhNode.textContent;
            }
        }

        return sections;
    }

    protected transform(sections: Sections): AutoSpec {
    let autoSpec: AutoSpec = null;

    if (sections) {
        autoSpec = new AutoSpec();

        // Base line items
        let base: AutoSpecLineItem[] = [];
        let baseNodes = sections.baseNodes;
        let item: AutoSpecLineItem;

        for(let node of baseNodes) {
            item = parseBaseNode(node);
            if(item) base.push(item);
        }

        // let item = new AutoSpecLineItem();
        // item.item = this.getChildNodeText(baseNodes[0], 'p');
        // item.price = parseNum(this.getChildNodeText(baseNodes[0], 'h5'));
        // let item: AutoSpecLineItem;

        // item = nodeToItem(baseNodes[0]);
        // if (item) base.push(item);

        // item = new AutoSpecLineItem();
        // item.item = this.getChildNodeText(baseNodes[1], 'h4');
        // item.description = this.getChildNodeText(baseNodes[1], 'p');
        // item.price = parseNum(this.getChildNodeText(baseNodes[1], 'h5'));
        // item = nodeToItem(baseNodes[1], {itemTag: 'h4', descriptionTag: 'p'});
        // if (item) base.push(item);

        // item = new AutoSpecLineItem();
        // item.item = this.getChildNodeText(baseNodes[2], 'p');
        // item.description = this.getChildNodeText(baseNodes[2], 'h4');
        // item.description += ', ' + this.getChildNodeText(baseNodes[2], 'p', 1);
        // item.price = parseNum(this.getChildNodeText(baseNodes[2], 'h5'));
        // base.push(item);
        // item = nodeToItem(baseNodes[2], {descriptionTag: 'h4'});
        // if (item) {
            // item.description += ', ' + getChildNodeText(baseNodes[2], 'p', 1);
            // base.push(item);
        // }

        // item = new AutoSpecLineItem();
        // item.item = this.getChildNodeText(baseNodes[3], 'p');
        // item.description = this.getChildNodeText(baseNodes[3], 'h4');
        // item.price = parseNum(this.getChildNodeText(baseNodes[3], 'h5'));
        // base.push(item);

        // item = nodeToItem(baseNodes[3], {descriptionTag: 'h4'});
        // if (item) base.push(item);

        // item = new AutoSpecLineItem();
        // item.item = this.getChildNodeText(baseNodes[4], 'h4');
        // item.price = parseNum(this.getChildNodeText(baseNodes[4], 'h5'));
        // base.push(item);
        // item = nodeToItem(baseNodes[4], {itemTag: 'h4'});
        // if (item) base.push(item);

        // item = new AutoSpecLineItem();
        // item.item = this.getChildNodeText(baseNodes[5], 'h4');
        // item.price = parseNum(this.getChildNodeText(baseNodes[5], 'h5'));
        // base.push(item);
        // item = nodeToItem(baseNodes[5], {itemTag: 'h4'});
        // if (item) base.push(item);

        autoSpec.base = base;

        let nodes = sections.optionalOptionNodes;
        let optionalOptions: AutoSpecLineItem[] = [];

        for (let node of nodes) {
            // item = new AutoSpecLineItem();
            // item.item = this.getChildNodeText(node, 'h4');
            // item.price = parseNum(this.getChildNodeText(node, 'h5'));
            item = nodeToItem(node, {itemTag: 'h4'});
            if(item) optionalOptions.push(item);
        }

        autoSpec.optionalOptions = optionalOptions;

        autoSpec.destinationAndHandling = parseNum(sections.destinationAndHandling);
    }

    return autoSpec;
}

    protected _parse(html: string): AutoSpec {
    let result: AutoSpec = null;

    let timeStart = new Date();
    this.raiseEvent("Started parsing at: " + timeStart);
    html = this.extractFragment(html);
    if (html) {
        const dom = new JSDOM(html);
        this.cleanDom(dom);
        let sections = this.extractSections(dom);
        result = this.transform(sections);
    }

    let timeEnd = new Date();
    this.raiseEvent("Stopped parsing at: " + timeEnd);
    this.raiseEvent("Total parsing time: " + (timeEnd.getTime() - timeStart.getTime()) + " ms");

    return result;
}

    protected raiseEvent(message: string, type: PARSING_EVENT_TYPE = PARSING_EVENT_TYPE.INFO): void {
    const e = this.eventTemplate.copy();
    e.message = message;
    e.type = type;
    this.event.next(e);
}

parse(spec: string): Promise < AutoSpec > {

    return new Promise<AutoSpec>((resolve, reject) => {
        let result = this._parse(spec);
        console.log(JSON.stringify(result, null, 8));
        if (result) {
            resolve(result);
        } else {
            reject('Invalid file');
        }
    });
}

}

