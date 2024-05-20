export default function Layout({
  orderSummary,
  productList,
  progressIndicator,
  header
}: Readonly<{
  children: React.ReactNode;
  orderSummary: React.ReactNode;
  productList: React.ReactNode;
  progressIndicator: React.ReactNode;
  header: React.ReactNode;
}>) {
  return <div className="flex flex-row w-full h-full">
    <div className="flex w-full h-full justify-start flex-col pr-[300px] pl-2 bg-white">
      {progressIndicator}
      <div className="flex flex-col h-full">
        {header}
        {productList}
      </div>
    </div>
    {orderSummary}
  </div>;
}
