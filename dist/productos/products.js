export class Productos {
    constructor() {
        this.productos = [];
        const productos = localStorage.getItem("productos");
        if (productos) {
            this.productos = JSON.parse(productos);
        }
    }
    guardarProducto(producto) {
        this.productos.push(producto);
        localStorage.setItem("productos", JSON.stringify(this.productos));
        this.agregarProductoAlDOM(producto);
    }
    obtenerProductos() {
        return this.productos;
    }
    obtenerProducto(id) {
        const producto = this.productos.find((producto) => producto.id === id);
        return producto || null;
    }
    eliminarProducto(id) {
        this.productos = this.productos.filter((producto) => producto.id !== id);
        localStorage.setItem("productos", JSON.stringify(this.productos));
        this.eliminarProductoDelDOM(id);
    }
    actualizarProducto(id, updatedProduct) {
        const index = this.productos.findIndex((producto) => producto.id === id);
        if (index !== -1) {
            const producto = this.productos[index];
            this.productos[index] = Object.assign(Object.assign({}, producto), updatedProduct);
            localStorage.setItem("productos", JSON.stringify(this.productos));
            this.actualizarProductoEnDOM(this.productos[index]);
        }
    }
    numeroProductos() {
        return this.productos.length + 1;
    }
    agregarProductoAlDOM(producto) {
        const container = document.getElementById("productos-container");
        if (container) {
            const card = document.createElement("div");
            card.className = "card";
            card.style.width = "18rem";
            card.id = `producto-${producto.id}`;
            card.innerHTML = `
        <img src="${producto.image}" class="card-img-top" alt="${producto.name}">
        <div class="card-body">
          <h5 class="card-title">${producto.name}</h5>
          <p class="card-text">${producto.description}</p>
          <p class="card-text">$${producto.price.toFixed(2)}</p>
          <a href="#" class="btn btn-primary">Comprar</a>
          <button data-id="${producto.id}" id="producto${producto.id}" type="button" class="btn btn-danger dynamic-btn">Eliminar</button>
        </div>
      `;
            container.appendChild(card);
        }
    }
    actualizarProductoEnDOM(producto) {
        const card = document.getElementById(`producto-${producto.id}`);
        if (card) {
            const img = card.querySelector(".card-img-top");
            const title = card.querySelector(".card-title");
            const description = card.querySelector(".card-text");
            const priceElements = card.querySelectorAll(".card-text");
            if (img) {
                img.setAttribute("src", producto.image);
                img.setAttribute("alt", producto.name);
            }
            if (title) {
                title.textContent = producto.name;
            }
            if (description) {
                description.textContent = producto.description;
            }
            if (priceElements.length > 1) {
                priceElements[priceElements.length - 1].textContent = `$${producto.price.toFixed(2)}`;
            }
        }
    }
    eliminarProductoDelDOM(id) {
        const card = document.getElementById(`producto-${id}`);
        if (card) {
            card.remove();
        }
    }
    renderProductos() {
        this.productos.forEach((producto) => this.agregarProductoAlDOM(producto));
    }
}
