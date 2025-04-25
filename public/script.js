let timeout;

document.getElementById("searchInput").addEventListener("input", function () {
  const query = this.value.trim();

  if (timeout) clearTimeout(timeout);

  timeout = setTimeout(() => {
    if (query.length < 3) {
      document.getElementById("results").innerHTML = "<li>Type at least 3 characters</li>";
      return;
    }

    fetch(`/api/search?query=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        const list = data.length
          ? data.map(item => `<li>${item}</li>`).join("")
          : "<li>No results found</li>";
        document.getElementById("results").innerHTML = list;
      })
      .catch(() => {
        document.getElementById("results").innerHTML = "<li>Error fetching results</li>";
      });
  }, 300); // debounce delay
});
