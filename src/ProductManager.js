import { promises, existsSync } from 'fs'

class ProductManager{
    constructor(path){
        this.path = path
    }

    async addProduct(product){
        try {
        const products = await this.getProducts()
        let id 
        if(!products.length){
            id = 1
        }else{
            id = products[products.length-1].id + 1
        }
        products.push({id,...product})
        await promises.writeFile(this.path, JSON.stringify(products))
        } catch (error) {
        return error
        }
    }

    async getProducts(){
        try{
            if(existsSync(this.path)){
                const productFile = await promises.readFile (this.path, 'utf-8')
                return JSON.parse(productFile)
            }else {
                return []
            }
        } catch(error){
            return error
        }
    }

    async getProductsByID(id){
        try {
            const products = await this.getProducts()
            const product = products.find(u=>u.id===id)
            if(!product){
                return 'No se encontró el producto'
            }else{
                return product
            }
        } catch (error) {
            return error
        }
    }

    async updateProduct(id, updatedProduct) {
        try {
            const products = await this.getProducts();
            const productIndex = products.findIndex(u => u.id === id);

            if (productIndex === -1) {
                return 'No se encontró el producto';
            }

            updatedProduct.id = id;
            products[productIndex] = updatedProduct;

            await promises.writeFile(this.path, JSON.stringify(products));
            return 'Producto actualizado correctamente';
        } catch (error) {
            return error;
        }
    }

    async deleteProduct(id){
        try {
            const products = await this.getProducts()
            const newArrayProducts = products.filter(u=>u.id!==id)
            await promises.writeFile(this.path, JSON.stringify(newArrayProducts))
        } catch (error) {
            return error
        }
    }

}

export default ProductManager;