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
        if (event.clientX === initEvent.clientX && event.clientY === initEvent.clientY) {
            fileCollection.deselect();
        } else {
            fileCollection.select(
                Math.min(event.clientY, initEvent.clientY),
                Math.max(event.clientY, initEvent.clientY)
            );

            for (const file of fileCollection.files) {
                let code = '';

                for (const line of file.lines) {
                    if (line.selected) {
                        code += line.code + '\n';
                    }
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
