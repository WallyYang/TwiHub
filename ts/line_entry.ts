'use strict';

export class LineEntry {
    public element: HTMLTableRowElement;
    public line: number;
    public code: string;
    public diffCommit: string | null;

    public selected: boolean;

    constructor(lineElement: HTMLTableRowElement) {
        this.element = lineElement;

        const numElements = lineElement.getElementsByClassName('blob-num');
        console.assert(numElements.length === 1 || numElements.length === 2, <any> numElements);

        let lineDone = false;

        this.diffCommit = null;

        for (const numElement of numElements) {
            console.assert(numElement instanceof HTMLTableCellElement, <any> numElement);

            if (numElement.hasAttribute('id')) {
                const attribute = numElement.getAttribute('id');

                console.assert(attribute.startsWith('diff-'));

                this.diffCommit = attribute.slice('diff-'.length);
            }

            if (numElement.hasAttribute('data-line-number')) {
                const attribute = numElement.getAttribute('data-line-number');

                this.line = parseInt(attribute, 10);

                lineDone = true;
            }
        }
        console.assert(lineDone, <any> numElements);

        const codeElements = lineElement.getElementsByClassName('blob-code');
        console.assert(codeElements.length === 1, <any> codeElements);

        for (const codeElement of codeElements) {
            console.assert(codeElement instanceof HTMLTableCellElement, <any> codeElement);

            this.code = (<HTMLTableCellElement> codeElement).innerText;
        }
    }

    public select(top: number, bottom: number): void {
        const bound = this.element.getBoundingClientRect();

        this.selected = top <= bound.bottom && bottom >= bound.top;
    }
}
