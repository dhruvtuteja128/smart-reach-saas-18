
// Re-export from our central toast implementation
import { toast, useToast, type ToastT } from "@/hooks/use-toast";
import type { ToastActionElement } from "@/components/ui/toast";

// Make sure toast is always visible and properly positioned
const enhancedToast = (props: ToastT) => {
  // Log toast for debugging
  console.log("Toast triggered:", props);
  
  // Call the original toast function with a position if not specified
  return toast({
    ...props,
    position: props.position || "top-right" 
  });
};

export { enhancedToast as toast, useToast, type ToastActionElement, type ToastT };
