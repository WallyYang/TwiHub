'use strict';

/// <reference path="./file_collection.ts"/>
/// <reference path="./popup.ts"/>
/// <reference path="./rendering.ts"/>

const url = 'https://cidb.cf:21027';

const fileCollection = new FileCollection(<HTMLBodyElement> document.body);

initMouseEvents(url, fileCollection);
fetchAndRender(url, fileCollection);
