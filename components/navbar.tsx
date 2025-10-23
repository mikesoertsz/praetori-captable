"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  BotMessageSquareIcon,
  MessageCircleDashedIcon,
  ChevronDown,
} from "lucide-react";

import UserMenu from "./navbar-components/user-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const getCurrentPageLabel = () => {
    if (pathname === "/pricing") return "Pricing";
    return "Cap Table";
  };

  const handleRouteChange = (route: string) => {
    router.push(route);
  };

  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="**:data-desc:hidden [&>svg]:shrink-0 [&>svg]:text-muted-foreground/80 justify-start"
              >
                <BotMessageSquareIcon size={16} aria-hidden="true" />
                {getCurrentPageLabel()}
                <ChevronDown className="h-4 w-4 opacity-50 ml-auto" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[280px]">
              <DropdownMenuItem onClick={() => handleRouteChange("/captable")}>
                <div className="flex flex-col">
                  <span className="font-medium">Cap Table</span>
                  <span className="text-xs text-muted-foreground">
                    View and manage cap table projections
                  </span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRouteChange("/pricing")}>
                <div className="flex flex-col">
                  <span className="font-medium">Pricing</span>
                  <span className="text-xs text-muted-foreground">
                    View pricing plans and options
                  </span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right side: Actions */}
        <div className="flex items-center justify-end gap-2">
          {/* Layout button */}
          <Button
            size="icon"
            variant="ghost"
            className="size-8 rounded-full text-muted-foreground shadow-none"
            aria-label="Temporary chat"
          >
            <MessageCircleDashedIcon size={16} aria-hidden="true" />
          </Button>
          {/* User menu */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
