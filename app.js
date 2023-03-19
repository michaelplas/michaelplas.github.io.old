// Function to fetch blog posts
function fetchPosts() {
    fetch("./posts/posts.json")
        .then(response => response.json())
        .then(data => {
            // Sort posts by date
            const sortedPosts = data.posts.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Clear existing posts
            const blogSection = document.querySelector("#blog-section");
            blogSection.innerHTML = "";

            // Add new posts
            sortedPosts.forEach(post => {
                const postCard = document.createElement("div");
                postCard.classList.add("post-card");

                const postCardImage = document.createElement("div");
                postCardImage.classList.add("post-card-image");
                postCardImage.style.backgroundImage = `url(${post.image})`;

                const postCardContent = document.createElement("div");
                postCardContent.classList.add("post-card-content");

                const postCardTitle = document.createElement("h3");
                postCardTitle.textContent = post.title;

                const postCardDate = document.createElement("span");
                postCardDate.classList.add("post-card-date");
                postCardDate.textContent = new Date(post.date).toDateString();

                const postCardSummary = document.createElement("p");
                postCardSummary.textContent = post.summary;

                const postCardButton = document.createElement("a");
                postCardButton.classList.add("post-card-button");
                postCardButton.textContent = "Read more";
                postCardButton.href = `./posts/${post.file}`;

                postCardContent.appendChild(postCardTitle);
                postCardContent.appendChild(postCardDate);
                postCardContent.appendChild(postCardSummary);
                postCardContent.appendChild(postCardButton);

                postCard.appendChild(postCardImage);
                postCard.appendChild(postCardContent);

                blogSection.appendChild(postCard);
            });
        })
        .catch(error => console.error(error));
}

// Fetch posts on page load
window.onload = fetchPosts;

// Poll for new posts every minute
setInterval(fetchPosts, 60000);