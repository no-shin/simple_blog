import Header from "../..//components/header";

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
