const { instrument } = require("@socket.io/admin-ui");
module.exports = httpServer => {
    const { Server } = require("socket.io");
    const io = new Server(httpServer, {
        cors: {
          origin: ["https://admin.socket.io"],
          credentials: true
        }
      });
      instrument(io, {
        auth: false,
        mode: "development",
      });

      
    io.on("connection", socket => {

        const cookie = socket.handshake.headers.cookie;
        const user = cookie.split("=").pop();

        socket.on("message", message => {

            io.emit("message", {
                user, message
            });

        })
        
        socket.on("disconnect",() =>{
console.log("el soket "+socket.id+"se ha desconectado")

        })

       
    });
}



