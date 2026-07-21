import { SodaInfiniteCanvas } from "@/components/SodaInfiniteCanvas";
import { sodas } from "@/data/sodas";

export default function Home() {
  return <SodaInfiniteCanvas sodas={sodas} />;
}
