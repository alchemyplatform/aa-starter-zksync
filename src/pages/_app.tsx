import SharedLayout from "@/components/shared-layout";

export default function MyApp({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}) {
  return (
    <SharedLayout>
      <div className="flex flex-col items-center justify-center gap-4 p-24">
        <Component {...pageProps} />
      </div>
    </SharedLayout>
  );
}
