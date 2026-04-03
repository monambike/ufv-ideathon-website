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