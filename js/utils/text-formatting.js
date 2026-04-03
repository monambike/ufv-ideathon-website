/**************************************************************************
Copyright(c) 2026 UFV - Universidade Federal de Viçosa. All rights reserved.
Project from: Davi Atayde, Maria Eduarda Neves, Vinícius Gabriel.
For license information, please see the LICENSE file in the root directory.
**************************************************************************/

export default class TextFormatting {
  static removeAccents(str) {
    return str.normalize("NFD").replace(/\p{Diacritic}/gu, "");
  }

  static normalizeText(str) {
    return this.removeAccents(str.toLowerCase());
  }

  static returnCsvAsArray(csv) {
    return csv.match(/(".*?"|[^;]+)(?=;|$)/g)
              .map(c => c.replace(/^"|"$/g, '')); 
  }

  static removeDoubleQuotes(str) {
    return str.replace(/['"]+/g, '')
  }

  static decodeHtmlEntities(str) {
    const parser = new DOMParser();
    return parser.parseFromString(str, 'text/html').documentElement.textContent;
  }

  static decode(str) {
    var result = $('<textarea />').html(str).text();
    return result;
  }
}
