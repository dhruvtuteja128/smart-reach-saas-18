
// Re-export the hook and components from our UI toast components
import { type ToastActionElement, useToast as useToastUI } from "@/components/ui/toast";
import { toast as sonnerToast } from "@/components/ui/sonner";

export { type ToastActionElement };

// Properly export the hook
export const useToast = useToastUI;

// Export the toast function for direct usage
export const toast = sonnerToast;
