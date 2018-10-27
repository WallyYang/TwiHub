'use strict';

import { FileInfo } from './file_info';
import { LineEntry } from './line_entry';

export class FileEntry {
    public element: HTMLDivElement;
    public info: FileInfo;
    public lines: LineEntry[];

    constructor(fileElement: HTMLDivElement) {
        this.element = fileElement;

        const actionElements = fileElement.getElementsByClassName('file-actions');
        console.assert(actionElements.length === 1, <any> actionElements);

        for (const actionElement of actionElements) {
            console.assert(actionElement instanceof HTMLDivElement, <any> actionElement);

            this.info = new FileInfo(<HTMLDivElement> actionElement);
        }

        const dataElements = fileElement.getElementsByClassName('data');
        console.assert(dataElements.length === 1, <any> dataElements);

        this.lines = [];

        for (const dataElement of dataElements) {
            console.assert(dataElement instanceof HTMLDivElement, <any> dataElement);

            const lineElements = dataElement.getElementsByTagName('tr');

            for (const lineElement of lineElements) {
                console.assert(lineElement instanceof HTMLTableRowElement, <any> lineElement);

                this.lines.push(new LineEntry(<HTMLTableRowElement> lineElement));
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
