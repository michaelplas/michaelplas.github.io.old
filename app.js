const postFolder = "posts/";
const row = document.querySelector(".row");

fetch(`${postFolder}index.json`)
    .then(response => response.json())
    .then(posts => {
        posts.forEach(post => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
				<img src="${post.image}" alt="${post.title}">
				<div class="content">
					<h2>${post.title}</h2>
					<p>${post.description}</p>
				</div>
			`;
            row.appendChild(card);
        });
    })
    .catch(error => console.error(error));