const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBody = document.getElementById("chat-body");
 
sendBtn.addEventListener("click", () => {
  const msg = userInput.value.trim();
  if (msg) {
    appendMessage("user", msg);
    userInput.value = "";
 
    setTimeout(() => {
      let reply;
      switch (msg.toLowerCase()) {
        case "hi":
        case "hello":
          reply = "Hello there! How can I assist you today?";
          break;
        case "how are you":
          reply = "I'm doing great! How about you?";
          break;
        case "bye":
          reply = "Goodbye! Have a nice day!";
          break;
        default:
          reply = "I'm just a static bot for now, but I’ll improve soon! 😉";
      }
 
      appendMessage("bot", reply);
    }, 600);
  }
});
 
function appendMessage(sender, text) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender);
 
  const avatar = document.createElement("div");
  avatar.classList.add("avatar");
  avatar.textContent = sender === "bot" ? "🤖" : "👤";
 
  const textDiv = document.createElement("div");
  textDiv.classList.add("text");
  textDiv.textContent = text;
 
  if (sender === "bot") {
    msgDiv.appendChild(avatar);
    msgDiv.appendChild(textDiv);
  } else {
    msgDiv.appendChild(textDiv);
    msgDiv.appendChild(avatar);
  }
 
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}