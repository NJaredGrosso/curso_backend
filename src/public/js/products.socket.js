const socket = io();

const addButtons = document.querySelectorAll(".addToCart");

for (let addButton of addButtons) {
	addButton.addEventListener("click", (e) => {
		e.preventDefault();
		let pid = addButton.parentNode.id;
		socket.emit("addProduct", pid);
	});
}
