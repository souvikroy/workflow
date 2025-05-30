
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Zap, Network, Database, Mail, FunctionSquare, FileText, MessageCircle, SlidersHorizontal, GitMerge, Clock } from "lucide-react";
import type { Icon as LucideIcon } from "lucide-react";

interface NodeDefinition {
  type: string;
  label: string;
  icon: LucideIcon;
  description: string;
  color?: string; // Optional color for the node icon/card
}

const nodeDefinitions: NodeDefinition[] = [
  { type: "trigger:manual", label: "Manual Trigger", icon: Zap, description: "Manually start a workflow.", color: "text-accent" },
  { type: "trigger:schedule", label: "Scheduler", icon: Clock, description: "Run workflow on a schedule.", color: "text-blue-400" },
  { type: "action:httpRequest", label: "HTTP Request", icon: Network, description: "Make an HTTP request.", color: "text-green-400" },
  { type: "action:databaseQuery", label: "Database Query", icon: Database, description: "Query a database.", color: "text-purple-400" },
  { type: "action:sendEmail", label: "Send Email", icon: Mail, description: "Send an email.", color: "text-orange-400" },
  { type: "logic:customScript", label: "Custom Script", icon: FunctionSquare, description: "Run custom JavaScript code.", color: "text-yellow-400" },
  { type: "logic:dataTransform", label: "Data Transform", icon: SlidersHorizontal, description: "Manipulate data.", color: "text-pink-400" },
  { type: "io:readFile", label: "Read File", icon: FileText, description: "Read data from a file.", color: "text-indigo-400" },
  { type: "io:writeFile", label: "Write File", icon: FileText, description: "Write data to a file.", color: "text-indigo-500" },
  { type: "comm:sendMessage", label: "Send Message", icon: MessageCircle, description: "Send a message (e.g., Slack, Discord).", color: "text-cyan-400" },
  { type: "control:conditional", label: "Conditional Logic", icon: GitMerge, description: "Branch workflow based on conditions.", color: "text-red-400" },
];

export function NodeLibrary() {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Card className="h-full flex flex-col border-0 rounded-none">
      <CardHeader className="p-4 border-b">
        <CardTitle className="text-lg">Node Library</CardTitle>
      </CardHeader>
      <ScrollArea className="flex-grow">
        <CardContent className="p-4 grid grid-cols-1 gap-3">
          {nodeDefinitions.map((node) => (
            <div
              key={node.type}
              className="p-3 border rounded-md shadow-sm hover:shadow-lg transition-shadow cursor-grab bg-card flex items-start gap-3"
              draggable
              onDragStart={(event) => handleDragStart(event, node.type)}
            >
              <node.icon className={`h-6 w-6 mt-1 shrink-0 ${node.color || 'text-primary'}`} />
              <div>
                <h4 className="font-semibold text-sm text-foreground">{node.label}</h4>
                <p className="text-xs text-muted-foreground">{node.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
