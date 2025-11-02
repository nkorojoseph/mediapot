'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Heart,
  MessageCircle,
  Share,
  Eye,
  Download,
  Calendar,
  Users,
  Globe,
  Target,
} from 'lucide-react';

const weeklyData = [
  {
    day: 'Mon',
    likes: 2400,
    comments: 400,
    shares: 240,
    reach: 8600,
    followers: 1250,
  },
  {
    day: 'Tue',
    likes: 1398,
    comments: 210,
    shares: 180,
    reach: 6200,
    followers: 1275,
  },
  {
    day: 'Wed',
    likes: 9800,
    comments: 890,
    shares: 520,
    reach: 12400,
    followers: 1420,
  },
  {
    day: 'Thu',
    likes: 3908,
    comments: 480,
    shares: 290,
    reach: 9800,
    followers: 1395,
  },
  {
    day: 'Fri',
    likes: 4800,
    comments: 380,
    shares: 310,
    reach: 11200,
    followers: 1456,
  },
  {
    day: 'Sat',
    likes: 3800,
    comments: 430,
    shares: 350,
    reach: 10600,
    followers: 1489,
  },
  {
    day: 'Sun',
    likes: 4300,
    comments: 350,
    shares: 280,
    reach: 9400,
    followers: 1523,
  },
];

const monthlyData = [
  { month: 'Jan', posts: 45, engagement: 2840, reach: 35600, followers: 1200 },
  { month: 'Feb', posts: 52, engagement: 3200, reach: 42300, followers: 1350 },
  { month: 'Mar', posts: 48, engagement: 2950, reach: 38900, followers: 1489 },
  { month: 'Apr', posts: 55, engagement: 3850, reach: 48200, followers: 1623 },
  { month: 'May', posts: 60, engagement: 4200, reach: 52400, followers: 1789 },
  { month: 'Jun', posts: 58, engagement: 4050, reach: 50100, followers: 1856 },
];

const platformData = [
  { platform: 'LinkedIn', followers: 2400, engagement: 3200, color: '#0077B5' },
  { platform: 'Twitter', followers: 1800, engagement: 2100, color: '#1DA1F2' },
  {
    platform: 'Instagram',
    followers: 3200,
    engagement: 4800,
    color: '#E4405F',
  },
  { platform: 'Facebook', followers: 1500, engagement: 1200, color: '#1877F2' },
  { platform: 'TikTok', followers: 980, engagement: 1850, color: '#000000' },
];

const topPosts = [
  {
    id: 1,
    content:
      '🚀 The future of AI in content marketing is here! Our latest report reveals 5 game-changing trends...',
    platform: 'LinkedIn',
    likes: 1245,
    comments: 89,
    shares: 156,
    reach: 8970,
    engagementRate: 12.8,
    publishedAt: '2024-01-14',
  },
  {
    id: 2,
    content:
      '✨ Behind-the-scenes look at our creative process. From brainstorming to final design...',
    platform: 'Instagram',
    likes: 1789,
    comments: 234,
    shares: 111,
    reach: 12400,
    engagementRate: 17.2,
    publishedAt: '2024-01-13',
  },
  {
    id: 3,
    content:
      "📊 Data doesn't lie: 73% of marketers say AI tools have improved their content performance...",
    platform: 'Twitter',
    likes: 856,
    comments: 67,
    shares: 203,
    reach: 6800,
    engagementRate: 16.6,
    publishedAt: '2024-01-12',
  },
];

const audienceData = [
  { age: '18-24', percentage: 15, male: 8, female: 7 },
  { age: '25-34', percentage: 35, male: 18, female: 17 },
  { age: '35-44', percentage: 28, male: 15, female: 13 },
  { age: '45-54', percentage: 16, male: 9, female: 7 },
  { age: '55+', percentage: 6, male: 3, female: 3 },
];

