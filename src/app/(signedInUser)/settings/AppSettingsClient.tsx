'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  User,
  Bell,
  Shield,
  Palette,
  Link,
  Users,
  CreditCard,
  Download,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  Plus,
  X,
} from 'lucide-react';
// Server-side data must be fetched via an API route or server components.
// Prisma cannot run in the browser — remove direct client import.

type ConnectedAccount = {
  platform: string;
  username: string;
  status: string;
  color: string;
};

type TeamMember = {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  status: string;
};

type NotificationSetting = {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
};

const connectedAccounts: ConnectedAccount[] = [];

const teamMembers: TeamMember[] = [];

const notificationSettings: NotificationSetting[] = [];

type AppSettingsClientProps = {
  initialData: {
    appSettings: {
      connectedAccounts?: ConnectedAccount[];
      teamMembers?: TeamMember[];
      notificationSettings?: NotificationSetting[];
    };
    facebookStatus?: {
      connected: boolean;
      page?: { id?: string; name?: string };
    };
  };
};

export default function AppSettingsClient({ initialData }: AppSettingsClientProps) {
  const [connectedAccounts, setConnectedAccountsState] = useState(
    initialData.appSettings.connectedAccounts
  );
  console.log('Initial data in AppSettingsClient:', connectedAccounts);
  const [facebookStatus, setFacebookStatus] = useState(initialData.facebookStatus);

  const [activeTab, setActiveTab] = useState('profile');
  const [showApiKey, setShowApiKey] = useState(false);
  const [notifications, setNotifications] = useState(notificationSettings);

  const toggleNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, enabled: !notification.enabled } : notification
      )
    );
  };

  // initialize with safe defaults so .map calls won't fail before fetch completes

  const [teamMembersState, setTeamMembersState] = useState<typeof teamMembers>(teamMembers);

  useEffect(() => {
    // Fetch app settings from server via API route (Prisma runs server-side there)
    // async function fetchData() {
    //   try {
    //     const res = await fetch('/api/app-settings');
    //     if (!res.ok) {
    //       console.error('Failed to load app settings', res.status);
    //       return;
    //     }
    //     const appSettings = await res.json();
    //     // API returns an object keyed by setting name; guard if keys are missing
    //     setConnectedAccountsState(appSettings.connectedAccounts ?? connectedAccounts);
    //     setTeamMembersState(appSettings.teamMembers ?? teamMembers);
    //     // map fetched notification settings into the UI notification state
    //     if (appSettings.notificationSettings) {
    //       setNotifications(appSettings.notificationSettings);
    //     }
    //   } catch (err) {
    //     console.error('Failed to fetch app settings', err);
    //   }
    // }
    // fetchData();

    let mounted = true;
    async function fetchStatus() {
      try {
        const res = await fetch('/api/facebook/status');
        if (!res.ok) return;
        const data = await res.json();
        if (mounted) setFacebookStatus(data);
      } catch (err) {
        console.error('Failed to fetch facebook status', err);
      }
    }
    fetchStatus();
    return () => {
      mounted = false;
    };
  }, []);

  const handleDisconnect = async () => {
    try {
      await fetch('/api/facebook/disconnect', { method: 'POST' });
      // refresh status
      const res = await fetch('/api/facebook/status');
      if (res.ok) setFacebookStatus(await res.json());
    } catch (err) {
      console.error('Failed to disconnect facebook', err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account, preferences, and integrations
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Photo
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@company.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input id="title" defaultValue="Marketing Manager" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" defaultValue="Tech Innovations Inc." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="est">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="est">Eastern Time (EST)</SelectItem>
                      <SelectItem value="cst">Central Time (CST)</SelectItem>
                      <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                      <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button>Save Changes</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Brand Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="brandName">Brand Name</Label>
                  <Input id="brandName" defaultValue="SocialCraft" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brandVoice">Brand Voice</Label>
                  <Select defaultValue="professional">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual & Friendly</SelectItem>
                      <SelectItem value="authoritative">Authoritative</SelectItem>
                      <SelectItem value="playful">Playful & Creative</SelectItem>
                      <SelectItem value="inspirational">Inspirational</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brandDescription">Brand Description</Label>
                  <Textarea
                    id="brandDescription"
                    placeholder="Describe your brand voice, tone, and messaging guidelines..."
                    defaultValue="Innovative AI-powered content creation platform that helps marketers create engaging social media content efficiently."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultHashtags">Default Hashtags</Label>
                  <Input
                    id="defaultHashtags"
                    placeholder="#brand #marketing #content"
                    defaultValue="#SocialCraft #AIContent #MarketingTech"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brandColors">Brand Colors</Label>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-600 rounded border"></div>
                      <Input className="w-20" defaultValue="#2563EB" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-600 rounded border"></div>
                      <Input className="w-20" defaultValue="#16A34A" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-600 rounded border"></div>
                      <Input className="w-20" defaultValue="#9333EA" />
                    </div>
                  </div>
                </div>

                <Button>Update Brand Settings</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-start justify-between py-3">
                  <div className="space-y-1">
                    <div className="font-medium">{notification.label}</div>
                    <div className="text-sm text-muted-foreground">{notification.description}</div>
                  </div>
                  <Switch
                    checked={notification.enabled}
                    onCheckedChange={() => toggleNotification(notification.id)}
                  />
                </div>
              ))}

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Notification Methods</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Email Notifications</div>
                      <div className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Push Notifications</div>
                      <div className="text-sm text-muted-foreground">
                        Browser push notifications
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Weekly Digest</div>
                      <div className="text-sm text-muted-foreground">
                        Weekly summary of your content performance
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <Button>Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="h-5 w-5" />
                Social Media Accounts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {connectedAccounts?.map((account) => {
                  // compute status class without nested ternary
                  let statusClass = 'text-gray-600';
                  if (account.status === 'Connected') statusClass = 'text-green-600';
                  else if (account.status === 'Expired') statusClass = 'text-red-600';

                  // compute action buttons
                  let actionButtons = null;
                  if (account.platform === 'Facebook') {
                    // use live status from server when available
                    const connected = facebookStatus?.connected === true;
                    const pageName = facebookStatus?.page?.name;

                    if (connected) {
                      account.status = 'Connected';
                      actionButtons = (
                        <>
                          <Button size="sm" variant="outline">
                            Refresh
                          </Button>
                          <Button size="sm" variant="destructive" onClick={handleDisconnect}>
                            Disconnect
                          </Button>
                        </>
                      );
                    } else {
                      actionButtons = (
                        <Button
                          size="sm"
                          onClick={() => (globalThis.location.href = '/api/facebook/connect')}
                        >
                          Connect
                        </Button>
                      );
                    }

                    // override username to show connected page name when available
                    if (pageName) account.username = pageName;
                  } else {
                    // non-Facebook platforms use the static account.status
                    const status = account.status;
                    if (status === 'Connected') {
                      actionButtons = (
                        <>
                          <Button size="sm" variant="outline">
                            Refresh
                          </Button>
                          <Button size="sm" variant="destructive">
                            Disconnect
                          </Button>
                        </>
                      );
                    } else if (status === 'Expired') {
                      actionButtons = <Button size="sm">Reconnect</Button>;
                    } else {
                      actionButtons = <Button size="sm">Connect</Button>;
                    }
                  }

                  return (
                    <div
                      key={account.platform}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Badge className={`${account.color} text-white`}>{account.platform}</Badge>
                        <div>
                          <div className="font-medium">{account.username}</div>
                          <div className="text-sm text-muted-foreground">
                            Status: <span className={statusClass}> {account.status}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">{actionButtons}</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="apiKey"
                    type={showApiKey ? 'text' : 'password'}
                    defaultValue="sk-1234567890abcdef..."
                    readOnly
                  />
                  <Button variant="outline" size="icon" onClick={() => setShowApiKey(!showApiKey)}>
                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline">Regenerate</Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Use this API key to integrate with external services
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhookUrl">Webhook URL</Label>
                <Input
                  id="webhookUrl"
                  placeholder="https://your-app.com/webhook"
                  defaultValue="https://your-app.com/socialcraft-webhook"
                />
                <p className="text-sm text-muted-foreground">
                  Receive notifications about post publishing and engagement
                </p>
              </div>

              <Button>Save API Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Members
                </CardTitle>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Invite Member
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembersState.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>{member.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.email}</div>
                      </div>
                      <Badge variant={member.status === 'Active' ? 'default' : 'secondary'}>
                        {member.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select defaultValue={member.role.toLowerCase()}>
                        <SelectTrigger className="w-[100px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button size="icon" variant="ghost">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4 text-sm font-medium">
                  <div>Permission</div>
                  <div className="text-center">Admin</div>
                  <div className="text-center">Editor</div>
                  <div className="text-center">Viewer</div>
                </div>
                <Separator />
                {[
                  'Create and edit posts',
                  'Schedule content',
                  'Delete posts',
                  'Manage team members',
                  'Access analytics',
                  'Change settings',
                  'Export data',
                ].map((permission) => (
                  <div key={permission} className="grid grid-cols-4 gap-4 text-sm">
                    <div>{permission}</div>
                    <div className="text-center">✓</div>
                    <div className="text-center">
                      {permission.includes('team') || permission.includes('settings') ? '✗' : '✓'}
                    </div>
                    <div className="text-center">
                      {permission.includes('Create') ||
                      permission.includes('Delete') ||
                      permission.includes('Schedule')
                        ? '✗'
                        : '✓'}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Subscription Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <div className="font-semibold">Pro Plan</div>
                  <div className="text-sm text-muted-foreground">
                    $29/month • Next billing: Feb 15, 2024
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Change Plan</Button>
                  <Button variant="destructive">Cancel</Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">5</div>
                  <div className="text-sm text-muted-foreground">Connected Accounts</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">128</div>
                  <div className="text-sm text-muted-foreground">Posts This Month</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-muted-foreground">Team Members</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                    VISA
                  </div>
                  <div>
                    <div className="font-medium">•••• •••• •••• 4242</div>
                    <div className="text-sm text-muted-foreground">Expires 12/25</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive">
                    Remove
                  </Button>
                </div>
              </div>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Payment Method
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: 'Jan 15, 2024', amount: '$29.00', status: 'Paid' },
                  { date: 'Dec 15, 2023', amount: '$29.00', status: 'Paid' },
                  { date: 'Nov 15, 2023', amount: '$29.00', status: 'Paid' },
                ].map((invoice) => (
                  <div
                    key={`${invoice.date}-${invoice.amount}`}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{invoice.date}</div>
                      <div className="text-sm text-muted-foreground">Pro Plan</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{invoice.amount}</div>
                      <Badge variant="outline">{invoice.status}</Badge>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button>Update Password</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Authenticator App</div>
                  <div className="text-sm text-muted-foreground">
                    Use an authenticator app to generate security codes
                  </div>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">SMS Authentication</div>
                  <div className="text-sm text-muted-foreground">
                    Receive security codes via SMS
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    device: 'MacBook Pro',
                    location: 'New York, NY',
                    lastActive: '2 minutes ago',
                    current: true,
                  },
                  {
                    device: 'iPhone 14',
                    location: 'New York, NY',
                    lastActive: '1 hour ago',
                    current: false,
                  },
                  {
                    device: 'iPad Pro',
                    location: 'Boston, MA',
                    lastActive: '2 days ago',
                    current: false,
                  },
                ].map((session) => (
                  <div
                    key={`${session.device}-${session.lastActive}`}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {session.device}
                        {session.current && <Badge variant="secondary">Current</Badge>}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {session.location} • Last active {session.lastActive}
                      </div>
                    </div>
                    {!session.current && (
                      <Button size="sm" variant="destructive">
                        Revoke
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data & Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Export All Data
              </Button>
              <Button variant="destructive" className="w-full">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
              <p className="text-sm text-muted-foreground">
                Warning: Deleting your account will permanently remove all your data and cannot be
                undone.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
