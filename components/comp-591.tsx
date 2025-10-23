import { BotMessageSquareIcon, MessageCircleDashedIcon } from "lucide-react"

import UserMenu from "@/components/navbar-components/user-menu"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Component() {
  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div>
          <Select defaultValue="orion-alpha-45" aria-label="Select AI model">
            <SelectTrigger className="**:data-desc:hidden [&>svg]:shrink-0 [&>svg]:text-muted-foreground/80">
              <BotMessageSquareIcon size={16} aria-hidden="true" />
              <SelectValue placeholder="Choose an AI model" />
            </SelectTrigger>
            <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
              <SelectGroup>
                <SelectLabel className="ps-2">Models</SelectLabel>
                <SelectItem value="orion-alpha-45">
                  Orion-Alpha 4.5
                  <span
                    className="mt-1 block text-xs text-muted-foreground"
                    data-desc
                  >
                    Balanced performance and creativity
                  </span>
                </SelectItem>
                <SelectItem value="orion-code-4">
                  Orion-Code 4
                  <span
                    className="mt-1 block text-xs text-muted-foreground"
                    data-desc
                  >
                    Optimized for code generation and understanding
                  </span>
                </SelectItem>
                <SelectItem value="nova-chat-4">
                  Nova-Chat 4
                  <span
                    className="mt-1 block text-xs text-muted-foreground"
                    data-desc
                  >
                    Excels at natural, engaging conversations
                  </span>
                </SelectItem>
                <SelectItem value="galaxy-max-4">
                  Galaxy-Max 4
                  <span
                    className="mt-1 block text-xs text-muted-foreground"
                    data-desc
                  >
                    Most powerful model for complex tasks
                  </span>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
  )
}
