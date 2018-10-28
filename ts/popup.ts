'use strict';

function createButton(x: number, y: number): void {
    const button = document.createElement('button');
    const text = document.createTextNode('👍Like');

    button.appendChild(text);
    button.setAttribute('id', 'like');
    button.onclick = like;

    button.style['position'] = 'absolute';
    button.style['left'] = (x - 55).toString() + 'px';
    button.style['top'] = (y - 30).toString() + 'px';
    button.style['padding'] = '10px 20px';
    button.style['border'] = 'none';
    button.style['background-color'] = '#4CAF50';
    button.style['color'] = 'white';

    const body = document.body;

    body.appendChild(button);
}

function removeButton(): void {
    let button = document.getElementById('like');

    while (button !== null) {
        button.parentNode.removeChild(button);
        button = document.getElementById('like');
    }
}

function like() {

}

function initMouseEvents(): void {
    const fileCollection = new FileCollection();

    let initEvent = null;

    function mouseDown(event: MouseEvent): void {
        initEvent = event;
    }

    function mouseUp(event: MouseEvent): void {
        removeButton();
        if (initEvent !== null) {
            if (Math.abs(event.pageX - initEvent.pageX) + Math.abs(event.pageY - initEvent.pageY) < 32) {
                fileCollection.deselect();

                // removeButton();
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
