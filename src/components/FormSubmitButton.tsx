"use client";

import { ComponentProps } from "react";
// displaying loading state
import ReactDom from "react-dom";

const useFormStatus = (
	ReactDom as any as {
		experimental_useFormStatus: () => {
			pending: boolean;
			data: FormData | null;
			method: 'get' | 'post' | null;
			action: ((formData: FormData) => Promise<void>) | null;
		};
	}
).experimental_useFormStatus;

type FormSubmitButtonProps = {
  // it allows us to pass a component between the
  // opening and closing tags of another component
  children: React.ReactNode,
  className?: string,
} & ComponentProps<"button">

export default function FormSubmitButton({
  children,
  className,
  ...props
}: FormSubmitButtonProps) {

  // displaying loading state
  const { pending } = useFormStatus()

  return (
    <button
      {...props}
      className={`btn btn-primary ${className}`}
      type="submit"
      disabled={pending}
    >
      {pending && <span className="loading loading-spinner loading-lg" />}
      {children}</button>
  )
}