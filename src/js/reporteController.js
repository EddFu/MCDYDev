// Controlador para la vista de Secretaría
document.addEventListener('DOMContentLoaded', () => {
    generarReporte();
});

function generarReporte() {
    const db = getDB();
    const tabla = document.getElementById('tablaReporte');
    let totalVentas = 0;
    
    tabla.innerHTML = '';

    db.reservas.forEach(res => {
        totalVentas += res.total_pagar;
        const fila = `
            <tr>
                <td>${res.codigo_entrega}</td>
                <td>${new Date(res.fecha).toLocaleDateString()}</td>
                <td>${res.producto}</td>
                <td>${formatoPeso(res.total_pagar)}</td>
            </tr>
        `;
        tabla.innerHTML += fila;
    });

    document.getElementById('kpiVentas').innerText = formatoPeso(totalVentas);
    document.getElementById('kpiReservas').innerText = db.reservas.length;
}
