// Import types
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ListItemPropsType = { children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * `ListItem` is a React component that displays a list item with a button.
 * The button's content and attributes can be customized through the component's props.
 * The component receives two types of props: `children` (the content of the button) and `ButtonHTMLAttributes` (the attributes of the button).
 *
 * @param {ReactNode} props.children - The content of the button.
 * @param {ButtonHTMLAttributes<HTMLButtonElement>} props.props - The attributes of the button element.
 * @returns {JSX.Element} The rendered `ListItem` component.
 */

export function ListItem({ children, ...props }: ListItemPropsType) {
  return (
    <li>
      <button
        type="button"
        {...props}
      >
        {children}
      </button>
    </li>
  );
}
