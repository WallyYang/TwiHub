'use strict';

function createButton(x: number, y: number) {
    const button = document.createElement('button');
    const text = document.createTextNode('Like');

    button.appendChild(text);
    button.setAttribute('id', 'like');

    console.log(x);
    console.log(y);
    console.log(window.innerWidth);
    console.log(window.innerHeight);

    button.style['position'] = 'absolute';
    button.style['width'] = '50px';
    button.style['left'] = (x - 55).toString() + 'px';
    button.style['top'] = (y - 30).toString() + 'px';

    const body = document.body;

    body.appendChild(button);
}

function initMouseEvents(url: string, fileCollection: FileCollection) {
    let initEvent = null;

    function mouseDown(event: MouseEvent) {
        initEvent = event;
    }

    function mouseUp(event: MouseEvent) {
        if (initEvent !== null) {
            if (event.pageX === initEvent.pageX && event.pageY === initEvent.pageY) {
                fileCollection.deselect();
            } else {
                fileCollection.select(
                    Math.min(event.pageY, initEvent.pageY),
                    Math.max(event.pageY, initEvent.pageY)
                );

                for (const file of fileCollection.files) {
                    let code = '';

                    for (const line of file.lines) {
                        if (line.selected && line.diffCommit === null) {
                            code += line.code + '\n';
                        }
                    }

                    if (code !== '') {
                        sendLike(file.info.user + '/' + file.info.repo, code);
                    }
                }

                createButton(event.pageX, event.pageY);
            }
        }
    }

    window.onmousedown = mouseDown;
    window.onmouseup = mouseUp;
}
