async function registerUser() {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    if (!name || !email || !password) {
        alert("Semua data harus diisi!");
        return;
    }

    try {

        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password,
                role
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Registrasi berhasil!");
            window.location.href = "login.html";
        } else {
            alert(data.message || data.error);
        }

    } catch (err) {
        console.error(err);
        alert("Gagal terhubung ke server.");
    }
}