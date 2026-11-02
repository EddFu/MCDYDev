
const datosIniciales = {
    productores: [
        { id: 1, nombre: "Don Carlos", vereda: "La Guafilla" },
        { id: 2, nombre: "Doña María", vereda: "Tacarimena" },
        { id: 3, nombre: "Don Eladio", vereda: "El Charte" }
    ],
    ofertas: [
        { id: 101, id_productor: 1, producto: "Plátano", cantidad_disponible: 20, unidad: "Racimo", precio_unitario: 15000 },
        { id: 102, id_productor: 2, producto: "Queso Llanero", cantidad_disponible: 10, unidad: "Libra", precio_unitario: 8000 }
    ],
    reservas: [
        {
            id_reserva: 1699620000000,
            codigo_entrega: "YOP-1234",
            producto: "Plátano",
            cantidad: 1,
            productor: "Don Carlos",
            total_pagar: 30000,
            fecha: new Date().toISOString()
        }
    ]
};

function initDB() {
    if (!localStorage.getItem('mercado_db')) {
        localStorage.setItem('mercado_db', JSON.stringify(datosIniciales));
    }
}

function getDB() {
    return JSON.parse(localStorage.getItem('mercado_db'));
}

function saveDB(db) {
    localStorage.setItem('mercado_db', JSON.stringify(db));
}

// Utilidades compartidas
function formatoPeso(valor) {
    return '$ ' + valor.toLocaleString('es-CO');
}
