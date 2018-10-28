'use strict';

class FileEntry {
    public element: HTMLDivElement;
    public lines: LineEntry[];

    constructor(fileElement: HTMLDivElement) {
        this.element = fileElement;

        const dataElements = fileElement.getElementsByClassName('data');
        console.assert(dataElements.length === 1, <any>dataElements);

        this.lines = [];

        for (const dataElement of dataElements) {
            console.assert(dataElement instanceof HTMLDivElement, <any>dataElement);

            const lineElements = dataElement.getElementsByTagName('tr');

            for (const lineElement of lineElements) {
                console.assert(lineElement instanceof HTMLTableRowElement, <any>lineElement);

                if (lineElement.attributes.length === 0) {
                    this.lines.push(new LineEntry(<HTMLTableRowElement>lineElement));
                }
            }
        }
    }

    public select(top: number, bottom: number): void {
        for (const line of this.lines) {
            line.select(top, bottom);
        }
    }

    public deselect(): void {
        for (const line of this.lines) {
            line.deselect();
        }
    }
}
