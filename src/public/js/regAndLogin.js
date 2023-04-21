const socket = io();

//Register
const regFirstName = document.getElementById("regFirstName");
const regLastName = document.getElementById("regLastName");
const regEmail = document.getElementById("regEmail");
const regEdad = document.getElementById("regEdad");
const regPassword = document.getElementById("regPassword");
const registrar = document.getElementById("registrar");
const recMail = document.getElementById("recMail");
const fPass = document.getElementById("fPass");

registrar.addEventListener("click", (e) => {
	e.preventDefault();
	const regFirstNameV = regFirstName.value;
	const regLastNameV = regLastName.value;
	const regEmailV = regEmail.value;
	const regEdadV = regEdad.value;
	const regPasswordV = regPassword.value;
	socket.emit("register", {
		first_name: regFirstNameV,
		last_name: regLastNameV,
		email: regEmailV,
		age: regEdadV,
		password: regPasswordV,
	});
});

socket.on("ErrorDeRegistro", () => {
	Swal.fire({
		title: "Error de registro",
		text: "Usuario ya existente",
	});
});

socket.on("RegCorrecto", () => {
	Swal.fire({
		title: "Registrado correctamente",
		text: "Inicie sesion para continuar",
	});
});

//Login
const logEmail = document.getElementById("logEmail");
const logPassword = document.getElementById("logPassword");
const login = document.getElementById("login");

login.addEventListener("click", (e) => {
	e.preventDefault();
	const logEmailIn = logEmail.value;
	const logPasswordIn = logPassword.value;
	socket.emit("login", { email: logEmailIn, password: logPasswordIn });
});

socket.on("datosIncorrectos", () => {
	Swal.fire({
		title: "¡¡Datos erroneos!!",
		text: "Mail o contraseña incorrectos",
	});
});

socket.on("redirect", () => {
	req.session.logged = true;
	window.location.assign("/products");
});

//Recuperar Contraseña

fPass.addEventListener("click", (e) => {
	e.preventDefault();
	const mail = recMail.value;
	socket.emit("recPass", mail);
	Swal.fire({
		title: "Listo!",
		text: "Mail enviado, revisa tu casilla de correos",
	});
});
