import * as fs from "node:fs/promises";

export const readCsv = async (fp: string) => {
  try {
    await fs.access(fp);
  } catch (e) {
    throw new Error("File not found");
  }

  const csv = await fs.readFile(fp, "utf-8");
  return csv;
};
