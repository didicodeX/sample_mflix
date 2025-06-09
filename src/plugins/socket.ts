import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { Server as SocketIOServer } from "socket.io";

export default fp(async (fastify: FastifyInstance) => {
  // ✅ Attacher Socket.IO à l'instance Fastify (accès à fastify.server)
  const io = new SocketIOServer(fastify.server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  // ✅ Ajouter Socket.IO à fastify.io pour y accéder partout
  fastify.decorate("io", io);

  // ✅ Gérer les événements de connexion
  io.on("connection", (socket) => {
    fastify.log.info(`🟢 Client connecté : ${socket.id}`);

    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`👋 Socket ${socket.id} a rejoint la room ${roomId}`);
    });

    socket.on("leaveRoom", (roomId) => {
      socket.leave(roomId);
      console.log(`👋 Socket ${socket.id} a quitté la room ${roomId}`);
    });
    
    // Exemple pour les notifications
    // socket.on("notification:read", (data) => {
    //   fastify.log.info(`🔔 Notification lue : ${JSON.stringify(data)}`);
    // });

    socket.on("disconnect", () => {
      fastify.log.info(`🔴 Client déconnecté : ${socket.id}`);
    });
  });
});
