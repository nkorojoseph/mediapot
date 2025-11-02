'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const scheduledPosts = [
  {
    id: 1,
    title: 'AI Content Marketing Trends',
    content:
      '🚀 Exciting news! Our new AI-powered content tool is launching next week. Get ready to transform your social media strategy...',
    platform: 'LinkedIn',
    scheduledFor: '2024-01-15T09:00:00',
    status: 'Scheduled',
    type: 'post',
    tags: ['AI', 'Marketing', 'Product Launch'],
  },
  {
    id: 2,
    title: 'Monday Motivation',
    content:
      '📈 Monday Motivation: The key to success in content marketing is consistency. Here are 5 tips to maintain your posting schedule...',
    platform: 'Twitter',
    scheduledFor: '2024-01-15T08:00:00',
    status: 'Scheduled',
    type: 'post',
    tags: ['Motivation', 'Tips'],
  },
  {
    id: 3,
    title: 'Behind the Scenes Video',
    content:
      '✨ Behind the scenes: How our team creates engaging visual content that converts. Swipe to see our creative process!',
    platform: 'Instagram',
    scheduledFor: '2024-01-15T14:00:00',
    status: 'Scheduled',
    type: 'video',
    tags: ['BTS', 'Creative Process'],
  },
  {
    id: 4,
    title: 'Weekly Blog Post',
    content:
      "🎯 Quick tip: Use storytelling in your posts to increase engagement by up to 300%. Here's how to craft compelling narratives...",
    platform: 'Facebook',
    scheduledFor: '2024-01-16T10:30:00',
    status: 'Scheduled',
    type: 'post',
    tags: ['Storytelling', 'Tips'],
  },
  {
    id: 5,
    title: 'Industry Insights',
    content:
      "💡 Industry insight: The future of social media marketing lies in authentic connections. What's your strategy for building genuine relationships?",
    platform: 'LinkedIn',
    scheduledFor: '2024-01-16T15:00:00',
    status: 'Scheduled',
    type: 'post',
    tags: ['Industry', 'Insights'],
  },
  {
    id: 6,
    title: 'Product Demo',
    content:
      '🔥 New feature demo: See how our latest update saves content creators 2+ hours per week...',
    platform: 'YouTube',
    scheduledFor: '2024-01-17T12:00:00',
    status: 'Scheduled',
    type: 'video',
    tags: ['Product', 'Demo'],
  },
  {
    id: 7,
    title: 'Customer Success Story',
    content:
      '🌟 Customer spotlight: How @CustomerName increased their engagement by 150% using our platform...',
    platform: 'LinkedIn',
    scheduledFor: '2024-01-18T11:00:00',
    status: 'Scheduled',
    type: 'post',
    tags: ['Customer Success', 'Case Study'],
  },
  {
    id: 8,
    title: 'Weekend Inspiration',
    content:
      "☀️ Weekend vibes: Take time to recharge and find inspiration for next week's content...",
    platform: 'Instagram',
    scheduledFor: '2024-01-20T16:00:00',
    status: 'Scheduled',
    type: 'image',
    tags: ['Weekend', 'Inspiration'],
  },
];

const platformColors = {
  LinkedIn: 'bg-blue-700',
  Twitter: 'bg-blue-500',
  Instagram: 'bg-pink-500',
  Facebook: 'bg-blue-600',
  YouTube: 'bg-red-500',
  TikTok: 'bg-black',
};

