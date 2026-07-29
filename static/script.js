async function sendMessage() {

    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    const message = input.value.trim();

    if (message === "") return;

    chatBox.innerHTML += `
        <p><b>You:</b> ${message}</p>
    `;

    input.value = "";

    const response = await fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: message
        })
    });

    const data = await response.json();

    chatBox.innerHTML += `
        <p><b>ARISE:</b> ${data.reply}</p>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;
}

document.getElementById("user-input").addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        sendMessage();
    }

});