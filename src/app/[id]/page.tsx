import { Preview } from "@/components/preview";
import { getComponentById } from "@/lib/components-registry";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const componentData = getComponentById(id);

  if (!componentData) {
    notFound();
  }

  const {
    title,
    description,
    component: Component,
    sourceCode,
    showCode,
  } = componentData;

  if (!Component) {
    notFound();
  }

  return (
    <Preview
      title={title}
      description={description}
      Component={Component}
      sourceCode={sourceCode}
      showCode={showCode}
    />
  );
}
