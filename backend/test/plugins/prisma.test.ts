import { test } from "node:test";
import * as assert from "node:assert";

import Fastify from "fastify";
import Prisma from "../../src/plugins/prisma";

test("prisma works standalone", async (t) => {
  const fastify = Fastify();
  void fastify.register(Prisma);
  await fastify.ready();

  assert.doesNotReject(fastify.prisma.invoice.findMany());
});
