import LZString from 'lz-string';

/**
 * Generate a valid URL encoded string with the provided data
 * @param version    Current version of the app
 * @param data       Array of answers
 * @returns {*|string}
 */
export function encodeDataForURI(version, data){
  let json = JSON.stringify({version, data});
  return LZString.compressToEncodedURIComponent(json);
}

/**
 * Decode the data from a query string parameters
 * @param queryString
 * @returns []  The version and the answers array
 */
export function decodeURIAnswersParam(queryString){
  const string = LZString.decompressFromEncodedURIComponent(queryString);
  return JSON.parse(string);
}

/**
 * Populate a state with a queryString parameter
 */
export function mergeDefaultAndQS(defaultData, queryString){
  const {version, data} = decodeURIAnswersParam(queryString);
  if (defaultData.version !== version){
    throw 'Invalid version';
  }
  return {...defaultData, ...data};
}

/**
 * Return an object including all the queryString parameters
 */
export function getQueryStringParams() {
  const query = window.location.search.substring(1), vars = query.split('&'), params = {};
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('='), key = pair[0], value = pair[1];
    params[key] = value;
  }
  return params;
}
