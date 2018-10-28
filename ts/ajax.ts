'use strict';

function sendLike(repo: string, code: string): Promise<null> {
    return fetch(url + '/like', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            'Repo': repo,
            'Code': code,
        }),
    }).then((response) => {
        return null;
    });
}

function sendRender(repo: string, code: string): Promise<number[]> {
    return fetch(url + '/render', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            'Repo': repo,
            'Code': code,
        }),
    }).then((response) => {
        return response.json();
    });
}
