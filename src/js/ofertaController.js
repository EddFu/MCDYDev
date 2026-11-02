// Controlador para la vista del Productor
document.addEventListener('DOMContentLoaded', () => {
    cargarOfertas();

    document.getElementById('formOferta').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulación: Siempre seremos "Don Carlos" (id: 1) para el prototipo
        const id_productor = 1;
        const producto = document.getElementById('producto').value;
        const cantidad = parseInt(document.getElementById('cantidad').value);
        const precio = parseInt(document.getElementById('precio').value);

        let db = getDB();
        
        // Implementación de RF-01: Publicar oferta
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

function cargarOfertas() {
    const db = getDB();
    const contenedor = document.getElementById('listaOfertas');
    contenedor.innerHTML = '';

    // Filtrar solo las ofertas de Don Carlos (id: 1)
    const misOfertas = db.ofertas.filter(o => o.id_productor === 1);

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
