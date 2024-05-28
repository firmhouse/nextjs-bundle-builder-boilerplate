import { findActiveStep } from "@/lib/steps-config";

export const runtime = "edge";

export default function Layout({
  params,
  orderSummary,
  content,
  progressIndicator,
  header,
}: Readonly<{
  params: { step: string };
  children: React.ReactNode;
  orderSummary: React.ReactNode;
  content: React.ReactNode;
  progressIndicator: React.ReactNode;
  header: React.ReactNode;
}>) {
  const { activeStep } = findActiveStep(params.step);
  const sidebarImage = activeStep.image ?? "/step-0.jpg";
  return (
    <div className="flex h-screen max-h-screen overflow-hidden bg-white">
      <aside
        style={{
          backgroundImage: `url('${sidebarImage}')`,
        }}
        className={`hidden md:flex w-1/4 h-full bg-cover justify-center p-10 mt-12`}
      >
        {progressIndicator}
      </aside>
      <main className="md:w-3/4 w-full h-screen md:bg-none flex flex-col text-black pt-12">
        <div className="flex flex-col flex-1 pt-7 overflow-y-scroll bg-white">
          <div className="md:hidden flex items-center w-full justify-center">{progressIndicator}</div>
          {header}
          {content}
        </div>
        <div className="w-full md:h-[165px] items-center justify-center z-10 bg-white">
          {orderSummary}
        </div>
      </main>
    </div>
  );
}
