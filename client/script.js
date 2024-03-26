window.addEventListener('DOMContentLoaded', fetchData);

// afisarea colectiei in tabel
async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/api/cars');
        const data = await response.json();

        const tableBody = document.querySelector('#data-table tbody');
        tableBody.innerHTML = '';

        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item._id}</td>
                <td>${item.brand}</td>
                <td>${item.model}</td>
                <td>${item.year && item.year > 0 ? item.year : '-'}</td>
                <td>${item.services && item.services.length > 0 ? item.services[0].date.substring(0, 10) : '-'}</td>
                <td>${item.services && item.services.length > 0 ? item.services[0].description : '-'}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Eroare la obținerea datelor:', error);
    }
}

// adaugarea documentului cu datele introduse in formular
const form = document.getElementById('data-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const formDataObject = {};

    // Convertim FormData într-un obiect JSON
    formData.forEach((value, key) => {
        formDataObject[key] = value;
    });

    try {
        const response = await fetch('http://localhost:3000/api/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObject)
        });

        if (response.ok) {
            //alert('Car successfully added!');
            // Reîmprospătăm lista de mașini după adăugarea cu succes
            fetchData();
        } else {
            console.error('Error adding car:', response.statusText);
        }
    } catch (error) {
        console.error('Error adding car:', error);
    }
});

// actualizarea unui document cu datele introduse in formular
document.getElementById('edit-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObject = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('http://localhost:3000/api/cars/' + formDataObject.id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObject)
        });

        if (response.ok) {
            // reafisarea documentelor din colectie dupa ce au fost actualizare
            fetchData();
        } else {
            console.error('Eroare la actualizarea datelor:', response.statusText);
        }
    } catch (error) {
        console.error('Eroare la actualizarea datelor:', error);
    }
});

document.getElementById('delete-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObject = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('http://localhost:3000/api/cars/' + formDataObject.id, {
            method: 'DELETE'
        });

        if (response.ok) {
            //alert('Mașina a fost ștearsă cu succes!');
            // Reîmprospătăm lista de mașini după ștergerea cu succes
            fetchData();
        } else {
            console.error('Eroare la ștergerea mașinii:', response.statusText);
        }
    } catch (error) {
        console.error('Eroare la ștergerea mașinii:', error);
    }
});