const metrics = [
  {
    title: 'Total Reach',
    value: '124.6K',
    change: '+15.3%',
    isPositive: true,
    icon: Eye,
    color: 'text-blue-600',
  },
  {
    title: 'Engagement Rate',
    value: '8.4%',
    change: '+2.1%',
    isPositive: true,
    icon: Heart,
    color: 'text-red-500',
  },
  {
    title: 'Total Followers',
    value: '45.2K',
    change: '+12.8%',
    isPositive: true,
    icon: Users,
    color: 'text-green-600',
  },
  {
    title: 'Posts Published',
    value: '128',
    change: '-3.2%',
    isPositive: false,
    icon: BarChart3,
    color: 'text-purple-600',
  },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('7d');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track your social media performance and engagement metrics
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric) => {
          let bgColor = '';
          if (metric.title === 'Total Reach') bgColor = 'bg-blue-100 dark:bg-blue-900';
          if (metric.title === 'Engagement Rate') bgColor = 'bg-red-100 dark:bg-red-900';
          if (metric.title === 'Total Followers') bgColor = 'bg-green-100 dark:bg-green-900';
          if (metric.title === 'Posts Published') bgColor = 'bg-purple-100 dark:bg-purple-900';
          return (
            <Card key={metric.title} className={bgColor}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-3xl font-bold">{metric.value}</p>
                    <p
                      className={`text-sm flex items-center gap-1 ${
                        metric.isPositive ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {metric.isPositive ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {metric.change}
                    </p>
                  </div>
                  <metric.icon className={`h-8 w-8 ${metric.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Engagement Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="likes" fill="#2563eb" name="Likes" />
                    <Bar dataKey="comments" fill="#38bdf8" name="Comments" />
                    <Bar dataKey="shares" fill="#6366f1" name="Shares" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reach & Followers</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="reach"
                      stroke="hsl(var(--chart-4))"
                      strokeWidth={2}
                      name="Reach"
                    />
                    <Line
                      type="monotone"
                      dataKey="followers"
                      stroke="hsl(var(--chart-5))"
                      strokeWidth={2}
                      name="Followers"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="engagement"
                    stackId="1"
                    stroke="#6366f1"
                    fill="#6366f1"
                    name="Engagement"
                  />
                  <Area
                    type="monotone"
                    dataKey="reach"
                    stackId="2"
                    stroke="#2563eb"
                    fill="#2563eb"
                    name="Reach"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Engagement by Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="likes"
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={2}
                      name="Likes"
                    />
                    <Line
                      type="monotone"
                      dataKey="comments"
                      stroke="hsl(var(--chart-2))"
                      strokeWidth={2}
                      name="Comments"
                    />
                    <Line
                      type="monotone"
                      dataKey="shares"
                      stroke="hsl(var(--chart-3))"
                      strokeWidth={2}
                      name="Shares"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPosts.map((post, index) => (
                    <div key={post.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="secondary" className="mb-2">
                          #{index + 1}
                        </Badge>
                        <Badge variant="outline">{post.platform}</Badge>
                      </div>
                      <p className="text-sm line-clamp-2 mb-3">{post.content}</p>
                      <div className="grid grid-cols-4 gap-2 text-xs text-center">
                        <div>
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Heart className="h-3 w-3" />
                          </div>
                          <div className="font-medium">{post.likes}</div>
                        </div>
                        <div>
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <MessageCircle className="h-3 w-3" />
                          </div>
                          <div className="font-medium">{post.comments}</div>
                        </div>
                        <div>
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Share className="h-3 w-3" />
                          </div>
                          <div className="font-medium">{post.shares}</div>
                        </div>
                        <div>
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Target className="h-3 w-3" />
                          </div>
                          <div className="font-medium">{post.engagementRate}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audience" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Audience Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={audienceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="male" fill="hsl(var(--chart-1))" name="Male" />
                    <Bar dataKey="female" fill="hsl(var(--chart-2))" name="Female" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Follower Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="followers"
                      stroke="hsl(var(--chart-3))"
                      strokeWidth={3}
                      name="Followers"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <Globe className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold">124</div>
                <div className="text-sm text-muted-foreground">Countries Reached</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold">68%</div>
                <div className="text-sm text-muted-foreground">Returning Visitors</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold">3.2</div>
                <div className="text-sm text-muted-foreground">Avg. Session Duration</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Performance by Type</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: 'Text Posts',
                          value: 45,
                          fill: 'hsl(var(--chart-1))',
                        },
                        {
                          name: 'Images',
                          value: 30,
                          fill: 'hsl(var(--chart-2))',
                        },
                        {
                          name: 'Videos',
                          value: 20,
                          fill: 'hsl(var(--chart-3))',
                        },
                        {
                          name: 'Carousels',
                          value: 5,
                          fill: 'hsl(var(--chart-4))',
                        },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    ></Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Best Posting Times</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-7 gap-1 text-xs text-center">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                      <div key={day} className="font-medium p-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  {['9AM', '12PM', '3PM', '6PM', '9PM'].map((time) => (
                    <div key={time} className="grid grid-cols-8 gap-1 items-center">
                      <div className="text-xs font-medium">{time}</div>
                      {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                        <div
                          key={day}
                          className={`h-8 rounded ${
                            Math.random() > 0.5
                              ? 'bg-green-200'
                              : Math.random() > 0.3
                              ? 'bg-yellow-200'
                              : 'bg-red-200'
                          }`}
                        />
                      ))}
                    </div>
                  ))}
                  <div className="flex items-center gap-4 text-xs mt-4">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-200 rounded"></div>
                      <span>High engagement</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-yellow-200 rounded"></div>
                      <span>Medium engagement</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-red-200 rounded"></div>
                      <span>Low engagement</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={platformData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="followers"
                      label={({ platform, percent }) =>
                        `${platform} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={platformData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="platform" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="followers" fill="hsl(var(--chart-1))" name="Followers" />
                    <Bar dataKey="engagement" fill="hsl(var(--chart-2))" name="Engagement" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {platformData.map((platform) => (
              <Card key={platform.platform}>
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-semibold mb-1">{platform.platform}</div>
                  <div className="text-2xl font-bold mb-1" style={{ color: platform.color }}>
                    {platform.followers.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">followers</div>
                  <div className="text-lg font-medium mt-2">
                    {platform.engagement.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">total engagement</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
