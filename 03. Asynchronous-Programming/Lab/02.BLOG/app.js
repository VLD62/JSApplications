function attachEvents() {
    const BASE_URL = `https://blog-apps-c12bf.firebaseio.com/`
    const elements = {
        btnLoadPosts() { return document.getElementById('btnLoadPosts') },
        btnViewPost() { return document.getElementById('btnViewPost') },
        posts() { return document.getElementById('posts') },
        postTitle() { return document.getElementById('post-title') },
        postBody() { return document.getElementById('post-body') },
        postComments() { return document.getElementById('post-comments') }
    }

    function ffetch(url, options) {
        options = options || {};
        return new Promise(function (resolve, reject) {
            const request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        resolve({
                            json: () => Promise.resolve(JSON.parse(request.responseText))
                        })
                        return;
                    }
                    reject(new Error(request.status));
                }

            }
            request.open(options.method || 'GET', url);
            request.send(options.body);
        });
    }
    function loadPosts() {
        elements.posts().innerHTML = '<option value="" disabled selected>Select post...</option>';
        ffetch(`${BASE_URL}/posts.json`).then(res => res.json())
            .then(posts => {
                Object.entries(posts).forEach(([key, value]) => {
                    const o = document.createElement('option');
                    o.value = key;
                    o.textContent = value.title;
                    elements.posts().appendChild(o);
                });
            });
    }

    function loadPostComments() {
        const postId = elements.posts().value;
        const commentsReq = ffetch(`${BASE_URL}/comments.json`).then(res => res.json());
        const postReq = ffetch(`${BASE_URL}/posts/${postId}.json`).then(res => res.json());
        Promise.all([commentsReq, postReq]).then(([comments, currentPost]) => {
            // const allPostComments = Object.entries(comments).reduce((acc, [key, value]) => {
            //     if (!Object.keys(currentPost.comments || {}).map(x => x.postId).includes(postId)) {return acc;}
            //     return acc.concat(value);
            // }, []);
            elements.postTitle().textContent = currentPost.title;
            elements.postBody().textContent = currentPost.body;
            elements.postComments().innerHTML = "";


            Object.entries(currentPost.comments || {}).forEach(([key, value]) => {
                const li = document.createElement('li');
                li.textContent = value.text;
                elements.postComments().appendChild(li);
            });
        });

    }
    elements.btnLoadPosts().addEventListener('click', loadPosts);
    elements.btnViewPost().addEventListener('click', loadPostComments);
}

attachEvents();