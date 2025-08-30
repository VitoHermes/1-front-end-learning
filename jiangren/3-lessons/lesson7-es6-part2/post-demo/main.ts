type Post = {
  id?: number;
  userId?: number;
  title: string;
  body: string;
};

const postsUl = document.querySelector('#posts') as HTMLUListElement;
const countEl = document.querySelector('#count') as HTMLElement;
const statusEl = document.querySelector('#status') as HTMLElement;
const createStatusEl = document.querySelector('#create-status') as HTMLElement;
const btnLoad = document.querySelector('#btn-load') as HTMLButtonElement;
const btnLoadMore = document.querySelector('#btn-load-more') as HTMLButtonElement;
const form = document.querySelector('#create-form') as HTMLFormElement;
const inputTitle = document.querySelector('#title') as HTMLInputElement;
const inputBody = document.querySelector('#body') as HTMLTextAreaElement;
const statusMoreEl = document.querySelector('#status-more') as HTMLElement;

let postsState: Post[] = [];
let allPosts: Post[] = []; // 存储所有获取的帖子
let currentIndex = 0; // 当前加载到的索引
const postsPerPage = 5; // 每次加载的数量

// render posts
function renderPosts(posts: Post[]) {
  postsUl.innerHTML = posts
    .map(
      p => `
        <li>
            <b>${p.title}</b> (#${p.id ?? 'new'})<br/>
            ${p.body}
        </li>
    `
    )
    .join('');
  countEl.textContent = String(posts.length);
}

async function fetchData<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

btnLoad.addEventListener('click', async () => {
  statusEl.textContent = 'Loading...';
  statusEl.className = 'status';

  try {
    allPosts = await fetchData<Post[]>(
      'https://jsonplaceholder.typicode.com/posts'
    );
    postsState = allPosts.slice(0, postsPerPage);
    currentIndex = postsPerPage;
    renderPosts(postsState);

    statusEl.textContent = 'Load successfully';
    statusEl.className = 'status ok';
    setTimeout(() => {
      statusEl.textContent = '';
      statusEl.className = '';
    }, 3000);
  } catch (e: any) {
    statusEl.textContent = 'error: ' + e.message;
    statusEl.className = 'status error';
  }
});

btnLoadMore.addEventListener('click', async () => {
  if (allPosts.length === 0) {
    statusMoreEl.textContent = 'Please load posts first';
    statusMoreEl.className = 'status error';
    return;
  }

  statusMoreEl.textContent = 'Loading...';
  statusMoreEl.className = 'status';

  try {
    // 计算下一批要加载的帖子
    const nextBatch = allPosts.slice(currentIndex, currentIndex + postsPerPage);
    
    if (nextBatch.length > 0) {
      postsState = [...postsState, ...nextBatch];
      currentIndex += postsPerPage;
      renderPosts(postsState);
      
      statusMoreEl.textContent = `Loaded ${nextBatch.length} more posts`;
      statusMoreEl.className = 'status ok';
    } else {
      statusMoreEl.textContent = 'No more posts to load';
      statusMoreEl.className = 'status';
    }
    
    setTimeout(() => {
      statusMoreEl.textContent = '';
      statusMoreEl.className = '';
    }, 3000);
  } catch (e: any) {
    statusMoreEl.textContent = 'error: ' + e.message;
    statusMoreEl.className = 'status error';
  }
});

// create post

async function postData<T>(url: string, data: Post): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

form?.addEventListener('submit', async e => {
  e.preventDefault();
  const title = inputTitle?.value.trim();
  const body = inputBody?.value.trim();
  if (!title || !body) return;

  const optimistic: Post = { title, body };
  postsState = [optimistic, ...postsState];
  renderPosts(postsState);
  createStatusEl.textContent = 'Submitting...';

  try {
    const created = await postData<Post>(
      'https://jsonplaceholder.typicode.com/posts',
      { title, body, userId: 1 }
    );
    postsState = postsState.map(p => (p === optimistic ? created : p));
    renderPosts(postsState);
    createStatusEl.textContent = 'Submit successfully ✓';
    createStatusEl.className = 'status ok';
    setTimeout(() => {
      createStatusEl.textContent = '';
      createStatusEl.className = '';
    }, 3000);
    form.reset();
  } catch (e: any) {
    postsState = postsState.filter(p => p !== optimistic);
    renderPosts(postsState);
    createStatusEl.textContent = 'Submit failed';
    createStatusEl.className = 'status error';
  }
});
