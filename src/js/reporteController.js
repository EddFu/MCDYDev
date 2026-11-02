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
                <td>${res.productor}</td> <!-- NUEVO DATO -->
                <td>${res.producto}</td>
                <td>${res.cantidad}</td>  <!-- NUEVO DATO -->
                <td>${formatoPeso(res.total_pagar)}</td>
            </tr>
        `;
        tabla.innerHTML += fila;
    });

    document.getElementById('kpiVentas').innerText = formatoPeso(totalVentas);
    document.getElementById('kpiReservas').innerText = db.reservas.length;
}


function descargarCSV() {
    const db = getDB();
    
    if (!db.reservas || db.reservas.length === 0) {
        alert("No hay datos para exportar.");
        return;
    }

    // Cabecera actualizada con Productor y Cantidad
    let csvContent = "Código,Fecha,Productor,Producto,Cantidad,Total Pagado\n";
    
    db.reservas.forEach(res => {
        let row = [
            res.codigo_entrega,
            new Date(res.fecha).toLocaleDateString(),
            `"${res.productor}"`, // NUEVO DATO (Con comillas por seguridad)
            `"${res.producto}"`,
            res.cantidad,         // NUEVO DATO
            res.total_pagar
        ];
        csvContent += row.join(",") + "\n";
    });

    const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "reporte_ventas_mercado.csv");
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}