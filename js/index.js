const $postsArea = document.querySelector('#postsArea');


async function renderImages() {
    const response = await fetch('http://localhost:3000/posts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();

    data.forEach(post => {
        $postsArea.innerHTML += `
            <div class="post ${post.direction}">
                <img src="${post.img}" alt="${post.title}">
            </div>
        `;
    });
}

renderImages();
