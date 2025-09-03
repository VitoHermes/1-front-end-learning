import axios from 'axios';

// get：使用 fetch 获取并解析为 JS 对象（res.json()）
async function getTodolist() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.log('fetch get 错误:', error);
    return null;
  }
}

// get：使用 axios，已自动将 JSON 响应解析为 JS 对象（data）
async function getTodolist2() {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
    return res.data;
  } catch (error) {
    console.log('axios get 错误:', error);
    return null;
  }
}

// post：使用 JSON.stringify 将对象转为 JSON 字符串，并设置 Content-Type
async function createTodo(payload) {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.log('fetch post 错误:', error);
    return null;
  }
}

// 演示：用 IIFE 正确 await 并打印结果（避免打印 Promise）
(async () => {
  const list1 = await getTodolist();
  console.log('fetch todos 长度:', Array.isArray(list1) ? list1.length : list1);

  const list2 = await getTodolist2();
  console.log('axios todos 长度:', Array.isArray(list2) ? list2.length : list2);

  const created = await createTodo({ title: 'foo', body: 'bar', userId: 1 });
  console.log('创建结果:', created);
})();
