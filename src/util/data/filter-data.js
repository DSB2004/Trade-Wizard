import store from "../../hook/store";
import { changeCurrent } from "../../hook/redux-slice/Current";
export function changeIntro(data) {
  store.dispatch(changeCurrent(data));
}
