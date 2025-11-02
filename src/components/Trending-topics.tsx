import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { TrendingUp, ArrowUp, Eye, MessageCircle } from 'lucide-react';

const trendingTopics = [
  {
    id: 1,
    topic: 'AI Content Creation',
    category: 'Technology',
    engagement: '125.3K',
    growth: '+32%',
    hashtags: ['#AI', '#ContentCreation', '#MarketingAI'],
    region: 'Global',
    description: 'AI-powered tools revolutionizing content marketing strategies',
  },
  {
    id: 2,
    topic: 'Sustainable Marketing',
    category: 'Environment',
    engagement: '87.2K',
    growth: '+28%',
    hashtags: ['#Sustainability', '#GreenMarketing', '#EcoFriendly'],
    region: 'North America',
    description: 'Brands embracing eco-conscious marketing approaches',
  },
  {
    id: 3,
    topic: 'Remote Work Culture',
    category: 'Business',
    engagement: '156.7K',
    growth: '+45%',
    hashtags: ['#RemoteWork', '#WorkFromHome', '#DigitalNomad'],
    region: 'Global',
    description: 'Evolution of workplace culture in the digital age',
  },
  {
    id: 4,
    topic: 'Video Marketing ROI',
    category: 'Marketing',
    engagement: '93.4K',
    growth: '+18%',
    hashtags: ['#VideoMarketing', '#ROI', '#DigitalStrategy'],
    region: 'Europe',
    description: 'Measuring success in short-form video content strategies',
  },
  {
    id: 5,
    topic: 'Personal Branding',
    category: 'Career',
    engagement: '102.8K',
    growth: '+22%',
    hashtags: ['#PersonalBranding', '#LinkedIn', '#ProfessionalGrowth'],
    region: 'Global',
    description: 'Building authentic professional presence on social media',
  },
  {
    id: 6,
    topic: 'Micro-Influencers',
    category: 'Influencer Marketing',
    engagement: '76.1K',
    growth: '+35%',
    hashtags: ['#MicroInfluencers', '#InfluencerMarketing', '#Authenticity'],
    region: 'Asia Pacific',
    description: 'The rise of niche content creators and authentic partnerships',
  },
];

export function TrendingTopics() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Trending Topics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {trendingTopics.map((topic) => (
            <div
              key={topic.id}
              className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-medium">{topic.topic}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{topic.description}</p>
                </div>
                <Badge variant="outline" className="ml-2">
                  {topic.category}
                </Badge>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {topic.engagement}
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <ArrowUp className="h-3 w-3" />
                  {topic.growth}
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" />
                  {topic.region}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {topic.hashtags.map((hashtag) => (
                    <Badge key={hashtag} variant="secondary" className="text-xs">
                      {hashtag}
                    </Badge>
                  ))}
                </div>
                <Button size="sm" variant="outline">
                  Generate Post
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
