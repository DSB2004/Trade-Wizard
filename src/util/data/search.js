import store from "../../hook/store";
import { addIntoTrending } from "../../hook/redux-slice/Trending";
import { handler } from "../api/stock-api";
import { changeIntro } from "./filter-data";
export async function searchStock(symbol) {
  if (typeof symbol === "string" && /^[a-zA-Z]+$/.test(symbol)) {
    symbol = symbol.toUpperCase();
    try {
      const trendingList = store.getState().Trending.dataArray;
      const stock = trendingList.find((element) => element?.symbol === symbol);
      if (stock) {
        changeIntro(stock);
        return stock;
      } else {
        const response = await handler(symbol);
        if (response) {
          store.dispatch(addIntoTrending(response));
        }
        return response;
      }
    } catch (err) {
      console.error(err);
    }
  }
}
