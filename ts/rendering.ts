'use strict';

function fetchAndRender(url: string, fileCollection: FileCollection) {
    for (const file of fileCollection.files) {
        let code = '';

        for (const line of file.lines) {
            if (line.diffCommit === null) {
                code += line.code + '\n';
            }
        }

        fetch(url + '/render', {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                'Repo': file.info.user + '/' + file.info.repo,
                'Code': code,
            }),
        }).then((response) => {
            console.log(response.json());
        });
    }
}
