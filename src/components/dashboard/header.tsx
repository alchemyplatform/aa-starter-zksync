import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../ui/mode-toggle";

export function Header({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="ml-auto flex items-center gap-3">
        <a
          href="https://accountkit.alchemy.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Button variant="outline" size="sm" className="gap-1.5 text-sm">
            <ExternalLink className="size-3.5" />
            Account Kit
          </Button>
        </a>
        <ModeToggle />
      </div>
    </header>
  );
}
