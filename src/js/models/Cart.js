class Cart {
    constructor() {
        this.productos = new Array();
    }

    addProduct(producto) {
        this.productos.push = producto;
    }

    removeProduct(producto) {
        this.productos.splice(this.productos.indexOf(producto), 1);
    }
}

export { Cart }