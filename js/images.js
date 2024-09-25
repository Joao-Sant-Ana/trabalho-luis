const $postsArea = document.querySelector('#postsArea');
const $postPopup = document.querySelector('#postDetails');
const $postPopupBackground = document.querySelector('#postDetailsBackground');
let $posts;

async function getImages() {
    const response = await fetch('http://localhost:3000/posts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();

    return data;
}

async function renderImages() {
    const data = await getImages();

    data.forEach(post => {
        $postsArea.innerHTML += `
            <div class="post ${post.direction}" id="${post.id}">
                <img src="${post.img}" alt="${post.title}">
            </div>
        `;
    });

    $posts = document.querySelectorAll('.post');

    $posts.forEach(post => {
        post.addEventListener('click', () => {
            openPost(data[post.id - 1]);
        });
    });
}

function openPost(post) {
    $postPopupBackground.style.display = 'block';
    $postPopup.style.display = 'flex';

    $postPopup.innerHTML = `
        <div class="post" id="${post.id}">
            <div>
                <h1>${post.title}</h1>
                <img src="../assets/img/close.svg" alt="Fechar" onclick="closePost()" class="close">
            </div> 
            <img src="${post.img}" alt="${post.title}">
            <div>
                <p>${post.likes}</p>
                <p>10</p>
            </div>
            <hr />
            <input type="text" placeholder="Escreva um comentário...">
        </div>
    `
}

renderImages();
