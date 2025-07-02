import { useTheme } from "next-themes";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import EmojiPicker, { Theme } from "emoji-picker-react";

interface Props {
  onChange: (icon: string) => void;
  children: React.ReactNode;
  asChild?: boolean;
}

const IconPicker = ({ onChange, children, asChild }: Props) => {
  const { theme } = useTheme();

  const currentTheme =
    theme === "system"
      ? Theme.AUTO
      : theme === "dark"
        ? Theme.DARK
        : Theme.LIGHT;

  return (
    <Popover>
      <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>

      <PopoverContent className="p-0 w-full border-none shadow-none">
        <EmojiPicker
          height={350}
          theme={currentTheme}
          onEmojiClick={(data) => onChange(data.emoji)}
        />
      </PopoverContent>
    </Popover>
  );
};

export default IconPicker;
