
// Re-export sonner toast for direct usage
import { toast } from "sonner";

export { toast };
export type ToastActionElement = React.ReactElement;

// If you need the hook-style API in the future
export const useToast = () => {
  return {
    toast,
  };
};
