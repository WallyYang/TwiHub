'use strict';

const url = 'https://cidb.cf:21027';

const fileCollection = new FileCollection(<HTMLBodyElement>document.body);

initMouseEvents(url, fileCollection);
initGraph(fileCollection);

fetchAndRender(url, fileCollection);
