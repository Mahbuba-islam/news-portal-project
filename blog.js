// const newsId = document.getElementById('news-tab')

// newsId.addEventListener('click', ()=> {
//   newsId.classList.add('bg-blue-500', 'text-white', 'px-4', 'py-1', 'rounded-lg')
//   setTimeout(()=> {
//      window.location.href = './index.html'
//   }, 1000)
  
// })

document.addEventListener('DOMContentLoaded', () => {
  const isBlogPage = window.location.pathname.includes('blog.html');
  const isNewsPage = window.location.pathname.includes('index.html');

  if (isBlogPage) {
    document.getElementById('blog-tab')?.classList.add('bg-blue-500', 'text-white');
  } else if (isNewsPage) {
    document.getElementById('news-tab')?.classList.add('bg-blue-500', 'text-white');
  }
});
