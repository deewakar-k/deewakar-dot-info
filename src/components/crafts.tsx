import { Showcase } from "./showcase";

export default function Crafts() {
  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1 className="font-medium">Crafts</h1>
      </header>
      <Showcase />
    </div>
  );
}
