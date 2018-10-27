'use strict';

export class FileInfo {
    public element: HTMLDivElement;
    public user: string;
    public repo: string;
    public commit: string;
    public path: string;

    constructor(actionElement: HTMLDivElement) {
        this.element = actionElement;

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
}
