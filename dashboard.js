const cl = console.log;

const logoutBtn = document.getElementById("logoutBtn");
const token = localStorage.getItem("token");
const userRole = localStorage.getItem("userRole");

    if ( !token || !userRole) {
        window.location.href = "index.html";   
    
    }
 
    function onLogout(){
     localStorage.removeItem("token");
    localStorage.removeItem("userRole");

     window.location.href = "index.html"; 
    }

    logoutBtn.addEventListener("click", onLogout);



