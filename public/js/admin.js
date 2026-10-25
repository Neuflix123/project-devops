const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const payload = JSON.parse(atob(token.split(".")[1]));

if (payload.role !== "admin") {
    alert("Akses ditolak!");
    window.location.href = "dashboard.html";
}

async function loadReport() {

    try {

        const response = await fetch("/api/reports", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const reports = await response.json();

        const table = document.getElementById("tableAdmin");

        table.innerHTML = "";

        if (!Array.isArray(reports) || reports.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center">
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
                    <td>${report.location}</td>
                    <td>${report.status}</td>
                    <td>
                        <select class="form-select" onchange="updateStatus(${report.id}, this.value)">
                            <option value="pending" ${report.status === "pending" ? "selected" : ""}>Pending</option>
                            <option value="proses" ${report.status === "proses" ? "selected" : ""}>Proses</option>
                            <option value="selesai" ${report.status === "selesai" ? "selected" : ""}>Selesai</option>
                        </select>
                    </td>
                </tr>
            `;
        });

    } catch (err) {
        alert("Gagal mengambil data laporan.");
        console.error(err);
    }
}

async function updateStatus(id, status) {

    const response = await fetch(`/api/reports/${id}/status`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ status })
    });

    const data = await response.json();

    alert(data.message);

    loadReport();
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

loadReport();