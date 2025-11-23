

import { Injectable, signal } from '@angular/core';
import { GoogleGenAI, GenerateContentResponse, Type } from '@google/genai';

// Interface for the expected JSON structure from the Gemini API
interface GeminiDescriptionResponse {
  descriptions: {
    service: string;
    description: string;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private ai: GoogleGenAI | null = null;
  public error = signal<string | null>(null);

  constructor() {
    try {
      if (typeof process === 'undefined' || !process.env['API_KEY']) {
        throw new Error('API_KEY environment variable not set.');
      }
      this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
      console.error(`Failed to initialize Gemini AI: ${errorMessage}. Ensure the process.env.API_KEY is available in your environment.`);
      this.error.set('AI Service Initialization Failed: The API_KEY is missing or invalid. Please check your environment configuration.');
    }
  }

  async generateServiceDescriptions(serviceTitles: string[]): Promise<string[]> {
    if (!this.ai) {
      this.error.set('AI Service is not initialized.');
      return serviceTitles.map(() => "Description could not be generated.");
    }

    this.error.set(null);
    try {
      const prompt = `For each of the following web agency services, write a single, compelling, and concise sentence (max 15 words) that describes its value. The services are: ${serviceTitles.join(', ')}.`;
      
      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              descriptions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    service: { type: Type.STRING },
                    description: { type: Type.STRING }
                  }
                }
              }
            }
          }
        }
      });

      const jsonResponse: GeminiDescriptionResponse = JSON.parse(response.text);
      
      return serviceTitles.map(title => {
        const found = jsonResponse.descriptions.find((d) => d.service.toLowerCase() === title.toLowerCase());
        return found ? found.description : "Innovative solutions tailored for your business growth.";
      });

    } catch (e: unknown) {
      console.error('Error generating content:', e);
      this.error.set('Could not generate content from AI. Please try again later.');
      return serviceTitles.map(() => 'Error loading description.');
    }
  }

  async getAutomatedReply(userName: string, userMessage: string): Promise<string> {
    if (!this.ai) {
      this.error.set('AI Service is not initialized.');
      return "Thank you for your message. We are currently experiencing technical difficulties but will get back to you shortly.";
    }

    this.error.set(null);
    try {
      const prompt = `You are a friendly and professional AI assistant for ClickAura, a web & AI agency. A potential client named ${userName} has sent the following message: "${userMessage}". Write a brief, encouraging, and helpful reply. Acknowledge their message, thank them, and assure them that a human expert will review their message and get back to them within 24 hours. Keep it under 50 words.`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      return response.text;
    } catch (e) {
      console.error('Error getting automated reply:', e);
      this.error.set('Could not generate an automated reply.');
      return `Hi ${userName}, thank you for reaching out! We've received your message and a specialist from our team will get in touch with you soon.`;
    }
  }
}