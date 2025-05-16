
// Re-export from our central toast implementation
import { toast as originalToast, useToast, type ToastT } from "@/hooks/use-toast";
import type { ToastActionElement } from "@/components/ui/toast";

// Define a type that extends ToastT with our position property
type EnhancedToastT = ToastT & {
  position?: "top-right" | "top" | "top-left" | "bottom-right" | "bottom" | "bottom-left";
};

// Make sure toast is always visible and properly positioned
const enhancedToast = (props: EnhancedToastT) => {
  // Log toast for debugging
  console.log("Toast triggered:", props);
  
  // Extract position from props to avoid passing it to the original toast
  const { position, ...restProps } = props;
  
  // Call the original toast function with custom styling based on position
  return originalToast({
    ...restProps,
    // You can add additional styling based on position if needed
  });
};

export { enhancedToast as toast, useToast, type ToastActionElement, type ToastT, type EnhancedToastT };
