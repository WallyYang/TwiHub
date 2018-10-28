'use strict';

class FileCollection {
    public user: string;
    public repo: string;
    public files: FileEntry[];

    constructor() {
        const fileElements = document.body.getElementsByClassName('file');

        const sections = window.location.pathname.split('/');
        console.assert(sections.length > 3, <any>sections);

        this.user = sections[1];
        this.repo = sections[2];

        this.files = [];

        for (const fileElement of fileElements) {
            console.assert(fileElement instanceof HTMLDivElement, <any>fileElement);

            this.files.push(new FileEntry(<HTMLDivElement>fileElement));
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
