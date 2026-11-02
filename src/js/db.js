// Simulador de Base de Datos con LocalStorage
const datosIniciales = {
    productores: [
        { id: 1, nombre: "Don Carlos", vereda: "La Guafilla" },
        { id: 2, nombre: "Doña María", vereda: "Tacarimena" }
    ],
    ofertas: [
        { id: 101, id_productor: 1, producto: "Plátano", cantidad_disponible: 20, unidad: "Racimo", precio_unitario: 15000 },
        { id: 102, id_productor: 2, producto: "Queso Llanero", cantidad_disponible: 10, unidad: "Libra", precio_unitario: 8000 }
    ],
    reservas: []
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
