type Post = { id?: number; userId?: number; title: string; body: string };

const postsUl = document.querySelector('#posts') as HTMLUListElement;
const countEl = document.querySelector('#count') as HTMLElement;
const statusEl = document.querySelector('#status') as HTMLElement;
const createStatusEl = document.querySelector('#create-status') as HTMLElement;
const btnLoad = document.querySelector('#btn-load') as HTMLButtonElement;
const form = document.querySelector('#create-form') as HTMLFormElement;
const inputTitle = document.querySelector('#title') as HTMLInputElement;
const inputBody = document.querySelector('#body') as HTMLTextAreaElement;

async function fetchData<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function postData<T>(url: string, data: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function renderPosts(posts: Post[]) {
  postsUl.innerHTML = posts.map(p => `
    <li>
      <b>${p.title}</b> (#${p.id ?? 'new'})<br/>
      ${p.body}
    </li>
  `).join('');
  countEl.textContent = String(posts.length);
}

let postsState: Post[] = [];

btnLoad.addEventListener('click', async () => {
  console.log('btnLoad');
  statusEl.textContent = '加载中...'; 
  statusEl.className = 'status';
  try {
    const all = await fetchData<Post[]>('https://jsonplaceholder.typicode.com/posts');
    postsState = all.slice(0, 10); // 前 10 条
    renderPosts(postsState);
    statusEl.textContent = '加载成功 ✓'; statusEl.className = 'status ok';
  } catch (e: any) {
    statusEl.textContent = '出错: ' + e.message; statusEl.className = 'status error';
  }
});

form.addEventListener('submit', async e => {
  e.preventDefault();
  const title = inputTitle.value.trim();
  const body = inputBody.value.trim();
  if (!title || !body) return;

  const optimistic: Post = { title, body, userId: 1 };
  postsState = [optimistic, ...postsState];
  renderPosts(postsState);
  createStatusEl.textContent = '提交中...';

  try {
    const created = await postData<Post>('https://jsonplaceholder.typicode.com/posts', { title, body, userId: 1 });
    postsState = postsState.map(p => p === optimistic ? created : p);
    renderPosts(postsState);
    createStatusEl.textContent = '提交成功 ✓'; createStatusEl.className = 'status ok';
    form.reset();
  } catch (e: any) {
    postsState = postsState.filter(p => p !== optimistic);
    renderPosts(postsState);
    createStatusEl.textContent = '提交失败'; createStatusEl.className = 'status error';
  }
});
