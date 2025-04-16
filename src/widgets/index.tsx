import React from "react";
import { FaCaretDown } from "react-icons/fa";
import { DropdownMenu } from "radix-ui";
import cx, { ClassValue } from "clsx";

interface CheckboxProps {
  label: string;
  shortLabel: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Checkbox({ label, shortLabel, checked, onChange }: CheckboxProps) {
  return (
    <label className="flex items-center gap-2 select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="cursor-pointer"
      />
      <span className="hidden @min-sm:inline">{label}</span>
      <span className="hidden @max-sm:inline">{shortLabel}</span>
    </label>
  );
}

interface DropdownItem {
  id: string;
  name: string;
  active: boolean;
  text: string;
  onClick: () => void;
  description?: string;
}

interface DropdownProps {
  text: string;
  items: DropdownItem[];
  className?: ClassValue;
}

export function Dropdown({ text, items, className }: DropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={cx(className, "hover:bg-zinc-50 select-none cursor-pointer whitespace-nowrap")}>
        {text} <FaCaretDown className="ms-1 -translate-y-0.5 inline leading-none" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align="start" className="min-w-48 bg-white shadow-lg border border-zinc-200 z-50">
          {items?.map((item) => (
            <DropdownMenu.Item
              key={item.id}
              className={`items-center px-3 py-2 text-sm ${item.active ? "bg-zinc-300" : ""} hover:bg-zinc-100 cursor-pointer select-none`}
              onClick={item.onClick}
            >
              {item.text}
              {item.description && <div className="text-zinc-500 text-xs">{item.description}</div>}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
