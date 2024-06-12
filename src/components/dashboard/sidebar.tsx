import { usePathname } from "next/navigation";
import { SquareTerminal, SquareUser, Triangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
      <div className="border-b p-2">
        <Link href="/" passHref>
          <Button variant="outline" size="icon" aria-label="Home">
            <Triangle className="size-5 fill-foreground" />
          </Button>
        </Link>
      </div>
      <nav className="grid gap-1 p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/home" passHref>
              <Button
                variant="ghost"
                size="icon"
                className={
                  "rounded-lg " + (isActive("/home") ? "bg-muted" : "")
                }
                aria-label="home"
              >
                <SquareTerminal className="size-5" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Playground
          </TooltipContent>
        </Tooltip>
      </nav>
      <nav className="mt-auto grid gap-1 p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/account" passHref>
              <Button
                variant="ghost"
                size="icon"
                className={
                  "mt-auto rounded-lg " +
                  (isActive("/account") ? "bg-muted" : "")
                }
                aria-label="Account"
              >
                <SquareUser className="size-5" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Account
          </TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}
