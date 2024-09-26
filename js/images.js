const $postsArea = document.querySelector('#postsArea');
const $postPopup = document.querySelector('#postDetails');
const $postPopupBackground = document.querySelector('#postDetailsBackground');
let $posts;
let comment;

async function getPosts() {
    const response = await fetch('http://localhost:3000/posts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();

    return data;
}

async function getComments() {
    const response = await fetch('http://localhost:3000/comments', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const data = await response.json();

    return data;
}

async function renderImages() {
    const posts = await getPosts();

    posts.forEach(post => {
        $postsArea.innerHTML += `
            <div class="post ${post.direction}" id="${post.id}">
                <img src="${post.img}" alt="${post.title}">
            </div>
        `;
    });

    $posts = document.querySelectorAll('.post');

    $postsArea.addEventListener('click', (event) => {
        const postElement = event.target.closest('.post');
        
        if (postElement) {
            const postId = postElement.id;
            openPost(posts[postId - 1]);
        }
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
            <img src="${post.img}" alt="${post.title}" class="post-img">
            <div class="post-details">
                <div>
                    <img src="../assets/img/heartIcon.svg" alt="Comentario" class="heart">
                    <p>${post.likes} Curtidas</p>
                </div>
                <div>
                    <img src="../assets/img/chatIcon.svg" alt="Comentarios" class="chat">
                    <p>10</p>
                </div>    
            </div>
            <hr />
            <div class="comment-wrapper">
                <form method="post">
                    <img src="../assets/img/chatIcon.svg" alt="Comentario" class="chat">
                    <input type="text" placeholder="Escreva um comentário...">
                    <button type="submit" id="send">
                        <img src="../assets/img/planeIcon.svg" alt="Enviar" class="plane">
                    </button>
                </form>
            </div>
            <hr />
        </div>
    `
}

function closePost() {
    $postPopupBackground.style.display = 'none';
    $postPopup.style.display = 'none';
}

async function sendComment(comment) {
    //TODO: Implementar o envio do comentário

    if (!comment) {
        return 'Comentário não pode ser vazio.';
    }

    if (comment.length > 200) {
        return 'Comentário muito grande. Tente um comentário menor.';
    }

    if (comment.length < 2) {
        return 'Comentário muito pequeno. Tente um comentário maior que 2 caracteres.';
    }


    // return response.status;
}

renderImages();
