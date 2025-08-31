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
      </div>
      <p className="mb-4">{`greetings and salutations im deewakar, a design engineer centers on the artful fusion of design and technology.`}</p>
      <p className="mb-4">{` i love crafting thoughtful, beautiful yet functional and satisfying products.`}</p>
      <p>
        You can reach out to me on{" "}
        <span className="text-secondary-foreground hover:text-foreground hover:decoration-foreground underline decoration-neutral-600 decoration-dashed underline-offset-2">
          <a href="https://twitter.com/deewakar01" target="_blank">
            twitter
          </a>
        </span>{" "}
        or see more work on{" "}
        <span className="text-secondary-foreground hover:text-foreground hover:decoration-foreground underline decoration-neutral-600 decoration-dashed underline-offset-2">
          <a href="https://github.com/deewakar-k" target="_blank">
            github
          </a>
        </span>
      </p>
    </section>
  );
};
