import { expect, test } from "vitest";
import { readCsv } from "../src/lib/csv";

test("test", () => {
  expect(1 + 2).toBe(3);
});

test("Read CSV", async () => {
  const csv = await readCsv("__tests__/test.csv");
  expect(csv).toMatchFileSnapshot("test.csv");
});
