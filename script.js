const apiURL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
let coinData = [];

// ========== PART 1: FETCH USING .then ==========
function fetchUsingThen() {
  fetch(apiURL)
    .then(res => res.json())
    .then(data => {
      coinData = data;
      renderTable(coinData);
    })
    .catch(err => console.log("Error:", err));
}

// ========== PART 2: FETCH USING async/await ==========
async function fetchUsingAsync() {
  try {
    const res = await fetch(apiURL);
    const data = await res.json();
    coinData = data;
    renderTable(coinData);
  } catch (error) {
    console.log("Error:", error);
  }
}

// ======= choose ONE to load on start ======
fetchUsingAsync();  // 👈 async call
// fetchUsingThen(); // 👈 .then call


// ========== RENDER TABLE ==========
function renderTable(data) {
  const table = document.getElementById("tableBody");
  table.innerHTML = "";

  data.forEach(coin => {
    const row = `
      <tr>
        <td><img src="${coin.image}" alt="${coin.name}"></td>
        <td>${coin.name}</td>
        <td>${coin.symbol.toUpperCase()}</td>
        <td>$${coin.current_price}</td>
        <td>${coin.total_volume.toLocaleString()}</td>
        <td>${coin.market_cap.toLocaleString()}</td>
        <td style="color:${coin.price_change_percentage_24h >= 0 ? 'lightgreen':'red'};">
            ${coin.price_change_percentage_24h?.toFixed(2)}%
        </td>
      </tr>
    `;
    table.innerHTML += row;
  });
}

// ========== SEARCH ==========
document.getElementById("searchBtn").addEventListener("click", () => {
  const value = document.getElementById("searchInput").value.toLowerCase();
  const filtered = coinData.filter(
    coin => coin.name.toLowerCase().includes(value) || coin.symbol.toLowerCase().includes(value)
  );
  renderTable(filtered);
});

// ========== SORT BY MARKET CAP ==========
document.getElementById("sortMktCap").addEventListener("click", () => {
  const sorted = [...coinData].sort((a, b) => b.market_cap - a.market_cap);
  renderTable(sorted);
});

// ========== SORT BY PERCENTAGE ==========
document.getElementById("sortPercentage").addEventListener("click", () => {
  const sorted = [...coinData].sort(
    (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
  );
  renderTable(sorted);
});
