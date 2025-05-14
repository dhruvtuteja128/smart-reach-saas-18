
import { useToast } from "@/components/ui/toast";
import { toast as sonnerToast } from "@/components/ui/sonner";

// Modified to avoid naming conflicts while providing both toast options
export { useToast };
export const toast = useToast().toast;
export { sonnerToast };
