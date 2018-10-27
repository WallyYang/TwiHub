'use strict';

/// <reference path="./file_collection.ts"/>

// TODO: move to config file?
const url = 'http://laurence.tk:21027';

const fileCollection = new FileCollection(<HTMLBodyElement> document.body);

let initEvent = null;

function mouseDown(event: MouseEvent) {
    initEvent = event;
}

function mouseUp(event: MouseEvent) {
    if (initEvent !== null) {
        if (event.screenX === initEvent.screenX && event.screenY === initEvent.screenY) {
            fileCollection.deselect();
        } else {
            fileCollection.select(
                Math.min(event.screenY, initEvent.screenY),
                Math.max(event.screenY, initEvent.screenY)
            );

            for (const file of fileCollection.files) {
                let code = '';

                for (const line of file.lines) {
                    code += line.code + '\n';
                }

                const http = new XMLHttpRequest();

                http.open('POST', url + '/like', true);
                http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                http.setRequestHeader('X-LAURENCE', '6');
                http.send('{"reop":"a","code":"b"}');
            }
        }
    }
}

window.onmousedown = mouseDown;
window.onmouseup = mouseUp;
