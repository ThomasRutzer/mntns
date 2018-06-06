/**
 * searches for nested property in
 * object, based on argument pathArr
 */
const findDeep = (nestedObj: object, pathArr: string[]) => {
    return pathArr.reduce((obj, key) =>
        (obj && obj[key] !== 'undefined') ? obj[key] : null, nestedObj);
};

export default findDeep;