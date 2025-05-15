
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { validateAPIKey, testOpenAIConnection } from "@/lib/openai";
import { toast } from "@/hooks/use-toast";

interface OpenAIContextType {
  isApiAvailable: boolean;
  isApiKeyValid: boolean;
  isTestingConnection: boolean;
  testConnection: () => Promise<boolean>;
  errorMessage: string | null;
  resetErrorState: () => void;
  lastChecked?: Date;
}

const OpenAIContext = createContext<OpenAIContextType | undefined>(undefined);

export function OpenAIProvider({ children }: { children: ReactNode }) {
  const [isApiKeyValid, setIsApiKeyValid] = useState<boolean>(false);
  const [isApiAvailable, setIsApiAvailable] = useState<boolean>(true);
  const [isTestingConnection, setIsTestingConnection] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastChecked, setLastChecked] = useState<Date | undefined>(undefined);

  // Check API key validity on initial load
  useEffect(() => {
    const checkApiKey = async () => {
      try {
        const isValid = await validateAPIKey();
        setIsApiKeyValid(isValid);
        setIsApiAvailable(isValid);
        setLastChecked(new Date());
        
        if (!isValid) {
          setErrorMessage("OpenAI API key is invalid or has expired.");
        }
      } catch (error) {
        console.error("Error checking API key:", error);
        setIsApiKeyValid(false);
        setIsApiAvailable(false);
        setErrorMessage("Failed to validate OpenAI API key.");
      }
    };

    checkApiKey();
  }, []);

  const testConnection = async (): Promise<boolean> => {
    setIsTestingConnection(true);
    setErrorMessage(null);

    try {
      const connectionWorks = await testOpenAIConnection();
      setIsApiAvailable(connectionWorks);
      setIsApiKeyValid(connectionWorks);
      setLastChecked(new Date());

      if (connectionWorks) {
        toast({
          description: "OpenAI connection successful! AI features are ready to use.",
        });
      } else {
        setErrorMessage("OpenAI connection failed. Please check your API key and try again.");
        toast({
          variant: "destructive",
          description: "OpenAI connection failed. AI features may not work correctly.",
        });
      }

      return connectionWorks;
    } catch (error) {
      console.error("Error testing connection:", error);
      setIsApiAvailable(false);
      setErrorMessage("Error testing OpenAI connection.");
      toast({
        variant: "destructive",
        description: "Error testing OpenAI connection. Please try again later.",
      });
      return false;
    } finally {
      setIsTestingConnection(false);
    }
  };

  const resetErrorState = () => {
    setErrorMessage(null);
  };

  return (
    <OpenAIContext.Provider
      value={{
        isApiAvailable,
        isApiKeyValid,
        isTestingConnection,
        testConnection,
        errorMessage,
        resetErrorState,
        lastChecked,
      }}
    >
      {children}
    </OpenAIContext.Provider>
  );
}

export function useOpenAI() {
  const context = useContext(OpenAIContext);
  if (context === undefined) {
    throw new Error("useOpenAI must be used within an OpenAIProvider");
  }
  return context;
}
