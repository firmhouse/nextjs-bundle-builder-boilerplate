export const runtime = "edge";

export default function Layout({
  orderSummary,
  content,
  progressIndicator,
  header
}: Readonly<{
  children: React.ReactNode;
  orderSummary: React.ReactNode;
  content: React.ReactNode;
  progressIndicator: React.ReactNode;
  header: React.ReactNode;
}>) {
  return <div className="flex flex-col md:flex-row md:h-screen w-full md:overflow-hidden">
    <div className="flex w-full h-full items-center justify-start flex-col md:pr-[300px] pl-2 bg-white pb-[370px] md:pb-0">
      {progressIndicator}
      <div className="flex flex-col h-full w-full screen-lg overflow-y-auto">
        {header}
        {content}
      </div>
    </div>
    {orderSummary}
  </div>;
}
