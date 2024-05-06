const apiKey = "32c6cbe8714746799fbcb0063eddf0d6";
const blogContainer = document.getElementById("blog-container");

async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?domains=apple.com,bbc.com&pageSize=10&apiKey=${apiKey}`;
    const result = await fetch(apiUrl);
    const data = await result.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching random news", error);
    return [];
  }
}

function displayBlogs(articles) {
  blogContainer.innerHTML = "";
  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.onerror = () => {
      img.src =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png";
    };
    const title = document.createElement("h2");

    const trunkTitle =
      article.title.length > 30
        ? article.title.slice(0, 30) + "..."
        : article.title;
    title.textContent = trunkTitle;
    const description = document.createElement("p");
    console.log(article.description);
    if (article.description == null) {
      description.textContent = "No description available";
    } else {
      description.textContent = article.description.slice(0, 100) + "...";
    }

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);

    blogContainer.appendChild(blogCard);
  });
}

(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (error) {
    console.error("Error displaying blogs", error);
  }
})();
