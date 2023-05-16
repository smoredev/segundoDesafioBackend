// import fs from 'fs'

class ProductManager {
    #products
    #error
    constructor() {
        this.filename = './products.json'
        this.format = 'utf-8'
        this.#products = []
        this.#error = undefined
    }

    getProducts = () => this.#products

    getProductsById = (id) => {
        const prod = this.#products.find(item => item.id === id)
        if (!prod) return 'Not Found'
        return prod
    }

    #generateId = () => (this.#products.length === 0) ? 1 : this.#products[this.#products.length-1].id + 1

    #validateProduct = (title, description, code, price, stock, thumbnail) => {
        if (!title || !description || !code || !price || !stock || !thumbnail) {
            this.#error = `[${title}]: campos incompletos`
        } else {
            const found = this.#products.find(item => item.code === code)
            if (found) this.#error = `[${title}]: el code ya existe`
            else this.#error = undefined
        }
    }

    addProduct = (title, description, code, price, stock, thumbnail) => {
        this.#validateProduct(title, description, code, price, stock, thumbnail)
        if (this.#error === undefined) 
            this.#products.push({id: this.#generateId(), title: title, description: description, code, price, stock: stock, thumbnail})
        else 
            console.log(this.#error)
    }

    updateProduct = (id, campo, update) => {
        const prod = this.getProductsById(id)
        if (prod === undefined) {
            console.log("No se encontro el id")
        }
        else {
            prod[campo] = update
        }
    }

    deleteProduct = (id) => {
        let index = this.#products.findIndex((prod) => {
            return prod.id === id
        })
        if (index !== -1){
            this.#products.splice(index, 1)
            console.log(`se elimino producto con id ${id}`)
        }
        else {
            console.log("no se encontro el id del producto")
        }
    }

}

const productManager = new ProductManager()
// productManager.addProduct('10001', 80000)  //error!! Faltan  datos
// productManager.addProduct('Microprocesador', 'Intel 12va gen', '10002', '$200', 80000, 'https://www.venex.com.ar/products_images/1609357869_bx80701101005.jpg')
// productManager.addProduct('Mouse', 'Genius', '10001', '$200', 80000)  //error!! Codigo repetido
console.log(productManager.getProducts())
productManager.addProduct('Teclado', 'Gamer mecanico', '10001', '$500', 5000, 'https://www.integradosargentinos.com/teclado-gamer-inalambrico-redragon-deimos-k599-krs-qwerty-outemu-red-lineal-ingles-uk-color-negro-con-luz-rgb/p/MLA19150796')
console.log(productManager.getProducts())
productManager.addProduct('Mouse', 'Gamer mecanico', '10005', '$500', 5000, 'https://www.integradosargentinos.com/teclado-gamer-inalambrico-redragon-deimos-k599-krs-qwerty-outemu-red-lineal-ingles-uk-color-negro-con-luz-rgb/p/MLA19150796')
console.log(productManager.getProducts())
console.log(productManager.getProductsById(2))
// console.log(productManager.getProductsById(1))
// console.log(productManager.getProductsById(9))
console.log(productManager.updateProduct(2, 'price', '700'))
console.log(productManager.getProducts())
console.log(productManager.deleteProduct(1))
console.log(productManager.getProducts())