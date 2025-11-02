import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Trophy, TrendingUp, Heart, MessageCircle, Share } from 'lucide-react';

const topPosts = [
  {
    id: 1,
    rank: 1,
    content:
      '🚀 The future of AI in content marketing is here! Our latest report reveals 5 game-changing trends that will transform how brands connect with audiences.',
    platform: 'LinkedIn',
    totalEngagement: 2847,
    likes: 1245,
    comments: 89,
    shares: 156,
    publishedDays: 3,
    avatar: 'SC',
  },
  {
    id: 2,
    rank: 2,
    content:
      "✨ Weekend vibes: Behind-the-scenes look at our creative process. From brainstorming to final design - here's how magic happens!",
    platform: 'Instagram',
    totalEngagement: 2134,
    likes: 1789,
    comments: 234,
    shares: 111,
    publishedDays: 2,
    avatar: 'SC',
  },
  {
    id: 3,
    rank: 3,
    content:
      "📊 Data doesn't lie: 73% of marketers say AI tools have improved their content performance. What's your experience?",
    platform: 'Twitter',
    totalEngagement: 1923,
    likes: 1456,
    comments: 167,
    shares: 300,
    publishedDays: 5,
    avatar: 'SC',
  },
  {
    id: 4,
    rank: 4,
    content:
      "💡 Monday Motivation: Success in social media isn't about going viral - it's about creating consistent value for your audience.",
    platform: 'Facebook',
    totalEngagement: 1687,
    likes: 1234,
    comments: 203,
    shares: 250,
    publishedDays: 1,
    avatar: 'SC',
  },
  {
    id: 5,
    rank: 5,
    content:
      "🎯 Pro tip: The best time to post isn't when your audience is online - it's when they're ready to engage. Here's how to find that sweet spot.",
    platform: 'LinkedIn',
    totalEngagement: 1456,
    likes: 987,
    comments: 145,
    shares: 324,
    publishedDays: 4,
    avatar: 'SC',
  },
];

const platformColors = {
  LinkedIn: 'bg-blue-700',
  Twitter: 'bg-blue-500',
  Instagram: 'bg-pink-500',
  Facebook: 'bg-blue-600',
};

const rankColors = {
  1: 'text-yellow-500',
  2: 'text-gray-400',
  3: 'text-orange-600',
};

export function PerformanceLeaderboard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Top Performing Posts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {topPosts.map((post) => (
            <div
              key={post.id}
              className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                  <span
                    className={`font-bold ${
                      (rankColors as any)[post.rank] || 'text-muted-foreground'
                    }`}
                  >
                    #{post.rank}
                  </span>
                </div>

                <div className="flex-1">
                  <p className="text-sm line-clamp-2 mb-2">{post.content}</p>

                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      className={`${
                        platformColors[post.platform as keyof typeof platformColors]
                      } text-white hover:opacity-90`}
                    >
                      {post.platform}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {post.publishedDays} days ago
                    </span>
                  </div>
                </div>

                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>{post.avatar}</AvatarFallback>
                </Avatar>
              </div>

              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span className="text-xs font-medium">Total</span>
                  </div>
                  <p className="text-sm font-semibold">{post.totalEngagement.toLocaleString()}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1">
                    <Heart className="h-3 w-3 text-red-500" />
                    <span className="text-xs font-medium">Likes</span>
                  </div>
                  <p className="text-sm font-semibold">{post.likes.toLocaleString()}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1">
                    <MessageCircle className="h-3 w-3 text-blue-500" />
                    <span className="text-xs font-medium">Comments</span>
                  </div>
                  <p className="text-sm font-semibold">{post.comments}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1">
                    <Share className="h-3 w-3 text-green-500" />
                    <span className="text-xs font-medium">Shares</span>
                  </div>
                  <p className="text-sm font-semibold">{post.shares}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
