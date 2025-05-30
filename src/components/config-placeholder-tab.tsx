
"use client";

import React from 'react';
import { Settings2 } from 'lucide-react';

export function ConfigPlaceholderTab() {
  return (
    <div className="p-4 h-full flex flex-col items-center justify-center text-center">
      <Settings2 className="h-16 w-16 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold text-muted-foreground">Configuration Panel</h3>
      <p className="text-sm text-muted-foreground">
        Select a node on the canvas to view and edit its parameters here.
      </p>
      <p className="text-xs text-muted-foreground mt-2">
        (This area is a placeholder for node-specific settings.)
      </p>
    </div>
  );
}
