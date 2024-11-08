const socket = io();
const tabla = document.getElementById('tabla');
const form = document.querySelector('form');
 
// Actualizar la tabla con datos de productos
socket.on('products', (data) => {
    renderProduct(data.docs)
})
    
const renderProduct = (products) =>{
    
    // Construir el HTML de la tabla
    const rows = products.map((e) => `
        <tr>
        <th scope="row">${e._id}</th>
        <td>${e.title}</td>
        <td>${e.description}</td>
        <td>$${e.price}</td>
        <td>${e.stock}</td>
        <td>
            <img style="height: 50px;" src="${e.thumbnail || './img/default.png'}" alt="${e.title}">
        </td>
        <td>
            <button type="button" class="btn btn-danger btn-sm btnDelete" data-id="${e._id}">Delete</button>
        </td>
        </tr>
    `).join('');
    
    tabla.innerHTML = rows;

    // Adjuntar eventos a los botones de eliminación
    document.querySelectorAll('.btnDelete').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            deleteProduct(id);
        });
    });
}

// Función para emitir la eliminación de productos
const deleteProduct = (id) => {
    socket.emit('deleteProduct', id);
};

// Manejo del formulario de productos
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const product = Object.fromEntries(formData);
    product.price = parseFloat(product.price);
    product.stock = parseInt(product.stock, 10);
    console.log('Form data:', product);
    addProduct(product);
    form.reset(); // Opcional: resetear el formulario después de enviar
});

// Función para emitir la adición de productos
const addProduct = async (product) =>{
    try {
        const response = await fetch('http://localhost:8080/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(product)
        });

        if (response.ok) {
            const data = await response.json()
            alert('product added successfully');
            socket.emit('addProduct', data);
        } else {
            alert('Error adding product');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}