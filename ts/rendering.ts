'use strict';

/// <reference path="./file_collection.ts"/>

function fetchAndRender(url: string, fileCollection: FileCollection) {
    for (const file of fileCollection.files) {
        let code = '';

        for (const line of file.lines) {
            if (line.diffCommit === null) {
                code += line.code + '\n';
            }
        }

        const xhr = new XMLHttpRequest();

        xhr.open('GET', url + '/get', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('X-LAURENCE', '6');
        xhr.send(JSON.stringify({
            'Repo': file.info.user + '/' + file.info.repo,
            'Code': code,
        }));
    }
}
