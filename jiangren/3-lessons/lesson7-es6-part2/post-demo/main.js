const postsUl = document.querySelector('#posts');
const countEl = document.querySelector('#count');
const statusEl = document.querySelector('#status');
const createStatusEl = document.querySelector('#create-status');
const btnLoad = document.querySelector('#btn-load');
const form = document.querySelector('#create-form');
const inputTitle = document.querySelector('#title');
const inputBody = document.querySelector('#body');
let postsState = [];
// render posts
function renderPosts(posts) {
    postsUl.innerHTML = posts
        .map(p => {
        var _a;
        return `
        <li>
            <b>${p.title}</b> (#${(_a = p.id) !== null && _a !== void 0 ? _a : 'new'})<br/>
            ${p.body}
        </li>
    `;
    })
        .join('');
    countEl.textContent = String(posts.length);
}
async function fetchData(url) {
    const res = await fetch(url);
    if (!res.ok)
        throw new Error(`HTTP ${res.status}`);
    return res.json();
}
btnLoad.addEventListener('click', async () => {
    statusEl.textContent = 'Loading...';
    statusEl.className = 'status';
    try {
        const all = await fetchData('https://jsonplaceholder.typicode.com/posts');
        postsState = all.slice(0, 5);
        renderPosts(postsState);
        statusEl.textContent = 'Load successfully';
        statusEl.className = 'status ok';
    }
    catch (e) {
        statusEl.textContent = 'error: ' + e.message;
        statusEl.className = 'status error';
    }
});
// create post
async function postData(url, data) {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok)
        throw new Error(`HTTP ${res.status}`);
    return res.json();
}
form === null || form === void 0 ? void 0 : form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = inputTitle === null || inputTitle === void 0 ? void 0 : inputTitle.value.trim();
    const body = inputBody === null || inputBody === void 0 ? void 0 : inputBody.value.trim();
    if (!title || !body)
        return;
    const optimistic = { title, body, userId: 1 };
    postsState = [optimistic, ...postsState];
    renderPosts(postsState);
    createStatusEl.textContent = 'Submitting...';
    try {
        const created = await postData('https://jsonplaceholder.typicode.com/posts', { title, body, userId: 1 });
        postsState = postsState.map(p => (p === optimistic ? created : p));
        renderPosts(postsState);
        createStatusEl.textContent = 'Submit successfully ✓';
        createStatusEl.className = 'status ok';
        form.reset();
    }
    catch (e) {
        postsState = postsState.filter(p => p !== optimistic);
        renderPosts(postsState);
        createStatusEl.textContent = 'Submit failed';
        createStatusEl.className = 'status error';
    }
});
