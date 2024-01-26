import Axios from "axios";
import { showNotification } from "../common/notify-user";
import { Exist } from "../common/verify"
export async function handler(symbol) {
  const key = process.env.REACT_APP_FINNHUB_KEY;
  try {
    const recommendedtrend = await Axios.get(
      `https://finnhub.io/api/v1/stock/recommendation?symbol=${symbol}&token=${key}`
    );
    const quotedata = await Axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${key}`
    );
    const profile = await Axios.get(
      `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${key}`
    );


    if (Exist(quotedata.data)) {
      return {
        symbol,
        recommendedtrend: recommendedtrend.data,
        quotedata: quotedata.data,
        profile: profile.data,
      };
    }
    else {
      showNotification("notfound", symbol)
    }
  } catch (err) {
    throw err;
  }
}
