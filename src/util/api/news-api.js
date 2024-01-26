// const key=process.env
import Axios from "axios";
export async function handler() {
  try {

    const key = process.env.REACT_APP_FINNHUB_KEY;
    const res = await Axios.get(
      `https://finnhub.io/api/v1/news?category=general&token=${key}`
    );
    return res.data;
  }
  catch (err) {
    throw err;
  }
}
