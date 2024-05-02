import Header from "../..//components/header";
import { useSearchParams } from "next/navigation";

function article({
  params,
}: {
  params: { id: string };
}) {
  const pageId = params.id;
  return (
    <div>
      <Header />
      <p>{pageId}のページ</p>
    </div>
  );
}

export default article;
