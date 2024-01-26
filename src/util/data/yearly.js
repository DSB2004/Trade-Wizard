import { addToPrev } from "../../hook/redux-slice/Yearly-Data";
import store from "../../hook/store";
import { handler } from "../api/yearly-api";
import { ObjectOfArray } from "../common/modify";
import { searchStock } from "./search";
export async function StockData(symbol) {
  const responseObject = await searchStock(symbol);
  let YearlyData = null;
  const YearlyList = store.getState().YearlyData;
  if (YearlyList.find((element) => element.ticker === symbol)) {
    YearlyData = YearlyList.find(
      (element) => element.ticker === symbol
    ).results;
  } else {
    YearlyData = await handler(symbol);
    store.dispatch(addToPrev(YearlyData));
    YearlyData = YearlyData.results;
  }
  let refObj = ObjectOfArray(YearlyData);
  let newObj = { ...responseObject, prevData: refObj };
  return newObj;
}
