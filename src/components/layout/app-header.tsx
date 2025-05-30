
import { Share2 } from 'lucide-react'; // Using Share2 as a placeholder logo icon

export function AppHeader() {
  return (
    <header className="flex items-center justify-between p-4 border-b border-sidebar-border bg-background shadow-md h-16">
      <div className="flex items-center gap-2">
        <Share2 className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-semibold text-foreground">FlowForge</h1>
      </div>
      {/* Placeholder for user profile or other actions */}
      <div>
        {/* <UserNav /> */}
      </div>
    </header>
  );
}
