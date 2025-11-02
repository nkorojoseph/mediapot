import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Clock, 
  Heart, 
  MessageCircle, 
  Share, 
  MoreHorizontal,
  ExternalLink,
  TrendingUp
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const recentPosts = [
  {
    id: 1,
    content: '🎯 Just shared our latest insights on AI-powered content creation. The response has been incredible! Thanks to everyone who engaged.',
    platform: 'LinkedIn',
    publishedAt: '2024-01-14 16:30',
    likes: 342,
    comments: 28,
    shares: 15,
    status: 'Published',
    performance: 'high'
  },
  {
    id: 2,
    content: '☕ Monday morning thought: The best content feels like a conversation, not a broadcast. How do you make your posts more conversational?',
    platform: 'Twitter',
    publishedAt: '2024-01-14 08:15',
    likes: 128,
    comments: 34,
    shares: 22,
    status: 'Published',
    performance: 'medium'
  },
  {
    id: 3,
    content: '✨ Behind the scenes of our content creation process. Swipe to see how we go from idea to published post!',
    platform: 'Instagram',
    publishedAt: '2024-01-13 14:22',
    likes: 567,
    comments: 45,
    shares: 28,
    status: 'Published',
    performance: 'high'
  },
  {
    id: 4,
    content: '📊 New blog post: "5 Data-Driven Strategies to Boost Your Social Media ROI" - Link in comments!',
    platform: 'Facebook',
    publishedAt: '2024-01-13 11:45',
    likes: 89,
    comments: 12,
    shares: 8,
    status: 'Published',
    performance: 'low'
  },
  {
    id: 5,
    content: '🚀 Excited to announce our partnership with @TechPartner! Together, we\'re revolutionizing content marketing.',
    platform: 'LinkedIn',
    publishedAt: '2024-01-12 15:20',
    likes: 445,
    comments: 52,
    shares: 38,
    status: 'Published',
    performance: 'high'
  }
];

const platformColors = {
  LinkedIn: 'bg-blue-700',
  Twitter: 'bg-blue-500',
  Instagram: 'bg-pink-500',
  Facebook: 'bg-blue-600'
};

const performanceColors = {
  high: 'text-green-600',
  medium: 'text-yellow-600',
  low: 'text-red-600'
};

export function RecentPosts() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Posts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {recentPosts.map((post) => (
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
                      {new Date(post.publishedAt).toLocaleDateString()} at{' '}
                      {new Date(post.publishedAt).toLocaleTimeString([], { 
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
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Original
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <TrendingUp className="mr-2 h-4 w-4" />
                      View Analytics
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center justify-between mb-3">
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
                
                <span className={`text-xs font-medium ${performanceColors[post.performance as keyof typeof performanceColors]}`}>
                  {post.performance.toUpperCase()} PERFORMANCE
                </span>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {post.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    {post.comments}
                  </div>
                  <div className="flex items-center gap-1">
                    <Share className="h-4 w-4" />
                    {post.shares}
                  </div>
                </div>

                <Button size="sm" variant="outline">
                  Repost
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}