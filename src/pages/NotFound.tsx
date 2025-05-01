
import { Link } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center">
              <span className="text-white text-3xl font-bold">404</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold">Page Not Found</h1>
          <p className="text-muted-foreground max-w-md">
            The page you are looking for doesn't exist or has been moved.
            Please check the URL or return to the dashboard.
          </p>
          <div className="pt-4">
            <Button asChild>
              <Link to="/">Return to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default NotFound;
