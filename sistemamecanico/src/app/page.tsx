import { CarCrud } from "./components/templates/CarCrud";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <CarCrud />
      </div>
    </main>
  );
}
