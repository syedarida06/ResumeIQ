function loginUser(event) {
    event.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;

    let storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser == null) {
        alert("No account found. Please create an account first.");
        return;
    }

    if (email === storedUser.email && password === storedUser.password) {

        alert("Login Successful!");

        window.location.href = "analyzer.html";

    }
    else {

        alert("Invalid Email or Password");

    }
}

function googleLogin() {

    alert("Logged in with Google successfully!");

    window.location.href = "analyzer.html";

}