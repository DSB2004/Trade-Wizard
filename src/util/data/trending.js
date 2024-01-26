import { StockArray } from "../../asset/static/dashboard";
import { addIntoTrending } from "../../hook/redux-slice/Trending";
import store from "../../hook/store";
import { handler } from "../api/stock-api";
import { changeCurrent } from "../../hook/redux-slice/Current";
import { showNotification } from "../common/notify-user";
// update the trending hook in redux with symbols that are predefined in the project
export async function updateTrending() {
  try {
    StockArray.map(async (element) => {
      const response = await handler(element);
      store.dispatch(addIntoTrending(response));
      if (store.getState().Trending.dataArray.length === 1) {
        store.dispatch(changeCurrent(response));
      }
    });
  } catch (err) {
    showNotification("request")
  }
}
