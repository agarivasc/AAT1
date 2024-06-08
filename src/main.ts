import { Productos } from "./products.js";
const productos = new Productos();
productos.guardarProducto({
  id: 1,
  name: "Producto 1",
  description: "Descripción del producto 1",
  price: 100,
  image: "https://via.placeholder.com/150",
});
productos.guardarProducto({
  id: 2,
  name: "Producto 2",
  description: "Descripción del producto 2",
  price: 200,
  image: "https://via.placeholder.com/150",
});
console.log(productos.obtenerProductos());
productos.eliminarProducto(1);
console.log(productos.obtenerProductos());
