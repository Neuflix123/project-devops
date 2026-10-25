const token = localStorage.getItem("token");

if (!token) {
    window.location = "login.html";
}

async function saveReport() {

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const location = document.getElementById("location").value;

    if (!title || !description || !location) {

        alert("Semua data harus diisi.");

        return;
    }

    const response = await fetch("/api/reports", {

        method: "POST",

        headers: {

            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`

        },

        body: JSON.stringify({

            title,

            description,

            location

        })

    });

    const data = await response.json();

    if (response.ok) {

        alert(data.message);

        window.location = "dashboard.html";

    } else {

        alert(data.message || data.error);

    }

}