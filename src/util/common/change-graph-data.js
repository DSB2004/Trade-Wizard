// to change data in recommended graph 

export function changeGraphData(data, id) {
  const returnObject = { dataArray: [], labelArray: [] };
  if (id === "Buy") {
    data.forEach((element) => {
      returnObject.dataArray.push(element.buy);
      returnObject.labelArray.push(element.period);
    });
  } else if (id === "Sell") {
    data.forEach((element) => {
      returnObject.dataArray.push(element.sell);
      returnObject.labelArray.push(element.period);
    });
  } else if (id === "Hold") {
    data.forEach((element) => {
      returnObject.dataArray.push(element.hold);
      returnObject.labelArray.push(element.period);
    });
  }
  return returnObject;
}
