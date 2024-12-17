import { FastifyInstance } from "fastify";

export async function router(fastify: FastifyInstance) {
  fastify.get("/", async (request, reply) => {
    return { hello: "from router" };
  });

  fastify.get("/test", async (request, reply) => {
    return { test: "test page" };
  });

  fastify.get("/test/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    return { test: `test page, id: ${id}` };
  });
}
