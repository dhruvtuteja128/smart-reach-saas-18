
import { Layout } from "@/components/Layout";
import { BellRing } from "lucide-react";

const Integrations = () => {
  return (
    <Layout>
      <div className="p-6 md:p-8 animate-fade-in">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Integrations</h1>
          <p className="text-muted-foreground mt-1">
            Connect your marketing tools and platforms
          </p>
        </header>
        <div className="flex items-center justify-center h-[70vh]">
          <div className="text-center space-y-4">
            <div className="bg-primary/10 p-6 rounded-full inline-block">
              <BellRing className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold">Coming Soon</h2>
            <p className="text-muted-foreground max-w-md">
              The Integrations module is currently in development. Check back soon!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Integrations;
