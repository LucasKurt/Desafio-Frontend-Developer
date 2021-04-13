let url = 'https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1'
let dataOfProducts = [] 

const product = ({ id, name, image, oldPrice, price, description, installments }) => {
    return `
        <article id="${id}">
            <figure>
                <img id="image" src="http:${image}" alt="${name}">
            </figure>
            <div class="product-container">
                <p class="name">${name}</p>
                <p class="description">${description}</p>
                <p class="oldPrice">De: R$${oldPrice.toFixed(2).replace('.',',')}</p>
                <p class="price">Por: R$${price.toFixed(2).replace('.',',')}</p>
                <p class="installments">ou ${installments.count}x de R$${installments.value.toFixed(2).replace('.',',')}</p>
                <button>Comprar</button>
            </div>
        </article>      
    `
}

const populateProducts = () => {
    let products = document.getElementById("products")
    const listOfProducts = []
    
    for (let i = 0; i < dataOfProducts.length; i++) {
        listOfProducts[i] = product(dataOfProducts[i])      
    }
    
    products.innerHTML = listOfProducts.join("")
}

async function data() {
    const response = await fetch(url)
    const data = await response.json()
    
    url = `https://${data.nextPage}`
    
    dataOfProducts = [...dataOfProducts,...data.products]
    
    console.log(dataOfProducts[0]);
    populateProducts(dataOfProducts)
}

const showMoreProducts = () => {
    data()
}

data()