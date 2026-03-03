import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/ui/tabs";
import { Switch } from "@/shared/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Separator } from "@/shared/ui/separator";
import { Badge } from "@/shared/ui/badge";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import {
  Settings,
  User,
  SlidersHorizontal,
  Bell,
  Sun,
  Moon,
  Monitor,
  PanelLeftClose,
  PanelLeft,
  Command,
  FileJson,
  FileSpreadsheet,
  Save,
  CheckCircle2,
} from "lucide-react";

// ---------------------------------------------------------------------------
// localStorage helpers with prefix
// ---------------------------------------------------------------------------

const STORAGE_PREFIX = "int-explorer-settings-";

function loadSetting<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function saveSetting<T>(key: string, value: T): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch {
    // silently ignore quota errors
  }
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ProfileState {
  displayName: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer";
}

interface PreferencesState {
  theme: "system" | "light" | "dark";
  sidebarDefault: "expanded" | "collapsed";
  exportFormat: "csv" | "json";
}

interface NotificationsState {
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyDigest: boolean;
  platformUpdates: boolean;
}

// ---------------------------------------------------------------------------
// Default values
// ---------------------------------------------------------------------------

const defaultProfile: ProfileState = {
  displayName: "Platform Admin",
  email: "admin@int-explorer.io",
  role: "Admin",
};

const defaultPreferences: PreferencesState = {
  theme: "system",
  sidebarDefault: "expanded",
  exportFormat: "json",
};

