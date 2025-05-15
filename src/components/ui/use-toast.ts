
// Re-export from our central toast implementation
import { toast, useToast, type ToastT } from "@/hooks/use-toast";
import type { ToastActionElement } from "@/components/ui/toast";

export { toast, useToast, type ToastActionElement, type ToastT };
