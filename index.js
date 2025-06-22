// All News Category
// url: https://openapi.programming-hero.com/api/news/categories
 console.log('connected')
 let allNews = []
// Fetch all categories
const loadCategories = async () => {
  const url = 'https://openapi.programming-hero.com/api/news/categories';
  const res = await fetch(url); // use fetch, not res.json(url)
  const data = await res.json(); // parse the response
  displayCategories(data.data.news_category); // log the data
};

// display categories
const displayCategories = (categories) => {
  // console.log(categories)
  const categoriesContainer = document.getElementById('categories')
 categories.forEach(category => {
    // console.log(category)
    // category_name
    const categories = document.createElement('div')
    categories.innerHTML = 
    `
    <button onClick="handleCategory(this,'${category.category_id}')" class="text-gray-500 category-btn font-bold text-sm md:text-lg w-full">
    ${category.category_name}</button>
    
    `
   
    categoriesContainer.appendChild(categories)

    

    
    
 });
}


// change color when click
const handleCategory = (button, categoryId) => {
   document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('bg-blue-500','text-white'))
   button.classList.add('bg-blue-500','text-white', 'rounded-lg','px-4','py-1')
   loadNews(categoryId)
}

// fetch all news card
const loadNews = async (categoryId) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
  const res = await fetch(url)
  const data= await res.json()
  allNews = data.data
  displayAllNews(allNews)
}

// display all news
const displayAllNews = (allNews) => {
  const newsContainer = document.getElementById('newsContainer')
  newsContainer.innerHTML = ''
 if(allNews.length === 0){
  newsContainer.innerHTML = ` <h2 class="font-bold text-xl text-center">Oops!! Sorry, There is no content here</h2>`
 }
 allNews.forEach(news  => {
     const newsCard = document.createElement('div')
    newsCard.innerHTML = 
    ` <div class="card lg:card-side bg-base-100 shadow-sm p-4">
  <figure class="">
    <img class=""
      src= ${news.thumbnail_url}
      alt="Album" />
  </figure>
  <div class="card-body lg:w-1/8 p-8 w-full space-y-2">
    <h2 class="card-title">${news.title}</h2>
    <p class="">${news.details.slice(0,400)}</p>
    
    <div class=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center md:gap-10 gap-5">

    <div class="flex gap-4 ">
    <img class="w-14 h-14 rounded-full" src = "${news.author.img}"/>
    <div class="">
    <h4 class="">${news.author.name}</h4>
    <p>${news.author.published_date}</p>
    </div>
    </div>
    
    ${news.total_view ? 
  `<p class="text-lg font-bold">
    <i class="fa-solid fa-eye"></i>
   ${news.total_view}
  </p>`
 : ""}
 
 <div class="dynamic-star-rating"></div>
 <div class="dynamic-badge"></div>

  </div>
      <button 
      class="btn details-btn btn-primary w-1/4 mt-6 mx-auto">Details</button>
 
    </div>
    
  </div>
         
     `
   
  
    newsContainer.appendChild(newsCard)
 

    
    // star
    const starContainer = newsCard.querySelector('.dynamic-star-rating')
    const badgeContainer = newsCard.querySelector('.dynamic-badge')
        // generate and append stars
     const stars = createStarRating(news.rating.number)
     starContainer.appendChild(stars)
    
    //  generate and append badge
    const badge = document.createElement('div')
    badge.textContent = news.rating.badge
    badge.className = "text-sm text-gray-600";
    badgeContainer.appendChild(badge);
   

// Set event listener for the button
newsCard.querySelector('.details-btn').addEventListener('click', () => showModal(news));

  })
   
}


// function for generate star
function createStarRating(ratingNumber){
  const starsContainer = document.createElement('div')
  starsContainer.className = "flex items-center space-x-1 mt-2"
  for(let i = 1; i<=5; i++){
    const star = document.createElement('span')
    star.innerHTML = "*";
    star.className = 'text-xl font-bold'
    
    if(i<=Math.floor(ratingNumber)){
      star.classList.add("text-yellow-400", "text-lg")

    }
    else if(i-ratingNumber<=0.5){
      star.classList.add("text-yellow-200", "text-lg")
    }
    else{
       star.classList.add("text-gray-300", "text-lg");
    }
    starsContainer.appendChild(star)
  }
  return starsContainer
}

// rating data 
// function createStarRating1(ratingNumber) {
//  console.log(ratingNumber)
//   const starsContainer = document.createElement("div");
//   starsContainer.className = "flex items-center space-x-1 mt-2";

//   for (let i = 1; i <= 5; i++) {
//     const star = document.createElement("span");
//     star.innerHTML = "★";
//     star.className = "text-xl";
    
//     if (i <= Math.floor(ratingNumber)) {
//       star.classList.add("text-yellow-400");
//     } else if (i - ratingNumber <= 0.5) {
//       star.classList.add("text-yellow-300");
//     } else {
//       star.classList.add("text-gray-300");
//     }

//     starsContainer.appendChild(star);
//   }

//   return starsContainer;
// }



// search 
document.getElementById('searchId').addEventListener('keyup', (e) => {
  loadNews(e.target.value)
})

// get trending and todays pick btn
const trendingBtn = document.getElementById('trending')
const todaysPickBtn = document.getElementById('todaysPick')
 
//  clear active color
const clearActiveColor = () => {
  trendingBtn.classList.remove('bg-blue-500','text-white')
  todaysPickBtn.classList.remove('bg-blue-500', 'text-white')
}
    // filter news in todays pick
  todaysPickBtn.addEventListener('click', () => {
    clearActiveColor()
    todaysPickBtn.classList.add('bg-blue-500', 'text-white')
    const todaysPick = allNews.filter(news => 
    news.others_info.is_todays_pick
  )
 displayAllNews(todaysPick)
})


    // filter news in trending 

trendingBtn.addEventListener('click', ()=> {
  clearActiveColor()
  trendingBtn.classList.add('bg-blue-500', 'text-white')
// trendingBtn.classList.remove('bg-blue-500')
  const trending = allNews.filter(news => news.others_info.is_trending)
  displayAllNews(trending)
})

document.getElementById('sortSelected').addEventListener('change', (e) => {
  console.log('click');
  if(e.target.value === 'view'){
   const sortNews = [...allNews].sort((a, b) => b.total_view - a.total_view);
   displayAllNews(sortNews);}
  
  else if(e.target.value === 'rating'){
    const sortRating = [...allNews].sort((a,b)=> b.rating.number-a.rating.number)
    displayAllNews(sortRating)
  }
});


// one way to go to redirect page
// go to blog page
// const blogId = document.getElementById('blog-tab')
// blogId.addEventListener('click', ()=> {
//   blogId.classList.add('bg-blue-500', 'text-white', 'px-4', 'py-1', 'rounded-lg')
//   setTimeout(()=> {
//    window.location.href = './blog.html'
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


const showModal = (news) => {
  console.log(news)
  const modal = document.getElementById('my_modal_1')
  modal.innerHTML = 
  `
   <div class="modal-box">
    <h3 class="text-lg font-bold">${news.title}</h3>
    <p class="py-4">${news.details}</p>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
  `
  modal.showModal()
}

// add spiner
window.addEventListener('DOMContentLoaded', ()=> {
  const spinerContainer = document.getElementById('spiner-container')
  spinerContainer.innerHTML = `
    <span class="loading loading-spinner text-secondary loading-xl ">Loading....</span>
  `
//  spiner remove
 setTimeout(()=> {
  spinerContainer.remove()
 },4000)
})


loadCategories ()
loadNews ('01')
