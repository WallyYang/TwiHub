'use strict';

function initGraph(fileCollection: FileCollection) {
    for (const file of fileCollection.files) {
        const dataElements = file.element.getElementsByClassName('data');
        console.assert(dataElements.length === 1, <any>dataElements);

        for (const dataElement of dataElements) {
            console.assert(dataElement instanceof HTMLDivElement, <any>dataElement);

            (<HTMLDivElement>dataElement).style['padding-left'] = '75px';

            const canvasElement = document.createElement('canvas');

            canvasElement.style['position'] = 'absolute';
            canvasElement.style['left'] = '0';
            canvasElement.style['top'] = '0';
            canvasElement.style['width'] = '75px';
            canvasElement.style['height'] = '100%';

            dataElement.appendChild(canvasElement);
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
