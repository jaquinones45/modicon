import { Application } from "express";
import { Server as ServerIO, Socket } from "socket.io";
import { ConnectionByViews } from "../interface/connection-by-views";
import SiroOcensaClient from "../clients/siro-ocensa.client";
import MigracionController from "../controllers/migrations.controller";
import { Equipos } from "../interface/equipos";
import { Bpc } from "../interface/bpc";
let connectionByViews: ConnectionByViews[] = [];
class socket_io {
  static connection(connection: any, app: Application) {
    const httpServer = require("http").createServer(app);
    const options = {
      cors: {
        origin: "*",
      },
    };
    const io = new ServerIO(httpServer, options);
    io.on("connection", async (socket: Socket) => {
      // console.log("alguien se ha conectado!");
      socket.on("oleoducto_connect", () => {        
        let interval = setInterval(() => {
          Promise.all([
            SiroOcensaClient.getEquipos<Equipos>(),
            MigracionController.getBpc<Bpc>(),
            MigracionController.getGenerador(),
            MigracionController.getDispo(),
            MigracionController.getAnalog(),
            MigracionController.getGeneral(),
          ])
            .then(
              ([
                equipos,
                bpc,
                generador,
                disponibilidad,
                master_analogdevice,
                ol_general,
              ]) => {
                io.to(socket.id).emit("disponibilidad", disponibilidad);
                io.to(socket.id).emit("equipos", equipos);
                io.to(socket.id).emit("bpc", bpc);
                io.to(socket.id).emit("generador", generador);
                io.to(socket.id).emit(
                  "master_analogdevice",
                  master_analogdevice
                );
                io.to(socket.id).emit("ol_general", ol_general);
              }
            )
            .catch(() => {
              
            });
        }, 4000);
        saveConnectionByView("oleoducto", socket.id, interval);
      });

      socket.on("oleoducto_disconnect", () => {
        dropConnectionByView("oleoducto", socket.id);
      });

      socket.on("disconnect", () => {
        dropConnection(socket.id);
        // console.log("alguien se ha desconectado!");
      });
    });

    httpServer.listen(connection);
  }
}

function saveConnectionByView(
  view: string,
  socket_id: string,
  soket_interval: any
) {
  dropConnectionByView(view, socket_id);
  connectionByViews.push({ socket_id, view, soket_interval });
}
function dropConnectionByView(view: string, socket_id: string) {
  let index = connectionByViews.findIndex(
    (c) => c.socket_id == socket_id && c.view == view
  );
  if (index != -1) {
    clearInterval(connectionByViews[index].soket_interval);
  }
}

function dropConnection(socket_id: string) {
  let index = connectionByViews.findIndex((c) => c.socket_id == socket_id);
  if (index != -1) {
    clearInterval(connectionByViews[index].soket_interval);
  }
}

export default socket_io;
