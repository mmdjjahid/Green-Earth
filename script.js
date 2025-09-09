const getAllCategories = () => {
    categoriesLoadingAPI(true)
    fetch('https://openapi.programming-hero.com/api/categories')
    .then(res => res.json()).then(allCategories => displayCategories(allCategories.categories))
}
const displayCategories = (categoriesData) => {
    const categories_Container = document.getElementById('categories_Container')
    categories_Container.innerHTML = ''
    categoriesData.forEach(data => {
        const newLi = document.createElement('li')
        newLi.classList.add('categoriesBtn', 'btn', 'border-none', 'bg-transparent', 'block', 'text-left', 'py-2', 'pl-3', 'hover:bg-[#104d26]', 'hover:text-white', 'mt-2', 'text-[#1F2937]', 'text-base', 'font-normal', 'rounded')
        newLi.innerText = data.category_name
        newLi.setAttribute('onclick', `getSingleCategories(${data.id})`)
        newLi.id = `categories_${data.id}`
        
        categories_Container.appendChild(newLi)
    });
    categoriesLoadingAPI(false)
}


const getAllPlants = () => {
    PlantsLoadingAPI(true)
    fetch('https://openapi.programming-hero.com/api/plants')
    .then(res => res.json()).then(allPlants => displayPlants(allPlants.plants))
}

const displayPlants = (allPlants) => {
    
    // console.log(allPlants)
    const Plants_Container = document.getElementById('Plants_Container')
    Plants_Container.innerHTML= ""
    allPlants.forEach(plantsData => {
        const newPlants = document.createElement('div')
        newPlants.innerHTML = `
        <div class="card bg-base-100 h-full shadow-sm">
            <figure class="px-3 pt-3">
                <img
                src="${plantsData.image}"
                alt="Shoes"
                class="rounded-xl w-full h-32 object-cover" />
            </figure>
            <div class="card-body">
                <h2 id='plantsModels_Container' onclick='getSinglePlants(${plantsData.id})' class="card-title text-sm">${plantsData.name}</h2>
                <p class="text-[#1F293780] text-xs">${plantsData.description.substring(0, 98)}...</p>
                
                <div class=" flex justify-between items-center ">
                    <div>
                        <p class="text-[#15803D] bg-[#DCFCE7] px-3 py-1 rounded-full text-sm">${plantsData.category}</p>
                    </div>
                    
                    <div>
                        <p class="text-sm font-semibold">৳<span>${plantsData.price}</span></p>
                    </div>
                </div>

                <div class="card-actions">
                    
                    <button onclick='cart("${plantsData.name}",${plantsData.price})' class="btn text-white bg-[#15803D] hover:bg-[#105529] w-full rounded-full">Add to Cart</button>
                </div>
            </div>
        </div>
        `
        Plants_Container.appendChild(newPlants)
    })
    PlantsLoadingAPI(false)

}

const getSingleCategories = (categoriesId)=>{
    PlantsLoadingAPI(true)
    fetch(`https://openapi.programming-hero.com/api/category/${categoriesId}`)
    .then(res => res.json()).then(SingleCategories => {
        displayPlants(SingleCategories.plants)


        const activeCategories =  document.getElementById(`categories_${categoriesId}`)
        const disableCategories = document.getElementsByClassName('categoriesBtn')

        for (const disableCategory of disableCategories){
            disableCategory.classList.remove('bg-[#15803D]', 'text-white')
            disableCategory.classList.add('bg-transparent', 'text-[#1F2937]')
        }

        activeCategories.classList.remove('bg-transparent', 'text-[#1F2937]')
        activeCategories.classList.add('bg-[#15803D]', 'text-white')
        
    })
}


const getSinglePlants = (plantsId)=>{
    // PlantsLoadingAPI(true)
    fetch(`https://openapi.programming-hero.com/api/plant/${plantsId}`)
    .then(res => res.json()).then(SinglePlants => plantsModels(SinglePlants.plants))
}

const plantsModels = (plantsId)=>{

    document.getElementById('plantsModels_Container').showModal()

    
    const model_Container = document.getElementById('model_Container')
    model_Container.innerHTML = `
    
    <h2 class="card-title text-2xl">${plantsId.name}</h2>
    <figure class=" pt-2 ">
        <img
        src="${plantsId.image}"
        alt="Shoes"
        class="rounded-xl w-full h-80 object-cover" />
    </figure>
    <div class="card-body ">
        
        <p><span class="text-base font-bold">Categories:</span>${plantsId.category}</p>
        <p><span class="text-base font-bold">Price:</span>৳${plantsId.price}</p>
        <p><span class="text-base font-bold">Description:</span>${plantsId.description}</p>
    </div>

    `
    // PlantsLoadingAPI(false)
}

let count = 1
const cart = (name, price)=>{


    const cart_info = document.getElementById('cart_info')

    const newCart = document.createElement('div')
    
    newCart.innerHTML = `
                    <div class="flex justify-between items-center bg-[#F0FDF4] rounded-2xl p-3">
                        <div>
                            <p class="font-semibold text-sm text-[#1F2937]">${name}</p>
                            <p class="font-semibold text-base text-[#1F293750]">৳<span class="carPrice">${price}</span> x 1</p>
                        </div>
                        <button id='cart_${count}' onclick="plantRemove('cart_${count}')" class="btn btn-sm btn-circle btn-ghost ">✕</button>
                    </div>
    `
    count = count+1
    cart_info.appendChild(newCart)
    let plantPrice = document.getElementById('plantPrice')
    plantPrice.innerText = parseInt(plantPrice.innerText) + parseInt(price)

}

const plantRemove = (plantRemoveId)=>{
    const getCart = document.getElementById(plantRemoveId).parentElement
    const getCartParent = document.getElementById(plantRemoveId).parentElement.parentElement


    const getCarPrice = getCartParent.querySelector('.carPrice')
    const totalCarPrice = document.getElementById('plantPrice')
    getCartParent.removeChild(getCart)
    totalCarPrice.innerText = parseInt(totalCarPrice.innerText) - parseInt(getCarPrice.innerText)
}


const categoriesLoadingAPI = (apiStatus)=>{

    const loading = document.getElementById('categories_loading_Now')
    const apiContent = document.getElementById('categories_Container')
    if(apiStatus == true){
        apiContent.classList.add('hidden')
        loading.classList.remove('hidden')

    } else {
        apiContent.classList.remove('hidden')
        loading.classList.add('hidden')
    }
}

const PlantsLoadingAPI = (apiStatus)=>{

    const loading = document.getElementById('Plants_loading_Now')
    const apiContent = document.getElementById('Plants_Container')
    if(apiStatus == true){
        apiContent.classList.add('hidden')
        loading.classList.remove('hidden')

    } else {
        apiContent.classList.remove('hidden')
        loading.classList.add('hidden')
    }
}

getAllPlants()
getAllCategories()
