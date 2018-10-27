'use strict';

import { LineEntry } from './line_entry';

export class FileEntry {
    public element: HTMLDivElement;
    public user: string;
    public repo: string;
    public commit: string;
    public path: string;
    public lines: LineEntry[];

    constructor(fileElement: HTMLDivElement) {
        this.element = fileElement;

        const actionElements = fileElement.getElementsByClassName('file-actions');
        console.assert(actionElements.length === 1, <any> actionElements);

        for (const actionElement of actionElements) {
            console.assert(actionElement instanceof HTMLDivElement, <any> actionElement);

            const buttonElements = actionElement.getElementsByClassName('btn');
            console.assert(buttonElements.length > 0, <any> buttonElements);

            let pathDone = null;

            for (const buttonElement of buttonElements) {
                console.assert(buttonElement instanceof HTMLAnchorElement, <any> buttonElement);

                const sections = (<HTMLAnchorElement> buttonElement).pathname.split('/');
                console.assert(sections.length > 5, <any> sections);

                if (pathDone) {
                    console.assert(this.user === sections[1], this.user, sections[1]);
                    console.assert(this.repo === sections[2], this.repo, sections[2]);
                    console.assert(this.commit === sections[4], this.commit, sections[4]);
                    console.assert(this.path === sections.slice(5).join('/'), this.path, sections.slice(5).join('/'));
                } else {
                    this.user = sections[1];
                    this.repo = sections[2];
                    this.commit = sections[4];
                    this.path = sections.slice(5).join('/');

                    pathDone = true;
                }
            }
            console.assert(pathDone, <any> buttonElements);
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
