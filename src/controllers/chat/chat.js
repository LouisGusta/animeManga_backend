const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, 'public'));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use("/", (req, res) => {
    app.render("index.html");
});

let messagesChat = [];

try {
    server.listen(8000, () => {
        console.log("Running http://localhost:8000");
        // Espera novas conexões.
        io.on("connection", (socket) => {
            //Envia notificação de nova conexão.
            socket.broadcast.emit("welcome", socket.id);

            // Envia mensagens anteriores para o chat.
            socket.emit("chatHistory", messagesChat);

            // Envia novas mensagens para o chat.
            socket.on("sendMessage", (data) => {
                messagesChat.push(data);
                socket.broadcast.emit("recvMessage", data);
            });

            socket.on("disconnect", () => {
                socket.broadcast.emit("sayGoodBye");
            });
        });
    });
} catch (errorInRunning) {
    console.log(
        `Error trying to start the server.\nMore Info: ${errorInRunning}`
    );
}
