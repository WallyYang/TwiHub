'use strict';

/// <reference path="./file_entry.ts"/>

class FileCollection {
    public files: FileEntry[];

    constructor(body: HTMLBodyElement) {
        const fileElements = body.getElementsByClassName('file');

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

    public deselect(): void {
        for (const file of this.files) {
            file.deselect();
        }
    }
}
