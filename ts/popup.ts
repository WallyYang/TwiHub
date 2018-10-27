'use strict';

/// <reference path="./file_collection.ts"/>

// TODO: move to config file?
const url = 'https://cidb.cf:21027';

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
                    if (line.selected && line.diffCommit === null) {
                        code += line.code + '\n';
                    }
                }

                const xhr = new XMLHttpRequest();

                xhr.open('POST', url + '/like', true);
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhr.setRequestHeader('X-LAURENCE', '6');
                xhr.send(JSON.stringify({
                    'Repo': file.info.user + '/' + file.info.repo,
                    'Code': code,
                }));
            }
        }
    }
}

window.onmousedown = mouseDown;
window.onmouseup = mouseUp;
