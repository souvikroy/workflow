
"use server";

import { suggestWorkflow, type WorkflowSuggestionInput } from '@/ai/flows/workflow-suggestion';
import type { WorkflowSuggestion } from '@/types/workflow';

export async function suggestWorkflowAction(
  input: WorkflowSuggestionInput
): Promise<WorkflowSuggestion | { error: string }> {
  try {
    const result = await suggestWorkflow(input);
    return result;
  } catch (error) {
    console.error("Error in suggestWorkflowAction:", error);
    return { error: error instanceof Error ? error.message : "An unknown error occurred" };
  }
}
