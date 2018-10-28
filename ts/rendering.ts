'use strict';

function initGraph(fileCollection: FileCollection) {
    for (const file of fileCollection.files) {
        for (const line of file.lines) {
            const cellElement = document.createElement('td');

            cellElement.classList.add('blob-num');
            cellElement.classList.add('canvas-cell');
            cellElement.style.width = '75px';
            cellElement.style.height = '20px';

            const canvasElement = document.createElement('canvas');

            canvasElement.style.position = 'absolute';
            canvasElement.style.width = '75px';
            canvasElement.style.height = '20px';
            // canvasElement.style.background = 'black';

            cellElement.appendChild(canvasElement);

            line.element.insertBefore(cellElement, line.element.childNodes[0]);
        }
    }

};

function fetchAndRender(url: string, fileCollection: FileCollection) {
    for (const file of fileCollection.files) {
        let code = '';

        for (const line of file.lines) {
            if (line.diffCommit === null) {
                code += line.code + '\n';
            }
        }

        fetch(url + '/render', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                'Repo': file.info.user + '/' + file.info.repo,
                'Code': code,
            }),
        }).then((response) => {
            console.log(response.json());
        });
    }
}
