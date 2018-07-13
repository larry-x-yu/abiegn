import { Parser, AutoSpec, AutoSpecParsingEvent, PARSING_EVENT_TYPE } from '../types';
import { Observable, from } from 'rxjs';
import { jsdom } from 'jsdom';

var start = (new Date()).getTime();

fs.readFile('2018_Honda_Accord.html', 'utf8', (err, html) => {
    if (err) {
        console.log(err);
        return;
    }

    let idx1 = html.indexOf('<bp_summary class="goLeft">');
    if (idx1 > 0) {
        html = html.substring(idx1);

        idx1 = html.indexOf('</bp_summary>');
        if (idx1 > 0) {
            idx1 += '</bp_summary>'.length;
            html = html.substring(0, idx1 + 1);
            // console.log("Extraced html: " + html);

            const dom = new JSDOM(html);
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

            console.log("Time used: " + ((new Date()).getTime() - start) + " ms");
        } else {
            this.raiseEvent(PARSING_EVENT_TYPE.ERROR, "Unable to find target string: " + '</bp_summary>');
        }
    } else {
        console.log("Unable to find target string: " + '<bp_summary class="goLeft">');
    }

});
