import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, Clock, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const scheduledPosts = [
  {
    id: 1,
    content: '🚀 Exciting news! Our new AI-powered content tool is launching next week. Get ready to transform your social media strategy...',
    platform: 'LinkedIn',
    scheduledFor: '2024-01-15 09:00',
    status: 'Scheduled',
    engagement: null
  },
  {
    id: 2,
    content: '📈 Monday Motivation: The key to success in content marketing is consistency. Here are 5 tips to maintain your posting schedule...',
    platform: 'Twitter',
    scheduledFor: '2024-01-15 08:00',
    status: 'Scheduled',
    engagement: null
  },
  {
    id: 3,
    content: '✨ Behind the scenes: How our team creates engaging visual content that converts. Swipe to see our creative process!',
    platform: 'Instagram',
    scheduledFor: '2024-01-15 14:00',
    status: 'Scheduled',
    engagement: null
  },
  {
    id: 4,
    content: '🎯 Quick tip: Use storytelling in your posts to increase engagement by up to 300%. Here\'s how to craft compelling narratives...',
    platform: 'Facebook',
    scheduledFor: '2024-01-16 10:30',
    status: 'Scheduled',
    engagement: null
  },
  {
    id: 5,
    content: '💡 Industry insight: The future of social media marketing lies in authentic connections. What\'s your strategy for building genuine relationships?',
    platform: 'LinkedIn',
    scheduledFor: '2024-01-16 15:00',
    status: 'Scheduled',
    engagement: null
  }
];

const platformColors = {
  LinkedIn: 'bg-blue-700',
  Twitter: 'bg-blue-500',
  Instagram: 'bg-pink-500',
  Facebook: 'bg-blue-600'
};

export function ScheduledPosts() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Scheduled Posts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {scheduledPosts.map((post) => (
            <div
              key={post.id}
              className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="text-sm line-clamp-2 mb-2">
                    {post.content}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(post.scheduledFor).toLocaleDateString()} at{' '}
                      {new Date(post.scheduledFor).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Post
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge 
                    className={`${platformColors[post.platform as keyof typeof platformColors]} text-white hover:opacity-90`}
                  >
                    {post.platform}
                  </Badge>
                  <Badge variant="outline">
                    {post.status}
                  </Badge>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Reschedule
                  </Button>
                  <Button size="sm">
                    Post Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t">
          <Button variant="outline" className="w-full">
            <Calendar className="mr-2 h-4 w-4" />
            View Full Calendar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}