import { FastifyInstance } from "fastify";
import {
  addFolder,
  getAllFolders,
  getFolderById,
  updateFolder,
  deleteFolder,
} from "../controllers/folder-controller";
import { authorize } from "../middlewares/authorization-middleware";
import { UserRole } from "../../domain/entities/enums/user-role";

export async function folderRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/folders",
    { preHandler: [authorize([UserRole.MANAGER])] },
    addFolder,
  );
  fastify.get(
    "/folders",
    { preHandler: [authorize([UserRole.MANAGER, UserRole.USER])] },
    getAllFolders,
  );
  fastify.get(
    "/folders/:folderId",
    { preHandler: [authorize([UserRole.MANAGER, UserRole.USER])] },
    getFolderById,
  );
  fastify.put(
    "/folders/:folderId",
    { preHandler: [authorize([UserRole.MANAGER])] },
    updateFolder,
  );
  fastify.delete(
    "/folders/:folderId",
    { preHandler: [authorize([UserRole.MANAGER])] },
    deleteFolder,
  );
}
