
import * as React from "react";
import { toast as sonnerToast, type ToastT } from "sonner";

// Create a wrapper function to handle both shadcn/ui style and sonner style
function toast(props: ToastT | { 
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: "default" | "destructive";
  action?: React.ReactElement;
}) {
  if (typeof props === 'string' || React.isValidElement(props)) {
    return sonnerToast(props);
  }

  // If it's an object with title, convert to sonner format
  const { title, description, variant, action, ...rest } = props as any;

  if (title) {
    return sonnerToast(title as string, {
      description,
      // Handle variant if specified
      ...(variant === 'destructive' ? { style: { backgroundColor: 'var(--destructive)', color: 'var(--destructive-foreground)' } } : {}),
      // Handle action if specified
      ...(action ? { action } : {}),
      ...rest
    });
  } else {
    // If no title, use description as title
    return sonnerToast(description as string || "", rest);
  }
}

// Export the toast function
export { toast };
export type ToastActionElement = React.ReactElement;

// Export the hook style API
export const useToast = () => {
  return {
    toast
  };
};
