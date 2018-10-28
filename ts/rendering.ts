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
            response.json().then((data) => {
                const frequencies = <number[]>data;
                const points = [];

                if (frequencies.length > 0) {
                    for (const line of file.lines) {
                        if (line.diffCommit === null) {
                            const frequency = frequencies.shift();

                            const elementBound = line.element.getBoundingClientRect();

                            points.push([elementBound.top + elementBound.height / 2, frequency]);
                        }
                    }

                    const dataElements = file.element.getElementsByClassName('data');
                    console.assert(dataElements.length === 1, <any>dataElements);

                    for (const dataElement of dataElements) {
                        console.assert(dataElement instanceof HTMLDivElement, <any>dataElement);

                        const elementBound = dataElement.getBoundingClientRect();

                        points.unshift([elementBound.top, points[0][1]]);
                        points.push([elementBound.bottom, points[points.length - 1][1]]);

                        const lines = normalize(movingAverage(interpolation(points), 20));

                        const canvasElements = file.element.getElementsByTagName('canvas');
                        console.assert(canvasElements.length === 1, <any>canvasElements);

                        for (const canvasElement of canvasElements) {
                            console.assert(canvasElement instanceof HTMLCanvasElement, <any>canvasElement);

                            canvasElement.width = canvasElement.clientWidth;
                            canvasElement.height = canvasElement.clientHeight;

                            const context = (<HTMLCanvasElement>canvasElement).getContext('2d');
                            const imageData = context.createImageData(1, 1);

                            imageData.data[0] = 0;
                            imageData.data[1] = 0;
                            imageData.data[2] = 0;

                            for (let i = 0; i < lines.length; i += 1) {
                                const limit = lines[i] * canvasElement.width;

                                imageData.data[3] = 255;

                                for (let j = 0; j < Math.floor(limit); ++j) {
                                    context.putImageData(imageData, j, canvasElement.height - lines.length + i);
                                }

                                imageData.data[3] = 255 * (1 - limit + Math.floor(limit));

                                context.putImageData(imageData, Math.floor(limit), canvasElement.height - lines.length + i);
                            }
                        }
                    }
                }
            });
        });
    }
}
