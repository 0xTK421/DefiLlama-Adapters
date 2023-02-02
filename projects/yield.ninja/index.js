const axios = require("axios");

const YIELD_NINJA_API = "https://yielder.ninja/.netlify/functions/tvl";

const fetchAllTheThings = (chain) => async () => {
  const response = await axios.get(YIELD_NINJA_API);
  const { status, data = {} } = response;

  if (status == 200 && data[chain] !== undefined) {
    return { vault: +Number(data[chain]) };
  }

  return { vault: 0 };
};

module.exports = {
  methodology: `Calculates deposits in the vaults * LP Current price, cached for 30 mins`,
  bsc: {
    tvl: fetchAllTheThings("bsc"),
  },
  fantom: {
    tvl: fetchAllTheThings("fantom"),
  },
  polygon: {
    tvl: fetchAllTheThings("polygon"),
  },
};
