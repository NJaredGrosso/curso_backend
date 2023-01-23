const socket = io();

let name = document.getElementById("name");
let submit = document.getElementById("submit");
let newMessage = document.getElementById("message");
let listOfMessages = document.getElementById("messages");

let user = null;

if (!user) {
	Swal.fire({
		title: "Identificate",
		input: "text",
		text: "Nombre de usuario",
		allowOutsideClick: false,
		imputValidator: (value) => {
			return !value && "Necesitas escribir un nombre de usuario";
		},
	}).then((newUser) => {
		user = newUser.value;
		name.innerText = user;
		socket.emit("newUser", user);
	});
}

socket.on("newUser", (nombre) => {
	Swal.fire({
		text: `Nuevo usuario conectado, diganle hola a ${nombre} `,
		toast: true,
		position: "top-right",
	});
});

socket.on("message", (messages) => {
	let newMessages = "";
	for (const message of messages) {
		newMessages += `${message.user}: ${message.message}\n`;
	}
	listOfMessages.innerText = newMessages;
});

submit.addEventListener("click", (e) => {
	e.preventDefault();
	const messageText = newMessage.value;
	newMessage.value = "";
	console.log("Cliente: ", user, messageText);
	socket.emit("message", { user, message: messageText });
});
