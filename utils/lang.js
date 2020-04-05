function isObject(value) {
    const type = typeof value;
    return (
        value !== null && (type === 'object' || type === 'function') && Array.isArray(value) === false
    );
}

function isArray(value) {
    const isArrayFn =
        Array.isArray || (arg => Object.prototype.toString.call(arg) === '[object Array]');
    return isArrayFn(value);
}

function isString(value) {
    return Object.prototype.toString.call(value) === '[object String]';
}

function isNumber(value) {
    return typeof value === 'number' && value !== Infinity;
}

function isEmpty(value) {
    if (value === null || value === undefined || value === "") return true;
    if (isObject(value)) return Object.keys(value).length === 0;
    if (isArray(value)) return value.length === 0;

    return false;
}

function toThousands(value) {

    if ( value === "" || value === null ) return '---';

    const splitArr = value.toString().split(".");

    const parserIntPartArr = Number.parseInt(splitArr[0]).toString().split('')
    const decimalPart = () =>{
        if (splitArr[1] && splitArr[1].length>0) return `.${splitArr[1].substring(0,2)}`
        return '.00'
    }

    let result = [];
    let counter  = 0;


    for (let i = parserIntPartArr.length - 1; i >= 0; i--) {
        counter++;
        result.unshift(parserIntPartArr[i]);
        if (!(counter % 3) && i !== 0) { result.unshift(','); }
    }

    return result.join("")+decimalPart();
}

export { isString, isObject, isArray, isEmpty, toThousands };