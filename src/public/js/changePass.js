const socket = io();

const email = document.getElementById("email");
const mail = email.innerText;
const newPass = document.getElementById("newPass");
const newPass2 = document.getElementById("newPass2");
const changePass = document.getElementById("changePass");

let data = {};

changePass.addEventListener("click", (e) => {
	e.preventDefault();
	if (newPass.value === newPass2.value) {
		data = {
			email: mail,
			newPass: newPass.value,
		};
		console.log(mail);
		socket.emit("newPass", data);
		Swal.fire({
			title: "Listo",
			text: "Contraseña cambiada",
		});
	} else {
		Swal.fire({
			title: "Error",
			text: "Las contraseñas no coinciden",
		});
	}
});
