'use strict';

import { FileEntry } from './file_entry';

export class FileList {
    public files: FileEntry[];

    constructor() {
        const fileElements = document.getElementsByClassName('file');

        this.files = [];

        for (const fileElement of fileElements) {
            console.assert(fileElement instanceof HTMLDivElement, <any> fileElement);

            this.files.push(new FileEntry(<HTMLDivElement> fileElement));
        }
    }

    public select(top: number, bottom: number): void {
        for (const file of this.files) {
            file.select(top, bottom);
        }
    }
}
