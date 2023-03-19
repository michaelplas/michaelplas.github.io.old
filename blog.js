// Get reference to the blog post container element
const blogPostContainer = document.getElementById("blog-posts");

// Fetch the blog post data from posts.json file
fetch("posts.json")
    .then((response) => response.json())
    .then((data) => {
        // Sort the posts by date (most recent first)
        const sortedPosts = data.posts.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });

        // Loop through the sorted posts and create a new post element for each one
        sortedPosts.forEach((post) => {
            // Create a new post element
            const postElement = document.createElement("article");
            postElement.classList.add("blog-post");

            // Add the post title
            const titleElement = document.createElement("h2");
            titleElement.classList.add("blog-post-title");
            titleElement.textContent = post.title;
            postElement.appendChild(titleElement);

            // Add the post date
            const dateElement = document.createElement("p");
            dateElement.classList.add("blog-post-date");
            dateElement.textContent = new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
            postElement.appendChild(dateElement);

            // Add the post content
            const contentElement = document.createElement("div");
            contentElement.classList.add("blog-post-content");
            contentElement.innerHTML = post.content;
            postElement.appendChild(contentElement);

            // Add the post element to the container
            blogPostContainer.appendChild(postElement);
        });
    })
    .catch((error) => {
        console.error("Error fetching posts:", error);
    });

// Set up an event listener to automatically reload the blog posts when a new post is added to the 'posts' directory
const eventSource = new EventSource("watch.php");
eventSource.onmessage = (event) => {
    console.log("New blog post detected. Reloading posts...");
    blogPostContainer.innerHTML = ""; // Clear the existing posts
    fetchBlogPosts(); // Reload the posts
};