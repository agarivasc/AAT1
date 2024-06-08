import { Productos } from "./products.js";
declare var bootstrap: any;
const product: Productos = new Productos();
const username = localStorage.getItem("username");
let a = document.getElementById("ingresar") as HTMLAnchorElement;
if (username) {
  a.textContent = "Cerrar sesión";
  a.href = "../productos.html";
}
a.addEventListener("click", () => {
  if (username) {
    localStorage.removeItem("username");
  }
});
/*
productos.guardarProducto({
  id: 1,
  name: "Producto 1",
  description: "Descripción del producto 1",
  price: 100,
  image: "https://via.placeholder.com/150",
});*/
/////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  if (!username) {
    let button = document.getElementById(
      "addProductButton"
    ) as HTMLButtonElement;
    button.hidden = true;
    const btnEliminar = document.getElementsByClassName(
      "btn-danger"
    ) as HTMLCollectionOf<HTMLButtonElement>;

    for (let i = 0; i < btnEliminar.length; i++) {
      btnEliminar[i].hidden = true;
    }
  }

  //eliminar producto
  const buttons = document.querySelectorAll(
    ".dynamic-btn"
  ) as NodeListOf<HTMLButtonElement>;

  buttons.forEach((button) => {
    button.addEventListener("click", (event: Event) => {
      const target = event.target as HTMLButtonElement;
      const buttonId = target.getAttribute("data-id");
      console.log(`Button clicked: ${buttonId}`);
      handleButtonClick(buttonId);
    });
  });
});
/////////////////////////////////////////////////////
function handleButtonClick(id: string | null) {
  // Lógica para manejar el clic del botón basado en el ID
  if (id) {
    console.log(`Button with ID ${id} was clicked.`);
    product.eliminarProducto(parseInt(id));

    // Implementa la lógica que necesitas aquí
  }
}

document
  .getElementById("productForm")!
  .addEventListener("submit", function (event) {
    event.preventDefault();

    product.guardarProducto({
      id: product.numeroProductos(),
      name: (document.getElementById("productName") as HTMLInputElement).value,
      description: (
        document.getElementById("productDescription") as HTMLTextAreaElement
      ).value,
      price: parseFloat(
        (document.getElementById("productPrice") as HTMLInputElement).value
      ),
      image: (document.getElementById("productImage") as HTMLInputElement)
        .value,
    });

    // Aquí puedes enviar el objeto 'product' a otro archivo o servidor
    console.log("Producto agregado:", product);

    // Opcional: Limpiar el formulario y cerrar el modal
    (this as HTMLFormElement).reset();
    const modalElement = document.querySelector(
      "#addProductModal"
    ) as HTMLElement;
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) modal.hide();
  });
