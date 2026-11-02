// Controlador para la vista del Productor
document.addEventListener('DOMContentLoaded', () => {
    cargarOfertas();

    document.getElementById('formOferta').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const id_productor = 3;
        const producto = document.getElementById('producto').value;
        const cantidad = parseInt(document.getElementById('cantidad').value);
        const precio = parseInt(document.getElementById('precio').value);

        let db = getDB();
        
        const nuevaOferta = {
            id: Date.now(), // ID único simple
            id_productor: id_productor,
            producto: producto,
            cantidad_disponible: cantidad,
            unidad: "Unidad/Libra", 
            precio_unitario: precio
        };

        db.ofertas.push(nuevaOferta);
        saveDB(db);

        alert("¡Oferta publicada exitosamente!");
        this.reset();
        cargarOfertas();
    });
});

// load offers
function cargarOfertas() {
    const db = getDB();
    const contenedor = document.getElementById('listaOfertas');
    contenedor.innerHTML = '';

    const misOfertas = db.ofertas.filter(o => o.id_productor === 3);

    misOfertas.forEach(oferta => {
        contenedor.innerHTML += `
            <div class="card">
                <strong>${oferta.producto}</strong><br>
                Cantidad: ${oferta.cantidad_disponible}<br>
                Precio: ${formatoPeso(oferta.precio_unitario)}
            </div>
        `;
    });
}
