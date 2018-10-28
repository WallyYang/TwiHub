'use strict';

function initMouseEvents(url: string, fileCollection: FileCollection) {
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

                    fetch(url + '/like', {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Content-type': 'application/x-www-form-urlencoded',
                        },
                        body: JSON.stringify({
                            'Repo': file.info.user + '/' + file.info.repo,
                            'Code': code,
                        }),
                    });
                }

                createButton(event.clientX, event.clientY);
            }
        }
    }

    window.onmousedown = mouseDown;
    window.onmouseup = mouseUp;
}


function createButton(x: number, y: number) {
    let button = document.createElement("button");
    let text = document.createTextNode("Like");
    button.appendChild(text);
    button.setAttribute("id", "like");

    console.log(x);
    console.log(y);
    console.log(window.innerWidth);
    console.log(window.innerHeight);

    // button.style.height = "50px";
    button.style.width = "50px";
    button.style.position = "fixed";
    // button.style.right = "5px";
    button.style.right = (window.innerWidth - x).toString() + "px";
    // button.style.right = (50).toString();
    // button.style.bottom = "0";
    button.style.bottom = (window.innerHeight - y).toString() + "px";
    // button.style.bottom = (50).toString();

    let body = document.getElementsByTagName("body")[0];
    body.appendChild(button);
}
