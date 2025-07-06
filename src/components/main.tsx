import { ThemeToggle } from "./theme-toggle";

export const Main = () => {
  return (
    <section className="flex-grow">
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <h1 className="font-ppModwest text-2xl">dwkr</h1>
          <h2 className="text-secondary-foreground mb-12 font-medium">
            design engineer
          </h2>
        </div>
        <ThemeToggle />
      </div>
      <p className="mb-4">{`greetings and salutations im deewakar, a design engineer centers on the artful fusion of design and technology.`}</p>
      <p>{` i love crafting thoughtful, beautiful yet functional and satisfying products.`}</p>
    </section>
  );
};
