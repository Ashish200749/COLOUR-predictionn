const axios = require('axios');
const fs = require('fs');

async function fetchJalwaResult() {
  try {
    const { data } = await axios.get("https://www.jalwagame6.com/api/lotteryRecord?page=1&pageSize=1");
    const latest = data?.data?.list?.[0]?.openNumber;
    if (latest) {
      fs.writeFileSync('latest.json', JSON.stringify({ number: latest }));
    }
  } catch (err) {
    console.error("Scraper error:", err.message);
  }
}

setInterval(fetchJalwaResult, 3000);