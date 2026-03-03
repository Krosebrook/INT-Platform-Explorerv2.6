import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/api/queryClient";
import { TooltipProvider } from "@/shared/ui/tooltip";
import { SidebarProvider } from "@/shared/ui/sidebar";
import { Toaster } from "@/shared/ui/toaster";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider>
          {children}
          <Toaster />
        </SidebarProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
