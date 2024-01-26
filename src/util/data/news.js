import store from "../../hook/store";
import { createNewsArray } from "../../hook/redux-slice/News";
import { handler } from "../api/news-api";
// to get news info of market
export async function getNewsData() {
  try {
    if (store.getState().News !== null) {
      return store.getState().News;
    } else {
      let data = await handler();
      store.dispatch(createNewsArray(data));
      return data;
    }
  } catch (err) {}
}
