"use client";
import { FormEvent, useState } from "react";
import CsvTable from "./CsvTable";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function CsvUploadForm() {
  const [csvData, setCsvData] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const csvFile = formData.get("csvFile");

    if (!(csvFile instanceof File)) {
      throw new Error("Expected uploaded csv to be a file");
    }
    if (csvFile.size === 0) {
      throw new Error("Expected uploaded file to not be empty");
    }
    if (csvFile.type !== "text/csv") {
      throw new Error("Expected uploaded file to be of type text/csv");
    }

    if (csvFile.size > 1024 * 1024 * 10) {
      throw new Error("Expected uploaded file to be smaller than 10MB");
    }

    setCsvData(await csvFile.text());
  };

  const parseCsv = (csvData: string | null) => {
    if (!csvData) {
      return { headers: null, data: null };
    }
    const lines = csvData.split("\n");
    const headers = lines[0].split(",");
    const data = lines.slice(1).map((line) => line.split(","));
    return { headers, data };
  };

  const { headers, data } = parseCsv(csvData);

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="csvFile">Upload CSV</Label>
          <Input
            id="csvFile"
            name="csvFile"
            type="file"
            accept=".csv"
            required={true}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>

      {headers && data && <CsvTable headers={headers} data={data} />}
    </>
  );
}
