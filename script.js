const postsFolder = "posts/";
const maxPosts = 6;

function loadPosts() {
    fetch(postsFolder + "posts.json")
        .then((response) => response.json())
        .then((data) => {
            const posts = data.posts;
            const postList = document.querySelector(".post-list");

            if (!posts || !postList) return;

            // Sort posts by date (newest first)
            posts.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Limit the number of posts displayed
            const limitedPosts = posts.slice(0, maxPosts);

            // Generate HTML for each post and add it to the post list
            limitedPosts.forEach((post) => {
                const postItem = document.createElement("div");
                postItem.classList.add("post-item");

                const postLink = document.createElement("a");
                postLink.classList.add("post-link");
                postLink.href = "post.html?id=" + post.id;

                const postImage = document.createElement("div");
                postImage.classList.add("post-image");
                postImage.style.backgroundImage = post.image ? `url('${postsFolder}${post.image}')` : "url('https://via.placeholder.com/640x480.png?text=Darkwing+Duck')";

                const postTitle = document.createElement("h2");
                postTitle.classList.add("post-title");
                postTitle.textContent = post.title;

                postLink.appendChild(postImage);
                postLink.appendChild(postTitle);
                postItem.appendChild(postLink);
                postList.appendChild(postItem);
            });
        })
        .catch((error) => console.error(error));
}

loadPosts();