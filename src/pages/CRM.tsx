
import { Layout } from "@/components/Layout";
import { Users } from "lucide-react";

const CRM = () => {
  return (
    <Layout>
      <div className="p-6 md:p-8 animate-fade-in">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">CRM</h1>
          <p className="text-muted-foreground mt-1">
            Manage your contacts, leads and customer relationships
          </p>
        </header>
        <div className="flex items-center justify-center h-[70vh]">
          <div className="text-center space-y-4">
            <div className="bg-primary/10 p-6 rounded-full inline-block">
              <Users className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold">Coming Soon</h2>
            <p className="text-muted-foreground max-w-md">
              The CRM module is currently in development. Check back soon!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CRM;
