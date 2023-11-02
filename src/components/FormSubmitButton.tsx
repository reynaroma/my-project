"use client";

import { ComponentProps } from "react";
// 
type FormSubmitButtonProps = {
  // it allows us to pass a component between the
  // opening and closing tags of another component
  children: React.ReactNode,
  className?: string,
} & ComponentProps<"button">

export default function FormSubmitButton(
  { children, className }: FormSubmitButtonProps
) {
  return (
    <button>{children}</button>
  )
}