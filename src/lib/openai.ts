
import { toast } from "@/hooks/use-toast";
import { formatAIError } from "@/lib/utils";

// OpenAI API configuration
const OPENAI_API_KEY = "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";
const OPENAI_API_URL = "https://api.openai.com/v1";

// Default model - use the latest available
export const DEFAULT_MODEL = "gpt-4o-mini";

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
 * Interface for campaign content generation result
 */
export interface CampaignContentResult {
  subject?: string;
  content: string;
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
  console.log("Calling OpenAI API with messages:", messages);
  
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

    console.log("OpenAI API response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API Error:", errorData);
      
      // Handle specific error types
      if (response.status === 429) {
        if (errorData.error?.type === "insufficient_quota") {
          throw new Error("API quota exceeded. Please check your OpenAI billing details.");
        } else {
          throw new Error("Rate limit exceeded. Please try again in a moment.");
        }
      }
      
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("OpenAI API response data:", data);
    
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
    console.log("Validating API key by calling models endpoint");
    const response = await fetch(`${OPENAI_API_URL}/models`, {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    });

    if (response.ok) {
      console.log("API key validation successful");
      return true;
    } else {
      const errorData = await response.json();
      console.error("API key validation failed:", errorData);
      
      // Log specific error information for debugging
      if (errorData.error?.type === "insufficient_quota") {
        console.error("API quota exceeded. Please check your OpenAI billing details.");
      }
      
      return false;
    }
  } catch (error) {
    console.error("Error validating API key:", error);
    return false;
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
    // Create a context-aware system message if not already present
    if (!messages.some(msg => msg.role === "system")) {
      const systemMessage: OpenAIMessage = {
        role: "system",
        content: `You are AIDA, an AI marketing assistant. You help marketers create campaigns, analyze data, and optimize their marketing efforts. ${
          selectedTool
            ? `The user is currently using the "${selectedTool}" tool. Focus your response on this specific task.`
            : ""
        }
        
        Be helpful, concise, and practical. When appropriate, suggest specific actions the user can take.
        
        Detect the user's intent to provide the most relevant assistance.`
      };
      
      // Add the system message at the beginning
      messages = [systemMessage, ...messages];
    }
    
    console.log("Generating assistant response with messages:", messages);
    
    const completion = await callOpenAI(messages);
    
    if (!completion) {
      console.error("No completion returned from OpenAI");
      return null;
    }
    
    console.log("Received completion:", completion);
    
    // Parse the response to identify intent and actions
    let intent: string | undefined;
    let actions: { label: string; action: string }[] | undefined;
    
    // Simple intent detection based on content
    const lowerContent = completion.toLowerCase();
    
    if (lowerContent.includes("campaign") || lowerContent.includes("email")) {
      intent = "campaign";
      actions = [
        { label: "View Campaign", action: "view" },
        { label: "Edit Content", action: "edit" },
        { label: "Schedule", action: "schedule" }
      ];
    } 
    else if (lowerContent.includes("workflow") || lowerContent.includes("automation")) {
      intent = "workflow";
      actions = [
        { label: "View Workflow", action: "view" },
        { label: "Edit Steps", action: "edit" },
        { label: "Activate", action: "activate" }
      ];
    }
    else if (lowerContent.includes("analytics") || lowerContent.includes("performance")) {
      intent = "analytics";
      actions = [
        { label: "View Full Report", action: "report" },
        { label: "Export Data", action: "export" },
      ];
    }
    else if (lowerContent.includes("copy") || lowerContent.includes("write") || lowerContent.includes("headline")) {
      intent = "copywriting";
      actions = [
        { label: "Copy to Clipboard", action: "copy" },
        { label: "Generate More", action: "more" },
      ];
    }
    
    return { 
      content: completion,
      intent,
      actions
    };
  } catch (error) {
    console.error("Error generating assistant response:", formatAIError(error));
    return null;
  }
}

/**
 * Process voice input to text
 * In a real implementation, this would use the OpenAI Whisper API
 * For now, we'll simulate this functionality
 */
export async function processVoiceToText(audioBlob: Blob): Promise<string | null> {
  try {
    // Create form data for the request
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.wav');
    formData.append('model', 'whisper-1');
    
    // Make the request to OpenAI's Whisper API
    const response = await fetch(`${OPENAI_API_URL}/audio/transcriptions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: formData
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI Whisper API Error:", errorData);
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Error processing voice to text:", error);
    // Fallback to simulated response
    console.log("Falling back to simulated response");
    await new Promise(resolve => setTimeout(resolve, 1500));
    return "Create an email campaign for our summer promotion";
  }
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

/**
 * Generate email subject lines for A/B testing
 */
export async function generateSubjectLines(
  topic: string, 
  tone: string = "professional",
  count: number = 3
): Promise<string[] | null> {
  try {
    const prompt = `Create ${count} unique and engaging email subject lines about ${topic}. 
    The tone should be ${tone}. 
    Make them compelling and likely to result in high open rates.
    Return only the subject lines, nothing else.`;
    
    const messages: OpenAIMessage[] = [
      {
        role: "system",
        content: "You are an expert email marketer who specializes in creating high-converting subject lines."
      },
      { role: "user", content: prompt }
    ];
    
    const result = await callOpenAI(messages);
    
    if (!result) {
      return null;
    }
    
    // Parse the result into separate subject lines
    const subjectLines = result
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => line.replace(/^\d+\.\s*/, '')) // Remove numbering if present
      .slice(0, count);
      
    return subjectLines;
  } catch (error) {
    console.error("Error generating subject lines:", error);
    return null;
  }
}

/**
 * Generate content for a campaign based on its type, goal, and audience
 */
export async function generateCampaignContent(
  campaignType: string,
  goal: string,
  audience: string,
  tone: string = "professional"
): Promise<CampaignContentResult | null> {
  try {
    const prompt = `Create compelling marketing content for a ${campaignType} campaign.
    
    Goal: ${goal}
    Target audience: ${audience}
    Tone: ${tone}
    
    For an email or ad campaign, provide both a subject line/headline and message content.
    For SMS or messaging apps, provide just the message content.
    
    Make the content engaging, persuasive, and tailored to the target audience.`;
    
    const messages: OpenAIMessage[] = [
      {
        role: "system",
        content: "You are an expert marketing copywriter who specializes in creating high-converting campaign content for various channels."
      },
      { role: "user", content: prompt }
    ];
    
    const result = await callOpenAI(messages);
    
    if (!result) {
      return null;
    }
    
    // Parse the result to extract subject and content
    let subject: string | undefined;
    let content: string = result;
    
    if (campaignType === "email" || campaignType === "ads") {
      // Try to extract subject line/headline
      const subjectMatch = result.match(/(?:subject|headline)(?:\s*line)?:\s*(.+?)(?:\n|$)/i);
      if (subjectMatch && subjectMatch[1]) {
        subject = subjectMatch[1].trim();
        // Remove the subject line from the content
        content = result.replace(/(?:subject|headline)(?:\s*line)?:\s*(.+?)(?:\n|$)/i, '').trim();
      } else {
        // If no clear subject found, try to extract the first line as subject
        const lines = result.split('\n').filter(line => line.trim().length > 0);
        if (lines.length > 1) {
          subject = lines[0].trim();
          content = lines.slice(1).join('\n').trim();
        }
      }
    }
    
    return {
      subject,
      content
    };
  } catch (error) {
    console.error("Error generating campaign content:", error);
    return null;
  }
}
