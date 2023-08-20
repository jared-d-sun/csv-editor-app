import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";

export default function Home() {
  async function handleSubmit(data: FormData) {
    "use server";
    const csvFile = data.get("csvFile");

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

    redirect("/editor");
  }

  return (
    <Container>
      <div className="mt-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Upload CSV
        </h1>
      </div>
      <div className="mt-8">
        <form className="space-y-6" action={handleSubmit}>
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
      </div>
    </Container>
  );
}
