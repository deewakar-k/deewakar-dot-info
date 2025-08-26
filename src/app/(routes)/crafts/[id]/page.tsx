import { Guide } from "@/components/guide";

export default async function CraftPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  return <Guide id={id} />;
}
