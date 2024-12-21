import { FastifyInstance } from "fastify";
import {
  addFolder,
  getAllFolders,
  getFolderById,
  updateFolder,
  deleteFolder,
} from "../controllers/folder-controller";

export async function folderRoutes(fastify: FastifyInstance) {
  fastify.post("/folders", addFolder);
  fastify.get("/folders", getAllFolders);
  fastify.get("/folders/:folderId", getFolderById);
  fastify.put("/folders/:folderId", updateFolder);
  fastify.delete("/folders/:folderId", deleteFolder);
}
