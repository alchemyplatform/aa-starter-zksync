import "../styles/globals.css";
import TopNav from "./top-nav/top-nav";
import { Providers } from "./providers";

export default function SharedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <TopNav />
      <div>{children}</div>
    </Providers>
  );
}
