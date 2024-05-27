import { test } from "node:test";
import * as assert from "node:assert";
import { build } from "../helper";

test("GET invoices is loaded", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: "/invoice",
    method: "GET",
  });

  assert.equal(res.statusCode, 200);
});
