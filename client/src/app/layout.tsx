import type { ReactNode } from "react";
import { SidebarNav } from "@/widgets/sidebar-nav";
import { SidebarInset, SidebarTrigger } from "@/shared/ui/sidebar";
import { ThemeToggle } from "@/features/theme-toggle";
import { Button } from "@/shared/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { ErrorBoundary } from "@/shared/ui/error-boundary";
import { SkipLink } from "@/shared/ui/skip-link";
import { CommandPalette } from "@/widgets/command-palette";
import { useAuth } from "@/entities/user/use-auth";
import { Sparkles, LogIn, LogOut, User } from "lucide-react";
import sunsetBackground from "@assets/generated_images/sunset_landscape_with_orange_sun.png";

interface AppLayoutProps {
  selectedPlatforms: string[];
  children: ReactNode;
}

export function AppLayout({ selectedPlatforms, children }: AppLayoutProps) {
  const { user, isLoading, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen relative">
      <SkipLink />
      <CommandPalette />

      {/* Fixed Background Image */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${sunsetBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(8,14,28,0.75)] via-[rgba(20,28,50,0.70)] to-[rgba(54,32,8,0.65)]" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex min-h-screen">
        <SidebarNav />

        <SidebarInset className="flex flex-col flex-1">
          {/* Header */}
          <header className="sticky top-0 z-50 w-full border-b bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/75">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="-ml-1" />
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-bold text-lg leading-tight" data-testid="text-app-title">
                    INT Platform Explorer
                  </h1>
                  <p className="text-xs text-muted-foreground font-mono">v4.0</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {selectedPlatforms.length > 0 && (
                  <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full font-mono">
                    {selectedPlatforms.length}/4 comparing
                  </span>
                )}
                <ThemeToggle />

                {isLoading ? (
                  <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
                ) : isAuthenticated && user ? (
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={user.profileImageUrl || undefined}
                        alt={user.firstName || "User"}
                      />
                      <AvatarFallback>
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <a href="/api/logout" data-testid="button-logout">
                      <Button variant="ghost" size="icon" className="text-[#000000]">
                        <LogOut className="w-4 h-4" />
                      </Button>
                    </a>
                  </div>
                ) : (
                  <a href="/api/login" data-testid="button-login">
                    <Button variant="outline" size="sm" className="text-[#fac78e]">
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-6 py-8" tabIndex={-1}>
            <ErrorBoundary>{children}</ErrorBoundary>
          </main>

          {/* Footer */}
          <footer className="border-t bg-background/85 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">INT Platform Explorer</p>
                    <p className="text-xs text-muted-foreground">Powered by INT Inc.</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
                  <span>50 Platforms</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                  <span>8 Ecosystems</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                  <span>20 Dimensions</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                  <span>72 Personas</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  &copy; {new Date().getFullYear()} INT Inc. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </SidebarInset>
      </div>
    </div>
  );
}
