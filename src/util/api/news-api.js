// const key=process.env
import Axios from "axios";
export async function handler() {
  const key = process.env.REACT_APP_FINNHUB_KEY;
  const res = await Axios.get(
    `https://finnhub.io/api/v1/news?category=general&token=${key}`
  );
  return res.data;
}
