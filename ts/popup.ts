'use strict';

function createButton(x: number, y: number): void {
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

function initMouseEvents(): void {
    const fileCollection = new FileCollection();

    let initEvent = null;

    function mouseDown(event: MouseEvent): void {
        initEvent = event;
    }

    function mouseUp(event: MouseEvent): void {
        if (initEvent !== null) {
            if (Math.abs(event.pageX - initEvent.pageX) + Math.abs(event.pageY - initEvent.pageY) >= 32) {
                fileCollection.deselect();
            } else {
                fileCollection.select(
                    Math.min(event.pageY, initEvent.pageY),
                    Math.max(event.pageY, initEvent.pageY)
                );

                for (const file of fileCollection.files) {
                    let code = '';

                    for (const line of file.lines) {
                        if (line.selected && line.line !== null) {
                            code += line.code + '\n';
                        }
                    }

                    if (code !== '') {
                        sendLike(fileCollection.user + '/' + fileCollection.repo, code);
                    }
                }

                createButton(event.pageX, event.pageY);
            }
        }
    }

    window.onmousedown = mouseDown;
    window.onmouseup = mouseUp;
}
