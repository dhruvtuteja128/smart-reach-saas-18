
import { toast } from "@/hooks/use-toast";

// OpenAI API configuration
const OPENAI_API_KEY = "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";
const OPENAI_API_URL = "https://api.openai.com/v1";

// Default model - use the latest available
export const DEFAULT_MODEL = "gpt-4o";

// Error message for API failures
export const API_ERROR_MESSAGE = "AI is currently unavailable. Please try again shortly.";

// Interface for OpenAI chat message
export interface OpenAIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

// Interface for OpenAI response
export interface OpenAIResponse {
  id: string;
  created: number;
  model: string;
  choices: {
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Calls the OpenAI Chat Completions API
 */
export async function callOpenAI(
  messages: OpenAIMessage[],
  model: string = DEFAULT_MODEL,
  temperature: number = 0.7,
  max_tokens: number = 1000
): Promise<string | null> {
  try {
    const response = await fetch(`${OPENAI_API_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API Error:", errorData);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return null;
  }
}

/**
 * Validates if the OpenAI API key is working
 */
export async function validateAPIKey(): Promise<boolean> {
  try {
    const response = await fetch(`${OPENAI_API_URL}/models`, {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    });

    if (response.ok) {
      return true;
    } else {
      console.error("API key validation failed:", await response.json());
      return false;
    }
  } catch (error) {
    console.error("Error validating API key:", error);
    return false;
  }
}

/**
 * Generate campaign content based on parameters
 */
export async function generateCampaignContent(
  campaignType: string,
  goal: string,
  audience: string,
  tone: string = "professional"
): Promise<{ subject?: string; content: string } | null> {
  const prompt = `Create a ${campaignType} campaign with the following details:
  - Goal: ${goal}
  - Target Audience: ${audience}
  - Tone: ${tone}
  ${campaignType === "email" ? "Include a subject line and main content." : ""}
  ${campaignType === "ads" ? "Include a headline and main ad copy." : ""}
  ${campaignType === "sms" || campaignType === "whatsapp" ? "Keep it concise and under 160 characters." : ""}`;

  const messages: OpenAIMessage[] = [
    {
      role: "system",
      content: `You are an expert marketing copywriter specialized in creating ${campaignType} campaigns. You produce high-converting, engaging content that follows best practices for the specific channel. ${campaignType === "email" || campaignType === "ads" ? "Format the response with 'Subject:' or 'Headline:' on the first line, followed by the main content." : ""}`,
    },
    { role: "user", content: prompt },
  ];

  try {
    const completion = await callOpenAI(messages);
    
    if (!completion) {
      toast({
        description: API_ERROR_MESSAGE,
        variant: "destructive",
      });
      return null;
    }

    // Parse the response based on campaign type
    if (campaignType === "email" || campaignType === "ads") {
      const lines = completion.split("\n");
      const subject = lines[0].replace(/Subject:|Headline:/i, "").trim();
      const content = lines.slice(1).join("\n").trim();
      
      return { subject, content };
    } else {
      return { content: completion };
    }
  } catch (error) {
    console.error("Error generating campaign content:", error);
    toast({
      description: API_ERROR_MESSAGE,
      variant: "destructive",
    });
    return null;
  }
}

/**
 * Generate a response for the AI assistant
 */
export async function generateAssistantResponse(
  messages: OpenAIMessage[],
  selectedTool?: string
): Promise<{
  content: string;
  intent?: string;
  actions?: { label: string; action: string }[];
} | null> {
  try {
    // Create a context-aware system message
    const systemMessage = {
      role: "system" as const,
      content: `You are an AI marketing assistant named AIDA. You help marketers create campaigns, analyze data, and optimize their marketing efforts. ${
        selectedTool
          ? `The user is currently using the "${selectedTool}" tool. Focus your response on this specific task.`
          : ""
      }
      
      Detect the user's intent and provide a helpful response. When appropriate, suggest actions the user can take.
      
      Your response should be formatted as follows:
      CONTENT: Your detailed response here.
      INTENT: A single word describing the user's intent (e.g., campaign, workflow, analytics, copywriting)
      ACTIONS: Comma-separated list of actions in format "label:action" (e.g., "View Campaign:view, Edit Content:edit")`,
    };

    // Add the system message at the beginning
    const messagesWithSystem = [systemMessage, ...messages];
    
    const completion = await callOpenAI(messagesWithSystem);
    
    if (!completion) {
      return null;
    }
    
    // Parse the structured response
    let content = completion;
    let intent: string | undefined;
    let actions: { label: string; action: string }[] | undefined;
    
    // Try to parse structured format if present
    const contentMatch = completion.match(/CONTENT:(.*?)(?=INTENT:|$)/s);
    const intentMatch = completion.match(/INTENT:(.*?)(?=ACTIONS:|$)/s);
    const actionsMatch = completion.match(/ACTIONS:(.*?)$/s);
    
    if (contentMatch) {
      content = contentMatch[1].trim();
      
      if (intentMatch) {
        intent = intentMatch[1].trim();
      }
      
      if (actionsMatch) {
        const actionsList = actionsMatch[1].trim();
        actions = actionsList.split(",").map(item => {
          const [label, action] = item.split(":");
          return { label: label.trim(), action: action.trim() };
        });
      }
    }
    
    return { content, intent, actions };
  } catch (error) {
    console.error("Error generating assistant response:", error);
    return null;
  }
}

/**
 * Process voice input to text
 * In a real implementation, this would use the OpenAI Whisper API
 * For now, we'll simulate this functionality
 */
export async function processVoiceToText(audioBlob: Blob): Promise<string | null> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return mock response
  return "Create an email campaign for our summer promotion";
}

/**
 * Analyze campaign performance and provide feedback
 */
export async function analyzeCampaignPerformance(
  campaignType: string,
  metrics: Record<string, number>,
  previousResults?: Record<string, number>
): Promise<string | null> {
  const metricsString = Object.entries(metrics)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
  
  const previousResultsString = previousResults
    ? Object.entries(previousResults)
        .map(([key, value]) => `Previous ${key}: ${value}`)
        .join("\n")
    : "No previous results available for comparison.";

  const messages: OpenAIMessage[] = [
    {
      role: "system",
      content: "You are an expert marketing analyst. Analyze the campaign performance metrics and provide insights and recommendations for improvement. Be specific and actionable in your advice.",
    },
    {
      role: "user",
      content: `Please analyze the performance of my ${campaignType} campaign with these metrics:\n${metricsString}\n\nComparison with previous campaigns:\n${previousResultsString}`,
    },
  ];

  try {
    return await callOpenAI(messages);
  } catch (error) {
    console.error("Error analyzing campaign performance:", error);
    return null;
  }
}

/**
 * Test if the OpenAI connection is working
 */
export async function testOpenAIConnection(): Promise<boolean> {
  try {
    const result = await callOpenAI([
      { role: "user", content: "Test connection" }
    ]);
    return result !== null;
  } catch (error) {
    console.error("OpenAI connection test failed:", error);
    return false;
  }
}
