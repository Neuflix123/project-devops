const token = localStorage.getItem("token");

if (!token) {
    alert("Silakan login terlebih dahulu!");
    window.location.href = "login.html";
}

const payload = JSON.parse(atob(token.split(".")[1]));

if (payload.role !== "user") {
    window.location.href = "admin.html";
}

async function loadReports() {

    try {

        const response = await fetch("/api/reports", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const reports = await response.json();

        const table = document.getElementById("reportTable");

        table.innerHTML = "";

        if (!Array.isArray(reports) || reports.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center">
                        Belum ada laporan.
                    </td>
                </tr>
            `;

            return;
        }

        reports.forEach((report, index) => {

            table.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${report.title}</td>
                    <td>${report.description}</td>
                    <td>${report.location}</td>
                    <td>${report.status}</td>
                    <td>${new Date(report.created_at).toLocaleString()}</td>
                </tr>
            `;

        });

    } catch (error) {

        console.log(error);

        alert("Gagal mengambil data laporan!");

    }

}

function logout() {

    localStorage.removeItem("token");

    window.location.href = "login.html";

}

loadReports();