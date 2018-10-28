'use strict';

let button = null;

function performLike(fileCollection: FileCollection, weight: number): void {
    for (const file of fileCollection.files) {
        let code = '';

        for (const line of file.lines) {
            if (line.selected && line.line !== null) {
                code += line.code + '\n';
            }
        }

        if (code !== '') {
            sendLike(fileCollection.user + '/' + fileCollection.repo, code, weight);
        }
    }
}

function clearSelection() {
    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    } else if (document.getSelection) {
        document.getSelection().removeAllRanges();
    }
}

function createButton(fileCollection: FileCollection, x: number, y: number): void {
    removeButton();

    button = document.createElement('button');

    const text = document.createTextNode('👍Like');

    button.appendChild(text);

    button.onmousedown = () => {
        performLike(fileCollection, 10);
        clearSelection();
    };

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
    if (button !== null) {
        button.parentNode.removeChild(button);
        button = null;
    }
}

function initMouseEvents(): void {
    const fileCollection = new FileCollection();

    let initEvent = null;

    function mouseDown(event: MouseEvent): void {
        initEvent = event;
    }

    function mouseUp(event: MouseEvent): void {
        if (initEvent !== null) {
            if (Math.abs(event.pageX - initEvent.pageX) + Math.abs(event.pageY - initEvent.pageY) < 32) {
                fileCollection.deselect();

                removeButton();
            } else {
                fileCollection.select(
                    Math.min(event.pageY, initEvent.pageY),
                    Math.max(event.pageY, initEvent.pageY)
                );

                performLike(fileCollection, 1);

                createButton(fileCollection, event.pageX, event.pageY);
            }
        }
    }

    window.onmousedown = mouseDown;
    window.onmouseup = mouseUp;
}
