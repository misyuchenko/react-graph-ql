import { cn } from "@/shared/utils";
import styles from "./MobileMenu.module.css";
import { ChatBubbleIcon, GearIcon } from "@radix-ui/react-icons";
import Button from "@/shared/ui/Button/Button";

const MobileMenu = () => {
  return (
    <div
      className={cn(
        styles.mobileMenu,
        "sm:hidden",
        "max-sm:p-3",
        "max-sm:rounded-t-xl",
      )}
    >
      <nav className="flex justify-around gap-1">
        <Button>
          <ChatBubbleIcon width={32} height={32} />
        </Button>
        <Button>
          <GearIcon width={32} height={32} />
        </Button>
      </nav>
    </div>
  );
};

export default MobileMenu;
