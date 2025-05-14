
// Re-export from sonner
import { toast } from "sonner";

// For shadcn compatibility
export { toast };
export type ToastActionElement = React.ReactElement;

export const useToast = () => {
  return {
    toast: (props: any) => {
      // Convert shadcn/ui toast format to sonner format
      if (typeof props === 'object') {
        const { title, description, variant, action, ...rest } = props;
        
        // For sonner, we need to pass title as the first argument
        // and the rest as options
        return toast(title, {
          description,
          // Map variant to sonner's format if needed
          ...(variant === 'destructive' ? { style: { backgroundColor: 'var(--destructive)', color: 'var(--destructive-foreground)' } } : {}),
          // Handle any other props
          ...rest
        });
      }
      // If it's a simple string or any other format, pass directly
      return toast(props);
    }
  };
};
