'use strict';

class LineEntry {
    public element: HTMLTableRowElement;
    public line: number | null;
    public diffLine: number | null;
    public diffCommit: string | null;
    public code: string;

    public selected: boolean;

    constructor(lineElement: HTMLTableRowElement) {
        this.element = lineElement;

        const numElements = lineElement.getElementsByClassName('blob-num');
        console.assert(numElements.length === 1 || numElements.length === 2, <any>numElements);

        this.line = null;
        this.diffLine = null;
        this.diffCommit = null;

        for (const numElement of numElements) {
            console.assert(numElement instanceof HTMLTableCellElement, <any>numElement);

            if (numElements.length === 2 && numElement === numElements[0]) {
                if (numElement.hasAttribute('id')) {
                    const attribute = numElement.getAttribute('id');

                    if (attribute.startsWith('diff-')) {
                        this.diffCommit = attribute.slice('diff-'.length);
                    }
                }

                if (numElement.hasAttribute('data-line-number')) {
                    const attribute = numElement.getAttribute('data-line-number');

                    this.diffLine = parseInt(attribute, 10);
                }
            } else if (numElement.hasAttribute('data-line-number')) {
                const attribute = numElement.getAttribute('data-line-number');

                this.line = parseInt(attribute, 10);
            }
        }

        const codeElements = lineElement.getElementsByClassName('blob-code');
        console.assert(codeElements.length === 1, <any>codeElements);

        for (const codeElement of codeElements) {
            console.assert(codeElement instanceof HTMLTableCellElement, <any>codeElement);

            this.code = (<HTMLTableCellElement>codeElement).innerText;
        }
    }

    public select(top: number, bottom: number): void {
        const elementBound = this.element.getBoundingClientRect();
        const bodyBound = document.body.getBoundingClientRect();

        this.selected = top <= elementBound.bottom - bodyBound.top
            && bottom >= elementBound.top - bodyBound.top;
    }

    public deselect(): void {
        this.selected = false;
    }
}
