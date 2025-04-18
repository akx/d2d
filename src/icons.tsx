// This file is auto-generated. Do not edit.
// Generated by react-icons-gen 0.1.0
// from react-icons 5.5.0
// Based on https://github.com/react-icons/react-icons/blob/7bf8bdd2501871a73b7f85fe853d751f5c0f2fb3/packages/react-icons/src/iconBase.tsx
import * as React from "react";

interface IconTree {
  tag: string;
  attr: Record<string, string>;
  child: IconTree[];
}

type IconTreeRoot = Omit<IconTree, "tag">;

interface IconProps extends Omit<React.SVGAttributes<SVGElement>, "children"> {
  size?: string | number;
  title?: string;
}

function convert(tree: IconTree[]): React.ReactElement[] {
  return tree.map(({ attr, child, tag }) => React.createElement(tag, attr, ...convert(child)));
}

function defIcon(displayName: string, { attr, child }: IconTreeRoot) {
  let children: React.ReactElement[] | undefined; // Cached children
  return Object.assign(
    function GenIcon({ size = "1em", title, ...props }: IconProps) {
      return React.createElement(
        "svg",
        {
          stroke: "currentColor",
          fill: "currentColor",
          strokeWidth: "0",
          height: size,
          width: size,
          ...attr,
          ...props,
        },
        ...(children ?? (children = convert(child))),
      );
    },
    { displayName },
  );
}

export const FaCaretDown: React.ComponentType<IconProps> = defIcon("FaCaretDown", {
  attr: { viewBox: "0 0 320 512" },
  child: [
    {
      tag: "path",
      attr: {
        d: "M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z",
      },
      child: [],
    },
  ],
});
export const FaCopy: React.ComponentType<IconProps> = defIcon("FaCopy", {
  attr: { viewBox: "0 0 448 512" },
  child: [
    {
      tag: "path",
      attr: {
        d: "M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z",
      },
      child: [],
    },
  ],
});
export const FaTrash: React.ComponentType<IconProps> = defIcon("FaTrash", {
  attr: { viewBox: "0 0 448 512" },
  child: [
    {
      tag: "path",
      attr: {
        d: "M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z",
      },
      child: [],
    },
  ],
});
