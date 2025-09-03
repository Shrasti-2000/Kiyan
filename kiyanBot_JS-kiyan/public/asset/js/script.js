// // Redirect if not logged in
// if (!localStorage.getItem("isLoggedIn")) {
//   window.location.href = "pages/login.html";
// }

// const sendBtn = document.getElementById("send-btn");
// const userInput = document.getElementById("user-input");
// const chatBody = document.getElementById("chat-body");

// let isSpeaking = false;
// let currentUtterance = null;

// // Send message
// sendBtn.addEventListener("click", async () => {
//   const msg = userInput.value.trim();
//   if (msg) {
//     appendMessage("user", msg);
//     userInput.value = "";

//     appendMessage("bot", "Typing...");

//     try {
//       const response = await fetch("/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: msg }),
//       });

//       const data = await response.json();
//       removeLastBotTyping();
//       appendMessage("bot", data.reply);
//     } catch (err) {
//       removeLastBotTyping();
//       appendMessage("bot", "Error connecting to server.");
//     }
//   }
// });

// // Append message
// function appendMessage(sender, text) {
//   const msgDiv = document.createElement("div");
//   msgDiv.classList.add("message", sender);

//   const avatar = document.createElement("div");
//   avatar.classList.add("avatar");
//   avatar.textContent = sender === "bot" ? "🤖" : "👤";

//   const textDiv = document.createElement("div");
//   textDiv.classList.add("text");
//   textDiv.innerHTML = marked.parse(text);

//   msgDiv.appendChild(avatar);
//   msgDiv.appendChild(textDiv);

//   // Bot action buttons
//   if (sender === "bot") {
//     const actionsDiv = document.createElement("div");
//     actionsDiv.classList.add("actions");

//     const copyBtn = document.createElement("button");
//     copyBtn.textContent = "📋";
//     copyBtn.title = "Copy";
//     copyBtn.onclick = () => navigator.clipboard.writeText(text).then(() => alert("Copied!"));

//     const speakBtn = document.createElement("button");
//     speakBtn.textContent = "🔊";
//     speakBtn.title = "Speak";
//     speakBtn.onclick = () => {
//       if (isSpeaking) {
//         speechSynthesis.cancel();
//         isSpeaking = false;
//         return;
//       }

//       currentUtterance = new SpeechSynthesisUtterance(text);
//       isSpeaking = true;

//       currentUtterance.onend = () => { isSpeaking = false; };
//       currentUtterance.onerror = () => { isSpeaking = false; };

//       speechSynthesis.speak(currentUtterance);
//     };

//     const pdfBtn = document.createElement("button");
//     pdfBtn.textContent = "📄";
//     pdfBtn.title = "Export to PDF";
//     pdfBtn.onclick = () => exportSingleMessageToPDF(text);

//     actionsDiv.appendChild(copyBtn);
//     actionsDiv.appendChild(speakBtn);
//     actionsDiv.appendChild(pdfBtn);
//     msgDiv.appendChild(actionsDiv);
//   }

//   chatBody.appendChild(msgDiv);
//   chatBody.scrollTop = chatBody.scrollHeight;
// }

// // Remove "Typing..."
// function removeLastBotTyping() {
//   const messages = document.querySelectorAll(".message.bot");
//   if (messages.length > 0) {
//     const last = messages[messages.length - 1];
//     if (last.querySelector(".text").textContent === "Typing...") {
//       last.remove();
//     }
//   }
// }

// // Export one message to PDF
// function exportSingleMessageToPDF(text) {
//   const blob = new Blob([text], { type: "application/pdf" });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = "message.pdf";
//   a.click();
//   URL.revokeObjectURL(url);
// }

// // Logout
// function logout() {
//   localStorage.removeItem("isLoggedIn");
//   localStorage.removeItem("currentUser");
//   window.location.href = "pages/login.html";
// }

// // Copy all chat
// document.getElementById("copy-btn").addEventListener("click", () => {
//   const messages = document.querySelectorAll(".message .text");
//   const textContent = Array.from(messages).map(m => m.textContent).join("\n");
//   navigator.clipboard.writeText(textContent)
//     .then(() => alert("Chat copied to clipboard!"))
//     .catch(() => alert("Copy failed!"));
// });

// // Speak last bot message
// document.getElementById("speak-btn").addEventListener("click", () => {
//   const botMessages = document.querySelectorAll(".message.bot .text");
//   if (botMessages.length > 0) {
//     const lastMessage = botMessages[botMessages.length - 1].textContent;

//     if (speechSynthesis.speaking) {
//       speechSynthesis.cancel();
//       return;
//     }

//     const utterance = new SpeechSynthesisUtterance(lastMessage);
//     speechSynthesis.speak(utterance);
//   }
// });

// // Export entire chat to PDF
// document.getElementById("pdf-btn").addEventListener("click", () => {
//   const messages = Array.from(document.querySelectorAll(".message"))
//     .map(div => {
//       const role = div.classList.contains("bot") ? "Bot" : "User";
//       const text = div.querySelector(".text").textContent;
//       return `${role}: ${text}`;
//     }).join("\n");

//   const blob = new Blob([messages], { type: "application/pdf" });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = "chat_history.pdf";
//   a.click();
//   URL.revokeObjectURL(url);
// });