const typeColors = {
  post: 'bg-green-500',
  video: 'bg-purple-500',
  image: 'bg-yellow-500',
  story: 'bg-orange-500',
};

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const filteredPosts = scheduledPosts.filter((post) => {
    if (selectedPlatform === 'all') return true;
    return post.platform.toLowerCase() === selectedPlatform;
  });

  const getPostsForDate = (date: Date) => {
    return filteredPosts.filter((post) => {
      const postDate = new Date(post.scheduledFor);
      return postDate.toDateString() === date.toDateString();
    });
  };

  const getPostsForSelectedDate = () => {
    if (!selectedDate) return [];
    return getPostsForDate(selectedDate);
  };

  const generateCalendarGrid = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - firstDay.getDay());

    const days = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      // 6 weeks
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  };

  const calendarDays = generateCalendarGrid();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Content Calendar</h1>
          <p className="text-muted-foreground">
            Plan, schedule, and manage your social media content
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
            </SelectContent>
          </Select>
          <Select value={viewMode} onValueChange={setViewMode}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Schedule Post
          </Button>
        </div>
      </div>

      <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="month">Month View</TabsTrigger>
          <TabsTrigger value="week">Week View</TabsTrigger>
          <TabsTrigger value="day">Day View</TabsTrigger>
        </TabsList>

        <TabsContent value="month" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Calendar Grid */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5" />
                      {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          setCurrentMonth(
                            new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
                          )
                        }
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          setCurrentMonth(
                            new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
                          )
                        }
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div
                        key={day}
                        className="p-2 text-center font-medium text-sm text-muted-foreground"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((date, index) => {
                      const postsForDay = getPostsForDate(date);
                      const isSelected = selectedDate?.toDateString() === date.toDateString();

                      return (
                        <div
                          key={index}
                          className={`
                            min-h-[100px] p-2 border rounded-lg cursor-pointer transition-colors
                            hover:bg-blue-50 dark:hover:bg-blue-900/40
                            ${isToday(date) ? 'bg-blue-100 dark:bg-blue-900 border-blue-500' : ''}
                            ${isSelected ? 'ring-2 ring-blue-500' : ''}
                            ${!isCurrentMonth(date) ? 'opacity-50' : ''}
                          `}
                          onClick={() => setSelectedDate(date)}
                        >
                          <div
                            className={`text-sm font-medium mb-1 ${
                              isToday(date) ? 'text-blue-700 dark:text-blue-300' : ''
                            } ${isSelected ? 'text-blue-900 dark:text-blue-100 font-bold' : ''}`}
                          >
                            {date.getDate()}
                          </div>
                          <div className="space-y-1">
                            {postsForDay.slice(0, 3).map((post) => (
                              <div
                                key={post.id}
                                className={`text-xs p-1 rounded text-white truncate ${
                                  platformColors[post.platform as keyof typeof platformColors]
                                }`}
                                title={post.title}
                              >
                                {new Date(post.scheduledFor).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}{' '}
                                - {post.title.slice(0, 15)}...
                              </div>
                            ))}
                            {postsForDay.length > 3 && (
                              <div className="text-xs text-muted-foreground">
                                +{postsForDay.length - 3} more
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Selected Date Details */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {selectedDate?.toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {getPostsForSelectedDate().length === 0 ? (
                      <div className="text-center py-4">
                        <CalendarIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">No posts scheduled</p>
                        <Button size="sm" className="mt-2">
                          <Plus className="mr-2 h-3 w-3" />
                          Add Post
                        </Button>
                      </div>
                    ) : (
                      getPostsForSelectedDate().map((post) => (
                        <div key={post.id} className="border rounded-lg p-3 space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <Badge
                                className={`${
                                  platformColors[post.platform as keyof typeof platformColors]
                                } text-white text-xs`}
                              >
                                {post.platform}
                              </Badge>
                              <Badge
                                className={`${
                                  typeColors[post.type as keyof typeof typeColors]
                                } text-white text-xs`}
                              >
                                {post.type}
                              </Badge>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <MoreHorizontal className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-3 w-3" />
                                  Preview
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-3 w-3" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-3 w-3" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <h4 className="font-medium text-sm">{post.title}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {post.content}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {new Date(post.scheduledFor).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Scheduled</span>
                    <span className="font-medium">{filteredPosts.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">This Week</span>
                    <span className="font-medium">
                      {
                        filteredPosts.filter((post) => {
                          const postDate = new Date(post.scheduledFor);
                          const weekStart = new Date();
                          weekStart.setDate(weekStart.getDate() - weekStart.getDay());
                          const weekEnd = new Date(weekStart);
                          weekEnd.setDate(weekStart.getDate() + 6);
                          return postDate >= weekStart && postDate <= weekEnd;
                        }).length
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Today</span>
                    <span className="font-medium">
                      {
                        filteredPosts.filter((post) => {
                          const postDate = new Date(post.scheduledFor);
                          const today = new Date();
                          return postDate.toDateString() === today.toDateString();
                        }).length
                      }
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="week" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Week View</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-8 gap-2">
                <div className="p-2 font-medium text-center">Time</div>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="p-2 font-medium text-center">
                    {day}
                  </div>
                ))}

                {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((hour) => (
                  <>
                    <div key={hour} className="p-2 text-sm text-muted-foreground text-center">
                      {hour}:00
                    </div>
                    {[0, 1, 2, 3, 4, 5, 6].map((dayOffset) => {
                      const cellDate = new Date();
                      cellDate.setDate(cellDate.getDate() - cellDate.getDay() + dayOffset);
                      cellDate.setHours(hour, 0, 0, 0);

                      const postsForHour = filteredPosts.filter((post) => {
                        const postDate = new Date(post.scheduledFor);
                        return (
                          postDate.getTime() >= cellDate.getTime() &&
                          postDate.getTime() < cellDate.getTime() + 3600000
                        );
                      });

                      return (
                        <div
                          key={`${hour}-${dayOffset}`}
                          className="min-h-[60px] border rounded p-1"
                        >
                          {postsForHour.map((post) => (
                            <div
                              key={post.id}
                              className={`text-xs p-1 mb-1 rounded text-white truncate ${
                                platformColors[post.platform as keyof typeof platformColors]
                              }`}
                              title={post.title}
                            >
                              {post.title.slice(0, 20)}...
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="day" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate?.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getPostsForSelectedDate().length === 0 ? (
                  <div className="text-center py-8">
                    <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">No posts scheduled</h3>
                    <p className="text-muted-foreground mb-4">
                      Create your first post for this day
                    </p>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Schedule Post
                    </Button>
                  </div>
                ) : (
                  getPostsForSelectedDate()
                    .sort(
                      (a, b) =>
                        new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime()
                    )
                    .map((post) => (
                      <div
                        key={post.id}
                        className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="text-lg font-medium">
                              {new Date(post.scheduledFor).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </div>
                            <div className="flex gap-2">
                              <Badge
                                className={`${
                                  platformColors[post.platform as keyof typeof platformColors]
                                } text-white`}
                              >
                                {post.platform}
                              </Badge>
                              <Badge
                                className={`${
                                  typeColors[post.type as keyof typeof typeColors]
                                } text-white`}
                              >
                                {post.type}
                              </Badge>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                Preview
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <h3 className="font-semibold mb-2">{post.title}</h3>
                        <p className="text-muted-foreground mb-3">{post.content}</p>

                        <div className="flex flex-wrap gap-1">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
