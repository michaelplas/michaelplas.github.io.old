const POSTS_FOLDER = 'posts/';
const POSTS_EXTENSION = '.txt';
const POSTS_LIMIT = 5;
const NO_IMAGE_URL = 'https://picsum.photos/seed/no-image/300/200';

// Get the recent posts container
const recentPostsContainer = document.getElementById('recent-posts');

// Create a function to get the posts data from the server
const getPostsData = async () => {
    const response = await fetch(POSTS_FOLDER);
    const text = await response.text();
    const filenames = text.split('\n').filter(Boolean).filter((filename) => filename.endsWith(POSTS_EXTENSION));
    const filesData = await Promise.all(filenames.slice(0, POSTS_LIMIT).map(async (filename) => {
        const response = await fetch(`${POSTS_FOLDER}${filename}`);
        const text = await response.text();
        const [title, date, image, content] = text.split('\n');
        return {
            title,
            date,
            image,
            content
        };
    }));
    return filesData;
};

// Create a function to generate the recent post cards
const generateRecentPostCard = (postData) => {
    const { title, image = NO_IMAGE_URL } = postData;
    const card = document.createElement('div');
    card.classList.add('card', 'mb-4', 'shadow-sm');
    card.innerHTML = `
    <img class="card-img-top" src="${image}" alt="${title}">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <a href="${POSTS_FOLDER}${title.replace(/\s+/g, '-').toLowerCase()}${POSTS_EXTENSION}" class="btn btn-primary">Read more</a>
    </div>
  `;
    return card;
};

// Populate the recent posts section with data from the server
getPostsData().then((postsData) => {
    postsData.forEach((postData) => {
        const card = generateRecentPostCard(postData);
        recentPostsContainer.appendChild(card);
    });
});
