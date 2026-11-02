
let carrito = null; 

document.addEventListener('DOMContentLoaded', () => {
    cargarCatalogo();
});

function cargarCatalogo() {
    const db = getDB();
    const contenedor = document.getElementById('catalogo');
    contenedor.innerHTML = '';

    db.ofertas.forEach(oferta => {
        if(oferta.cantidad_disponible > 0) {
            const productor = db.productores.find(p => p.id === oferta.id_productor);
            contenedor.innerHTML += `
                <div class="card">
                    <h3>${oferta.producto}</h3>
                    <p>Vendedor: ${productor.nombre} (${productor.vereda})</p>
                    <p>Stock: ${oferta.cantidad_disponible} | Precio: ${formatoPeso(oferta.precio_unitario)}</p>
                    <button class="btn btn-primary btn-small" onclick="seleccionarProducto(${oferta.id})">Seleccionar (1)</button>
                </div>
            `;
        }
    });
}

function seleccionarProducto(id_oferta) {
    const db = getDB();
    const oferta = db.ofertas.find(o => o.id === id_oferta);
    
    carrito = {
        id_oferta: oferta.id,
        producto: oferta.producto,
        cantidad: 1,
        total: oferta.precio_unitario
    };

    document.getElementById('totalReserva').innerText = formatoPeso(carrito.total);
    alert(`Agregaste 1 ${oferta.producto} a tu reserva.`);
}

function validarHorario() {
    const ahora = new Date();
    if (ahora.getDay() === 5 && ahora.getHours() >= 18) {
        alert("Las reservas están cerradas. Cierre: Viernes a las 6:00 pm.");
        return false;
    }
    return true;
}

function confirmarReserva() {
    if (!carrito) {
        alert("Primero selecciona un producto.");
        return;
    }

    if (!document.getElementById('ley1581').checked) {
        alert("Debes aceptar la Ley 1581 de protección de datos.");
        return;
    }

    if (!validarHorario()) return;

    let db = getDB();
    let ofertaEnDB = db.ofertas.find(o => o.id === carrito.id_oferta);

    let productorEnDB = db.productores.find(p => p.id === ofertaEnDB.id_productor);

    if (ofertaEnDB.cantidad_disponible >= carrito.cantidad) {

        ofertaEnDB.cantidad_disponible -= carrito.cantidad;
        
        const codigo = 'YOP-' + Math.floor(Math.random() * 10000);
        db.reservas.push({
            id_reserva: Date.now(),
            codigo_entrega: codigo,
            producto: carrito.producto,
            cantidad: carrito.cantidad,
            productor: productorEnDB.nombre,
            total_pagar: carrito.total,
            fecha: new Date().toISOString()
        });

        saveDB(db);
        alert(`¡Reserva confirmada!\n\nCódigo de entrega: ${codigo}\nTotal a pagar (efectivo): ${formatoPeso(carrito.total)}\n\nReclama el sábado en el puesto de ${productorEnDB.nombre}.`);
        
        carrito = null;
        document.getElementById('totalReserva').innerText = '$ 0';
        document.getElementById('ley1581').checked = false;
        cargarCatalogo();
    } else {
        alert("Lo sentimos, el producto acaba de agotarse.");
        cargarCatalogo();
    }
}
