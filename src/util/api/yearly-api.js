import Axios from "axios";

export async function handler(symbol) {
  try {

    const key = process.env.REACT_APP_POLYGON_KEY;
    const url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/2022-07-09/2023-01-09?adjusted=true&sort=asc&limit=6&apiKey=${key}`;
    const res = await Axios.get(url);
    return res.data;
  }
  catch (err) {
    throw err;
  }
}
