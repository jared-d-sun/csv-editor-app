import CsvUploadForm from "@/components/CsvUploadForm";
import { Container } from "@/components/ui/Container";

export default function Home() {
  return (
    <Container>
      <div className="mt-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Upload CSV
        </h1>
      </div>
      <div className="mt-8">
        <CsvUploadForm />
      </div>
    </Container>
  );
}
