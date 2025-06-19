// All News Category
// url: https://openapi.programming-hero.com/api/news/categories
 console.log('connected')
// Fetch all categories
const allCategories = async () => {
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
    
    <button class="text-gray-500 font-bold text-sm md:text-lg w-full">${category.category_name}</button>
    
    `
    categoriesContainer.appendChild(categories)
 });
}



// fetch all news card
const loadNews = async () => {
  const url = 'https://openapi.programming-hero.com/api/news/category/01'
  const res = await fetch(url)
  const data= await res.json()
  displayAllNews(data.data)
}

// display all news
const displayAllNews = (allNews) => {
  const newsContainer = document.getElementById('newsContainer')
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
    <p class="">${news.details}</p>
    
    <div class=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center md:gap-10 gap-5">

    <div class="flex gap-4 ">
    <img class="w-14 h-14 rounded-full" src = "${news.author.img}"/>
    <div class="">
    <h4 class="">${news.author.name}</h4>
    <p>${news.author.published_date}</p>
    </div>
    </div>
    
    <p class="text-lg font-bold">
      <i class="fa-solid fa-eye"></i>
      ${news.total_view}</p>

     <div class="rating">
     ${news.rating.number}
  <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" aria-label="1 star" />
  <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" aria-label="2 star" checked="checked" />
  <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" aria-label="3 star" />
  <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" aria-label="4 star" />
  <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" aria-label="5 star" />
</div>
      

 <i class="fa-solid fa-arrow-right text-primary font-bold text-lg w-full"></i>

    </div>
    
 
    </div>
  </div>

    `
    newsContainer.appendChild(newsCard)
  })
}
allCategories()
loadNews ()