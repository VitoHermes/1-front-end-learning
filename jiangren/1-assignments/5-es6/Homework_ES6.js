// callbacks
function fetchData(url, callback) {
  console.log('Fetching data from ' + url + '...');
  setTimeout(() => {
    callback('Data from ' + url);
  }, 2000);
}

fetchData('https://jsonplaceholder.typicode.com/posts', data => {
  if (data) {
    console.log(data);
  } else {
    console.log('Error');
  }
});

// promises
function fetchDataPromise(url) {
  return new Promise((resolve, reject) => {
    if (!url) {
      reject('Invalid URL');
    }
    setTimeout(() => {
      resolve('Data from ' + url);
    }, 2000);
  });
}

// async/await
async function loadData(url) {
  try {
    const data = await fetchDataPromise(url);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

loadData('https://jsonplaceholder.typicode.com/posts');

// get data from api
async function getPosts() {
  try {
    const posts = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!posts.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data = await posts.json();
    console.log(data);
    return data.slice(0, 5);
  } catch (error) {
    console.log(error);
  }
}

const posts = getPosts();
console.log(posts);