// Redirect to login page if not logged in
if (!localStorage.getItem("isLoggedIn")) {
  window.location.href = "pages/login.html";
}

const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBody = document.getElementById("chat-body");

let isSpeaking = false;
let currentUtterance = null;

// Send message
sendBtn.addEventListener("click", async () => {
  const msg = userInput.value.trim();
  if (msg) {
    appendMessage("user", msg);
    userInput.value = "";

    appendMessage("bot", "Typing...");

    try {
      const response = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });

      const data = await response.json();
      removeLastBotTyping();
      appendMessage("bot", data.reply);
    } catch (err) {
      removeLastBotTyping();
      appendMessage("bot", "❌ Error connecting to server.");
    }
  }
});

// Append message
function appendMessage(sender, text) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender);

  const avatar = document.createElement("div");
  avatar.classList.add("avatar");
  avatar.textContent = sender === "bot" ? "🤖" : "👤";

  const textDiv = document.createElement("div");
  textDiv.classList.add("text");
  textDiv.innerHTML = marked.parse(text);

  msgDiv.appendChild(avatar);
  msgDiv.appendChild(textDiv);

  // Bot action buttons
  if (sender === "bot" && text !== "Typing...") {
    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("actions");

    const copyBtn = document.createElement("button");
    copyBtn.textContent = "📋";
    copyBtn.title = "Copy";
    copyBtn.onclick = () =>
      navigator.clipboard.writeText(text).then(() => alert("Copied!"));

    const speakBtn = document.createElement("button");
    speakBtn.textContent = "🔊";
    speakBtn.title = "Speak";
    speakBtn.onclick = () => {
      if (isSpeaking) {
        speechSynthesis.cancel();
        isSpeaking = false;
        return;
      }
      currentUtterance = new SpeechSynthesisUtterance(text);
      isSpeaking = true;
      currentUtterance.onend = () => (isSpeaking = false);
      currentUtterance.onerror = () => (isSpeaking = false);
      speechSynthesis.speak(currentUtterance);
    };

    const pdfBtn = document.createElement("button");
    pdfBtn.textContent = "📄";
    pdfBtn.title = "Export to PDF";
    pdfBtn.onclick = () => exportSingleMessageToPDF(text);

    actionsDiv.appendChild(copyBtn);
    actionsDiv.appendChild(speakBtn);
    actionsDiv.appendChild(pdfBtn);
    msgDiv.appendChild(actionsDiv);
  }

  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Remove last "Typing..." message
function removeLastBotTyping() {
  const messages = document.querySelectorAll(".message.bot");
  if (messages.length > 0) {
    const last = messages[messages.length - 1];
    const lastText = last.querySelector(".text").textContent.trim().toLowerCase();
    if (lastText === "typing...") {
      last.remove();
    }
  }
}

// Export one bot message to PDF
function exportSingleMessageToPDF(text) {
  const blob = new Blob([text], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "message.pdf";
  a.click();
  URL.revokeObjectURL(url);
}

// Logout logic
function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
  window.location.href = "pages/login.html";
}

// Copy entire chat
const copyBtn = document.getElementById("copy-btn");
if (copyBtn) {
  copyBtn.addEventListener("click", () => {
    const messages = document.querySelectorAll(".message .text");
    const textContent = Array.from(messages).map((m) => m.textContent).join("\n");
    navigator.clipboard.writeText(textContent)
      .then(() => alert("Chat copied to clipboard!"))
      .catch(() => alert("Copy failed!"));
  });
}

// Speak last bot message
const speakBtn = document.getElementById("speak-btn");
if (speakBtn) {
  speakBtn.addEventListener("click", () => {
    const botMessages = document.querySelectorAll(".message.bot .text");
    if (botMessages.length > 0) {
      const lastMessage = botMessages[botMessages.length - 1].textContent;
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        return;
      }
      const utterance = new SpeechSynthesisUtterance(lastMessage);
      speechSynthesis.speak(utterance);
    }
  });
}

// Export all messages to PDF
const pdfBtn = document.getElementById("pdf-btn");
if (pdfBtn) {
  pdfBtn.addEventListener("click", () => {
    const messages = Array.from(document.querySelectorAll(".message")).map((div) => {
      const role = div.classList.contains("bot") ? "Bot" : "User";
      const text = div.querySelector(".text").textContent;
      return `${role}: ${text}`;
    }).join("\n");

    const blob = new Blob([messages], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "chat_history.pdf";
    a.click();
    URL.revokeObjectURL(url);
  });
}


const micBtn = document.getElementById("send-btn-microphone");
let recognition;
let isListening = false;

// Check browser support
if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.continuous = false;

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    userInput.value = transcript; // Put recognized speech into input box
  };

  recognition.onerror = function (event) {
    console.error("Speech recognition error:", event.error);
    isListening = false;
  };

  recognition.onend = function () {
    isListening = false;
  };

  micBtn.addEventListener("click", () => {
    if (!isListening) {
      recognition.start();
      isListening = true;
    } else {
      recognition.stop();
    }
  });

} else {
  micBtn.disabled = true;
  alert("Speech Recognition not supported in this browser.");
}

