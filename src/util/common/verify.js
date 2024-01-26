export function Exist(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === null) {
            return false;
        }
    }
    return true;
}

