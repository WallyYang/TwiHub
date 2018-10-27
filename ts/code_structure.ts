'use strict';

class LineEntry {
    public element: HTMLTableRowElement;
    public line: number;
    public code: string;
    public diffCommit: string | null;

    constructor(lineElement: HTMLTableRowElement) {
        this.element = lineElement;

        const numElements = lineElement.getElementsByClassName('blob-num');
        console.assert(numElements.length === 1 || numElements.length === 2, <any> numElements);

        for (const numElement of numElements) {
            console.assert(numElement instanceof HTMLTableCellElement, <any> numElement);

            if (numElement.hasAttribute('data-line-number')) {
                this.line = parseInt(numElement.getAttribute('data-line-number'), 10);
            }
        }
        console.assert(this.line !== undefined, <any> numElements);

        const codeElements = lineElement.getElementsByClassName('blob-code');
        console.assert(codeElements.length === 1, <any> codeElements);

        for (const codeElement of codeElements) {
            console.assert(codeElement instanceof HTMLTableCellElement, <any> codeElement);

            this.code = (<HTMLTableCellElement> codeElement).innerText;
        }
    }
}

class FileEntry {
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

            let pathname = null;

            for (const buttonElement of buttonElements) {
                console.assert(buttonElement instanceof HTMLAnchorElement, <any> buttonElement);

                const newPathname = (<HTMLAnchorElement> buttonElement).pathname;

                if (pathname === null) {
                    pathname = newPathname;
                } else {
                    console.assert(pathname === newPathname, pathname, newPathname);
                }
            }

            const sections = pathname.split('/');
            console.assert(sections.length > 5, <any> sections);

            this.user = sections[1];
            this.repo = sections[2];
            this.commit = sections[4];
            this.path = sections.slice(5).join('/');
        }

        const dataElements = fileElement.getElementsByClassName('data');
        console.assert(dataElements.length === 1, <any> dataElements);

        this.lines = [];

        for (const dataElement of dataElements) {
            console.assert(dataElement instanceof HTMLDivElement, <any> dataElement);

            const lineElements = dataElement.getElementsByTagName('tr');

            for (const lineElement of lineElements) {
                console.assert(dataElement instanceof HTMLTableRowElement, <any> dataElement);

                this.lines.push(new LineEntry(<HTMLTableRowElement> lineElement));
            }
        }
    }
}

function getAll(): FileEntry[] {
    const fileElements = document.getElementsByClassName('file');
    const result = [];

    for (const fileElement of fileElements) {
        console.assert(fileElement instanceof HTMLDivElement, <any> fileElement);

        result.push(new FileEntry(<HTMLDivElement> fileElement));
    }

    return result;
}
