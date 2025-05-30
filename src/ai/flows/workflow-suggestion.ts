// Workflow-suggestion.ts
'use server';
/**
 * @fileOverview AI-powered workflow suggestion flow.
 *
 * This file defines a Genkit flow that takes a natural language description
 * of a desired workflow and returns AI-powered suggestions for workflow
 * configurations.
 *
 * @fileOverview A plant problem diagnosis AI agent.
 *
 * - suggestWorkflow - A function that handles the workflow suggestion process.
 * - WorkflowSuggestionInput - The input type for the suggestWorkflow function.
 * - WorkflowSuggestionOutput - The return type for the suggestWorkflow function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WorkflowSuggestionInputSchema = z.object({
  description: z
    .string()
    .describe(
      'A natural language description of the desired workflow.'
    ),
});
export type WorkflowSuggestionInput = z.infer<typeof WorkflowSuggestionInputSchema>;

const WorkflowSuggestionOutputSchema = z.object({
  suggestedWorkflowConfiguration: z
    .string()
    .describe(
      'A JSON-based workflow configuration suggested by the AI, conforming to the defined Workflow JSON schema (nodes + connections + parameters).'
    ),
});
export type WorkflowSuggestionOutput = z.infer<typeof WorkflowSuggestionOutputSchema>;

export async function suggestWorkflow(input: WorkflowSuggestionInput): Promise<WorkflowSuggestionOutput> {
  return suggestWorkflowFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestWorkflowPrompt',
  input: {schema: WorkflowSuggestionInputSchema},
  output: {schema: WorkflowSuggestionOutputSchema},
  prompt: `You are an AI expert in workflow automation, specializing in suggesting workflow configurations based on natural language descriptions.

You will receive a description of a desired workflow, and you will respond with a JSON-based workflow configuration that implements the workflow.

The workflow configuration should conform to the following JSON schema:

{
  "nodes": [
    {
      "id": "string",
      "type": "string",
      "parameters": {}
    }
  ],
  "connections": [
    {
      "source": "string",
      "target": "string"
    }
  ]
}

Description: {{{description}}}
`,
});

const suggestWorkflowFlow = ai.defineFlow(
  {
    name: 'suggestWorkflowFlow',
    inputSchema: WorkflowSuggestionInputSchema,
    outputSchema: WorkflowSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