const defaultNotifications: NotificationsState = {
  emailNotifications: true,
  pushNotifications: false,
  weeklyDigest: true,
  platformUpdates: true,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SettingsTab() {
  // Profile state
  const [profile, setProfile] = useState<ProfileState>(() =>
    loadSetting("profile", defaultProfile),
  );

  // Preferences state
  const [preferences, setPreferences] = useState<PreferencesState>(() =>
    loadSetting("preferences", defaultPreferences),
  );

  // Notifications state
  const [notifications, setNotifications] = useState<NotificationsState>(() =>
    loadSetting("notifications", defaultNotifications),
  );

  // Save-feedback flag (brief visual confirmation)
  const [saved, setSaved] = useState(false);

  // Persist whenever state changes
  useEffect(() => {
    saveSetting("profile", profile);
  }, [profile]);

  useEffect(() => {
    saveSetting("preferences", preferences);
  }, [preferences]);

  useEffect(() => {
    saveSetting("notifications", notifications);
  }, [notifications]);

  const showSaved = useCallback(() => {
    setSaved(true);
    const t = setTimeout(() => setSaved(false), 1500);
    return () => clearTimeout(t);
  }, []);

  // -----------------------------------------------------------------------
  // Profile helpers
  // -----------------------------------------------------------------------
  const updateProfile = useCallback(
    <K extends keyof ProfileState>(key: K, value: ProfileState[K]) => {
      setProfile((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  // -----------------------------------------------------------------------
  // Preference helpers
  // -----------------------------------------------------------------------
  const updatePreferences = useCallback(
    <K extends keyof PreferencesState>(key: K, value: PreferencesState[K]) => {
      setPreferences((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  // -----------------------------------------------------------------------
  // Notification helpers
  // -----------------------------------------------------------------------
  const updateNotifications = useCallback(
    <K extends keyof NotificationsState>(key: K, value: NotificationsState[K]) => {
      setNotifications((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  // -----------------------------------------------------------------------
  // Initials for avatar
  // -----------------------------------------------------------------------
  const initials = profile.displayName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------
  return (
    <div className="space-y-8 max-w-4xl mx-auto" data-testid="settings-tab">
      {/* Page header */}
      <div className="flex flex-col items-center text-center gap-3">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-500 to-slate-700 text-white shadow-lg shadow-slate-500/25">
          <Settings className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1 max-w-2xl mx-auto">
            Manage your profile, preferences and notification settings.
          </p>
        </div>
      </div>

      {/* Tabs container */}
      <Tabs defaultValue="profile" className="w-full" data-testid="settings-tabs">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="gap-1.5" data-testid="settings-tab-profile">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="preferences" className="gap-1.5" data-testid="settings-tab-preferences">
            <SlidersHorizontal className="w-4 h-4" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1.5" data-testid="settings-tab-notifications">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* ================================================================ */}
        {/* Profile Tab                                                       */}
        {/* ================================================================ */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Public Profile</CardTitle>
              <CardDescription>
                This information is stored locally and used across the explorer.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar placeholder */}
              <div className="flex items-center gap-5">
                <Avatar className="h-16 w-16 text-lg" data-testid="settings-avatar">
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{profile.displayName}</p>
                  <p className="text-sm text-muted-foreground">{profile.email}</p>
                </div>
              </div>

              <Separator />

              {/* Display name */}
              <div className="grid gap-2">
                <Label htmlFor="settings-display-name">Display Name</Label>
                <Input
                  id="settings-display-name"
                  value={profile.displayName}
                  onChange={(e) => updateProfile("displayName", e.target.value)}
                  placeholder="Your display name"
                  data-testid="input-display-name"
                />
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="settings-email">Email</Label>
                <Input
                  id="settings-email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => updateProfile("email", e.target.value)}
                  placeholder="your@email.com"
                  data-testid="input-email"
                />
              </div>

              {/* Role */}
              <div className="grid gap-2">
                <Label htmlFor="settings-role">Role</Label>
                <Select
                  value={profile.role}
                  onValueChange={(v) =>
                    updateProfile("role", v as ProfileState["role"])
                  }
                >
                  <SelectTrigger id="settings-role" data-testid="select-role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Editor">Editor</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="justify-end border-t pt-6">
              <Button size="sm" className="gap-1.5" onClick={showSaved} data-testid="button-save-profile">
                {saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                {saved ? "Saved" : "Save Profile"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* ================================================================ */}
        {/* Preferences Tab                                                   */}
        {/* ================================================================ */}
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Customize appearance and default behaviours.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Theme toggle */}
              <div className="space-y-3">
                <Label>Theme</Label>
                <div className="flex gap-2" data-testid="preference-theme">
                  {(
                    [
                      { value: "system", icon: Monitor, label: "System" },
                      { value: "light", icon: Sun, label: "Light" },
                      { value: "dark", icon: Moon, label: "Dark" },
                    ] as const
                  ).map((opt) => {
                    const Icon = opt.icon;
                    const active = preferences.theme === opt.value;
                    return (
                      <Button
                        key={opt.value}
                        variant={active ? "default" : "outline"}
                        size="sm"
                        className="gap-1.5"
                        onClick={() => updatePreferences("theme", opt.value)}
                        data-testid={`theme-${opt.value}`}
                      >
                        <Icon className="w-4 h-4" />
                        {opt.label}
                      </Button>
                    );
                  })}
                </div>
              </div>

              <Separator />

              {/* Sidebar default */}
              <div className="space-y-3">
                <Label>Sidebar Default State</Label>
                <div className="flex gap-2" data-testid="preference-sidebar">
                  {(
                    [
                      { value: "expanded", icon: PanelLeft, label: "Expanded" },
                      { value: "collapsed", icon: PanelLeftClose, label: "Collapsed" },
                    ] as const
                  ).map((opt) => {
                    const Icon = opt.icon;
                    const active = preferences.sidebarDefault === opt.value;
                    return (
                      <Button
                        key={opt.value}
                        variant={active ? "default" : "outline"}
                        size="sm"
                        className="gap-1.5"
                        onClick={() => updatePreferences("sidebarDefault", opt.value)}
                        data-testid={`sidebar-${opt.value}`}
                      >
                        <Icon className="w-4 h-4" />
                        {opt.label}
                      </Button>
                    );
                  })}
                </div>
              </div>

              <Separator />

              {/* Command palette shortcut display */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Command Palette Shortcut</Label>
                  <p className="text-sm text-muted-foreground">
                    Open the command palette quickly from anywhere.
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="gap-1 font-mono text-xs px-3 py-1"
                  data-testid="shortcut-display"
                >
                  <Command className="w-3 h-3" />K
                </Badge>
              </div>

              <Separator />

              {/* Export format */}
              <div className="space-y-3">
                <Label>Default Data Export Format</Label>
                <div className="flex gap-2" data-testid="preference-export-format">
                  {(
                    [
                      { value: "csv", icon: FileSpreadsheet, label: "CSV" },
                      { value: "json", icon: FileJson, label: "JSON" },
                    ] as const
                  ).map((opt) => {
                    const Icon = opt.icon;
                    const active = preferences.exportFormat === opt.value;
                    return (
                      <Button
                        key={opt.value}
                        variant={active ? "default" : "outline"}
                        size="sm"
                        className="gap-1.5"
                        onClick={() => updatePreferences("exportFormat", opt.value)}
                        data-testid={`export-${opt.value}`}
                      >
                        <Icon className="w-4 h-4" />
                        {opt.label}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================================================================ */}
        {/* Notifications Tab                                                 */}
        {/* ================================================================ */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Choose how and when you want to be notified.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email notifications */}
              <div className="flex items-center justify-between" data-testid="notif-email">
                <div className="space-y-0.5">
                  <Label htmlFor="notif-email-switch">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive important updates and alerts via email.
                  </p>
                </div>
                <Switch
                  id="notif-email-switch"
                  checked={notifications.emailNotifications}
                  onCheckedChange={(v) => updateNotifications("emailNotifications", v)}
                  data-testid="switch-email-notifications"
                />
              </div>

              <Separator />

              {/* Push notifications */}
              <div className="flex items-center justify-between" data-testid="notif-push">
                <div className="space-y-0.5">
                  <Label htmlFor="notif-push-switch">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Get real-time browser push notifications.
                  </p>
                </div>
                <Switch
                  id="notif-push-switch"
                  checked={notifications.pushNotifications}
                  onCheckedChange={(v) => updateNotifications("pushNotifications", v)}
                  data-testid="switch-push-notifications"
                />
              </div>

              <Separator />

              {/* Weekly digest */}
              <div className="flex items-center justify-between" data-testid="notif-digest">
                <div className="space-y-0.5">
                  <Label htmlFor="notif-digest-switch">Weekly Digest</Label>
                  <p className="text-sm text-muted-foreground">
                    A summary of platform activity delivered every Monday.
                  </p>
                </div>
                <Switch
                  id="notif-digest-switch"
                  checked={notifications.weeklyDigest}
                  onCheckedChange={(v) => updateNotifications("weeklyDigest", v)}
                  data-testid="switch-weekly-digest"
                />
              </div>

              <Separator />

              {/* Platform updates */}
              <div className="flex items-center justify-between" data-testid="notif-updates">
                <div className="space-y-0.5">
                  <Label htmlFor="notif-updates-switch">Platform Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Be notified when platforms add new features or change pricing.
                  </p>
                </div>
                <Switch
                  id="notif-updates-switch"
                  checked={notifications.platformUpdates}
                  onCheckedChange={(v) => updateNotifications("platformUpdates", v)}
                  data-testid="switch-platform-updates"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
