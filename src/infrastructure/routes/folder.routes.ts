import { FastifyInstance } from "fastify";
import {
  addFolder,
  getAllFolders,
  getFolderById,
  updateFolder,
  deleteFolder,
} from "../controllers/folder-controller";
import { authorize } from "../middlewares/authorization-middleware";
import { UserPermission } from "../../domain/entities/enums/user-permission";

export async function folderRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/folders",
    { preHandler: [authorize(null, [UserPermission.WRITE])] },
    addFolder,
  );
  fastify.get(
    "/folders",
    { preHandler: [authorize(null, [UserPermission.READ])] },
    getAllFolders,
  );
  fastify.get(
    "/folders/:folderId",
    { preHandler: [authorize(null, [UserPermission.READ])] },
    getFolderById,
  );
  fastify.put(
    "/folders/:folderId",
    { preHandler: [authorize(null, [UserPermission.WRITE])] },
    updateFolder,
  );
  fastify.delete(
    "/folders/:folderId",
    { preHandler: [authorize(null, [UserPermission.DELETE])] },
    deleteFolder,
  );
}
