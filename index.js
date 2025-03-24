document.addEventListener("DOMContentLoaded", () => {
    const contenedorCards = document.getElementById("contenedor-cards");
    const formulario = document.getElementById("Formulario");
    const nombreInput = document.getElementById("NombreProducto");
    const precioInput = document.getElementById("precioProducto");
    const imagenInput = document.getElementById("imagenProducto");
    const btnLimpiar = document.getElementById("btn-limpiar");

    let isUpdate = false;
    let idProductoEditar = null;

    const obtenerProductosApi = async () => {
        try {
            console.log("Intentando obtener productos...");
            const response = await fetch("http://localhost:3001/productos");
            console.log("Respuesta del servidor:", response);
    
            if (!response.ok) throw new Error("Error al obtener productos");
    
            const productos = await response.json();
            console.log("Productos obtenidos:", productos);
    
            contenedorCards.innerHTML = "";
            productos.forEach((producto) => {
                contenedorCards.innerHTML += `
                <li class="shadow-lg border border-purple-200 rounded p-4">
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="w-full h-32 object-cover rounded">
                    <h3 class="text-lg font-bold text-purple-800 mt-2">${producto.nombre}</h3>
                    <p class="text-md font-medium text-purple-500 my-1.5">$${producto.precio.toFixed(2)}</p>
                    <div class="flex gap-3 mt-4">
                        <button onclick="editarProducto(${producto.id}, '${producto.nombre}', ${producto.precio}, '${producto.imagen}')"
                        class="flex-1 px-3 py-2.5 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 flex items-center justify-center gap-2 transition-colors duration-200">
                            <i class="bi bi-pencil-square"></i> Editar
                        </button>
                        <button onclick="eliminarProducto(${producto.id})"
                        class="flex-1 px-3 py-2.5 bg-red-100 text-red-700 rounded-md hover:bg-red-200 flex items-center justify-center gap-2 transition-colors duration-200">
                            <i class="bi bi-trash3"></i> Eliminar
                        </button>
                    </div>
                </li>`;
            });
        } catch (error) {
            console.error("Error en obtenerProductosApi:", error.message);
        }
    };
    

    window.editarProducto = (id, nombre, precio, imagen) => {
        isUpdate = true;
        idProductoEditar = id;
        nombreInput.value = nombre;
        precioInput.value = precio;
        imagenInput.value = imagen;
    };

    formulario.addEventListener("submit", async (evt) => {
        evt.preventDefault();
        const nombre = nombreInput.value;
        const precio = parseFloat(precioInput.value);
        const imagen = imagenInput.value;

        if (!nombre || isNaN(precio) || !imagen) {
            alert("Todos los campos son obligatorios");
            return;
        }

        const producto = { nombre, precio, imagen };
        let url = "http://localhost:3001/productos";
        let metodo = "POST";

        if (isUpdate) {
            url = `http://localhost:3001/productos/${idProductoEditar}`;
            metodo = "PUT"; // Cambiado de PATCH a PUT
        }

        try {
            const response = await fetch(url, {
                method: metodo,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(producto),
            });

            if (!response.ok) throw new Error("Error al guardar producto");

            alert(isUpdate ? "Producto actualizado" : "Producto agregado");
            formulario.reset();
            isUpdate = false;
            idProductoEditar = null;
            obtenerProductosApi();
        } catch (error) {
            console.error("Error:", error.message);
        }
    });

    btnLimpiar.addEventListener("click", () => {
        formulario.reset();
        isUpdate = false;
        idProductoEditar = null;
    });

    obtenerProductosApi();
});
