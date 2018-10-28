'use strict';

function initGraph(fileCollection: FileCollection) {
    for (const file of fileCollection.files) {
        const dataElements = file.element.getElementsByClassName('data');
        console.assert(dataElements.length === 1, <any>dataElements);

        for (const dataElement of dataElements) {
            console.assert(dataElement instanceof HTMLDivElement, <any>dataElement);

            (<HTMLDivElement>dataElement).style['padding-left'] = '60px';

            const canvasElement = document.createElement('canvas');

            canvasElement.style['position'] = 'absolute';
            canvasElement.style['left'] = '0';
            canvasElement.style['top'] = '0';
            canvasElement.style['width'] = '60px';
            canvasElement.style['height'] = '100%';

            dataElement.appendChild(canvasElement);
        }
    }
};

function fetchAndRender(url: string, fileCollection: FileCollection) {
    for (const file of fileCollection.files) {
        let code = '';

        for (const line of file.lines) {
            if (line.line !== null) {
                code += line.code + '\n';
            }
        }

        sendRender(fileCollection.user + '/' + fileCollection.repo, code).then((frequencies) => {
            const points = [];

            if (frequencies.length > 0) {
                let first = null;
                let last = null;

                for (const line of file.lines) {
                    if (line.line !== null) {
                        const frequency = frequencies.shift();

                        const elementBound = line.element.getBoundingClientRect();

                        points.push([elementBound.top + elementBound.height / 2, frequency]);

                        if (first === null) {
                            first = elementBound.top;
                        }
                        last = elementBound.bottom;
                    }
                }

                points.unshift([first, 0]);
                points.push([last, 0]);

                const lines = normalize(movingAverage(interpolation(points), 20));

                const canvasElements = file.element.getElementsByTagName('canvas');
                console.assert(canvasElements.length === 1, <any>canvasElements);

                for (const canvasElement of canvasElements) {
                    console.assert(canvasElement instanceof HTMLCanvasElement, <any>canvasElement);

                    canvasElement.width = canvasElement.clientWidth;
                    canvasElement.height = canvasElement.clientHeight;

                    const context = (<HTMLCanvasElement>canvasElement).getContext('2d');
                    const imageData = context.createImageData(1, 1);

                    for (let i = 0; i < lines.length; i += 1) {
                        const limit = lines[i] * canvasElement.width;

                        const color = colorInterpolation(lines[i]);

                        imageData.data[0] = color[0];
                        imageData.data[1] = color[1];
                        imageData.data[2] = color[2];
                        imageData.data[3] = 255;

                        for (let j = 0; j < Math.floor(limit); j += 1) {
                            context.putImageData(imageData, j, canvasElement.height - lines.length + i);
                        }

                        imageData.data[3] = 255 * (limit - Math.floor(limit));

                        context.putImageData(imageData, Math.floor(limit), canvasElement.height - lines.length + i);
                    }
                }
            }
        });
    }
}
