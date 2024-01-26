// convert a array of objects to object of arrays
export function ObjectOfArray(data) {
  const refObj = {};
  if (Array.isArray(data)) {
    data.forEach((dataObj) => {
      Object.keys(dataObj).forEach((key) => {
        if (!refObj[key]) {
          refObj[key] = [];
        }
        refObj[key].push(dataObj[key]);
      });
    });
  }
  return refObj;
}
