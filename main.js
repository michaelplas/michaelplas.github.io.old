const postSection = document.getElementById("post-section");

// Function to fetch the recent posts from the posts.json file
async function fetchPosts() {
    try {
        const response = await fetch("./posts.json");
        const data = await response.json();
        return data.posts;
    } catch (error) {
        console.log(error);
    }
}

// Function to create a post card element
function createPostCard(post) {
    const postCard = document.createElement("div");
    postCard.classList.add("card");

    const postImage = document.createElement("img");
    postImage.classList.add("card-img-top");
    postImage.src = post.image ? post.image : "https://picsum.photos/500/300";
    postImage.alt = post.title;

    const postCardBody = document.createElement("div");
    postCardBody.classList.add("card-body");

    const postTitle = document.createElement("h5");
    postTitle.classList.add("card-title");
    postTitle.textContent = post.title;

    const postLink = document.createElement("a");
    postLink.classList.add("btn", "btn-primary");
    postLink.href = `./posts/${post.file}`;
    postLink.textContent = "Read More";

    postCardBody.appendChild(postTitle);
    postCardBody.appendChild(postLink);

    postCard.appendChild(postImage);
    postCard.appendChild(postCardBody);

    return postCard;
}

// Function to add the recent posts to the index.html page
async function addRecentPosts() {
    const posts = await fetchPosts();
    const recentPosts = posts.slice(-3);

    recentPosts.forEach((post) => {
        const postCard = createPostCard(post);
        postSection.appendChild(postCard);
    });
}

addRecentPosts();
