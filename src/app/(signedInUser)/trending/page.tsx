'use client';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
// Removed unused Tabs imports
import {
  TrendingUp,
  Search,
  ArrowUp,
  Eye,
  MessageCircle,
  PenSquare,
  BookmarkPlus,
  ExternalLink,
} from 'lucide-react';

const trendingTopics = [
  {
    id: 1,
    topic: 'AI Content Creation',
    category: 'Technology',
    engagement: '125.3K',
    growth: '+32%',
    hashtags: ['#AI', '#ContentCreation', '#MarketingAI', '#Automation'],
    region: 'Global',
    description: 'AI-powered tools revolutionizing content marketing strategies',
    volume: 'High',
    difficulty: 'Medium',
    relevance: 95,
    relatedKeywords: ['artificial intelligence', 'content automation', 'marketing ai', 'chatgpt'],
    platforms: ['LinkedIn', 'Twitter', 'Medium'],
  },
  {
    id: 2,
    topic: 'Sustainable Marketing',
    category: 'Environment',
    engagement: '87.2K',
    growth: '+28%',
    hashtags: ['#Sustainability', '#GreenMarketing', '#EcoFriendly', '#ClimateAction'],
    region: 'North America',
    description: 'Brands embracing eco-conscious marketing approaches',
    volume: 'Medium',
    difficulty: 'Low',
    relevance: 78,
    relatedKeywords: ['green marketing', 'eco-friendly', 'sustainable business', 'carbon neutral'],
    platforms: ['Instagram', 'LinkedIn', 'Facebook'],
  },
  {
    id: 3,
    topic: 'Remote Work Culture',
    category: 'Business',
    engagement: '156.7K',
    growth: '+45%',
    hashtags: ['#RemoteWork', '#WorkFromHome', '#DigitalNomad', '#FutureOfWork'],
    region: 'Global',
    description: 'Evolution of workplace culture in the digital age',
    volume: 'High',
    difficulty: 'High',
    relevance: 88,
    relatedKeywords: ['remote work', 'hybrid work', 'work from home', 'distributed teams'],
    platforms: ['LinkedIn', 'Twitter', 'Slack'],
  },
  {
    id: 4,
    topic: 'Video Marketing ROI',
    category: 'Marketing',
    engagement: '93.4K',
    growth: '+18%',
    hashtags: ['#VideoMarketing', '#ROI', '#DigitalStrategy', '#ShortForm'],
    region: 'Europe',
    description: 'Measuring success in short-form video content strategies',
    volume: 'Medium',
    difficulty: 'Medium',
    relevance: 82,
    relatedKeywords: ['video content', 'short form video', 'reels', 'tiktok marketing'],
    platforms: ['TikTok', 'Instagram', 'YouTube'],
  },
  {
    id: 5,
    topic: 'Personal Branding',
    category: 'Career',
    engagement: '102.8K',
    growth: '+22%',
    hashtags: ['#PersonalBranding', '#LinkedIn', '#ProfessionalGrowth', '#Networking'],
    region: 'Global',
    description: 'Building authentic professional presence on social media',
    volume: 'High',
    difficulty: 'Low',
    relevance: 91,
    relatedKeywords: [
      'personal brand',
      'professional development',
      'career growth',
      'linkedin strategy',
    ],
    platforms: ['LinkedIn', 'Twitter', 'Instagram'],
  },
  {
    id: 6,
    topic: 'Micro-Influencers',
    category: 'Influencer Marketing',
    engagement: '76.1K',
    growth: '+35%',
    hashtags: ['#MicroInfluencers', '#InfluencerMarketing', '#Authenticity', '#NanoInfluencers'],
    region: 'Asia Pacific',
    description: 'The rise of niche content creators and authentic partnerships',
    volume: 'Medium',
    difficulty: 'Medium',
    relevance: 73,
    relatedKeywords: [
      'micro influencer',
      'influencer partnerships',
      'authentic marketing',
      'creator economy',
    ],
    platforms: ['Instagram', 'TikTok', 'YouTube'],
  },
  {
    id: 7,
    topic: 'Web3 Marketing',
    category: 'Technology',
    engagement: '64.8K',
    growth: '+41%',
    hashtags: ['#Web3', '#NFT', '#Blockchain', '#MetaverseMarketing'],
    region: 'Global',
    description: 'Innovative marketing strategies in decentralized platforms',
    volume: 'Low',
    difficulty: 'High',
    relevance: 65,
    relatedKeywords: ['web3', 'blockchain marketing', 'nft marketing', 'metaverse'],
    platforms: ['Twitter', 'Discord', 'LinkedIn'],
  },
  {
    id: 8,
    topic: 'Mental Health Awareness',
    category: 'Health & Wellness',
    engagement: '89.5K',
    growth: '+26%',
    hashtags: ['#MentalHealth', '#Wellness', '#SelfCare', '#MindfulMarketing'],
    region: 'Global',
    description: 'Brands supporting mental health initiatives and awareness',
    volume: 'High',
    difficulty: 'Low',
    relevance: 85,
    relatedKeywords: ['mental health', 'wellness marketing', 'self care', 'mindfulness'],
    platforms: ['Instagram', 'TikTok', 'LinkedIn'],
  },
];

const categories = [
  'All',
  'Technology',
  'Marketing',
  'Business',
  'Environment',
  'Career',
  'Health & Wellness',
  'Influencer Marketing',
];
const regions = ['All', 'Global', 'North America', 'Europe', 'Asia Pacific'];
const volumes = ['All', 'High', 'Medium', 'Low'];
const difficulties = ['All', 'Low', 'Medium', 'High'];

const volumeColors = {
  High: 'bg-red-500',
  Medium: 'bg-yellow-500',
  Low: 'bg-green-500',
};

const difficultyColors = {
  Low: 'bg-green-500',
  Medium: 'bg-yellow-500',
  High: 'bg-red-500',
};

export default function TrendingTopicsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedVolume, setSelectedVolume] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [sortBy, setSortBy] = useState('growth');

  const filteredTopics = trendingTopics
    .filter((topic) => {
      const matchesSearch =
        topic.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.hashtags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || topic.category === selectedCategory;
      const matchesRegion = selectedRegion === 'All' || topic.region === selectedRegion;
      const matchesVolume = selectedVolume === 'All' || topic.volume === selectedVolume;
      const matchesDifficulty =
        selectedDifficulty === 'All' || topic.difficulty === selectedDifficulty;

      return (
        matchesSearch && matchesCategory && matchesRegion && matchesVolume && matchesDifficulty
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'growth':
          return parseFloat(b.growth) - parseFloat(a.growth);
        case 'engagement':
          return (
            parseFloat(b.engagement.replace('K', '')) - parseFloat(a.engagement.replace('K', ''))
          );
        case 'relevance':
          return b.relevance - a.relevance;
        default:
          return 0;
      }
    });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Trending Topics</h1>
          <p className="text-muted-foreground">
            Discover what's trending in your industry and create engaging content
          </p>
        </div>
        <Button>
          <BookmarkPlus className="mr-2 h-4 w-4" />
          Save Topic Set
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search topics, hashtags, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="growth">Growth Rate</SelectItem>
                <SelectItem value="engagement">Engagement</SelectItem>
                <SelectItem value="relevance">Relevance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger>
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedVolume} onValueChange={setSelectedVolume}>
              <SelectTrigger>
                <SelectValue placeholder="Volume" />
              </SelectTrigger>
              <SelectContent>
                {volumes.map((volume) => (
                  <SelectItem key={volume} value={volume}>
                    {volume}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map((difficulty) => (
                  <SelectItem key={difficulty} value={difficulty}>
                    {difficulty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Topics List */}
      <div className="space-y-4">
        {filteredTopics.map((topic) => (
          <Card key={topic.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main Topic Info */}
                <div className="lg:col-span-2 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{topic.topic}</h3>
                      <p className="text-muted-foreground text-sm mb-2">{topic.description}</p>
                    </div>
                    <Badge variant="outline">{topic.category}</Badge>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {topic.hashtags.map((hashtag) => (
                      <Badge key={hashtag} variant="secondary" className="text-xs">
                        {hashtag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {topic.engagement} engagement
                    </div>
                    <div className="flex items-center gap-1 text-green-600">
                      <ArrowUp className="h-3 w-3" />
                      {topic.growth} growth
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      {topic.region}
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Relevance</span>
                      <span className="text-sm font-medium">{topic.relevance}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${topic.relevance}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Volume</span>
                    <Badge
                      className={`${
                        volumeColors[topic.volume as keyof typeof volumeColors]
                      } text-white text-xs`}
                    >
                      {topic.volume}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Difficulty</span>
                    <Badge
                      className={`${
                        difficultyColors[topic.difficulty as keyof typeof difficultyColors]
                      } text-white text-xs`}
                    >
                      {topic.difficulty}
                    </Badge>
                  </div>

                  <div>
                    <span className="text-sm text-muted-foreground">Platforms</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {topic.platforms.map((platform) => (
                        <Badge key={platform} variant="outline" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Button className="w-full">
                    <PenSquare className="mr-2 h-4 w-4" />
                    Generate Post
                  </Button>
                  <Button variant="outline" className="w-full">
                    <BookmarkPlus className="mr-2 h-4 w-4" />
                    Save Topic
                  </Button>
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Research More
                  </Button>
                </div>
              </div>

              {/* Related Keywords */}
              <div className="mt-4 pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Related Keywords</h4>
                <div className="flex flex-wrap gap-1">
                  {topic.relatedKeywords.map((keyword) => (
                    <Badge key={keyword} variant="outline" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTopics.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No trending topics found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search terms to find relevant topics.
            </p>
            <Button variant="outline">Reset Filters</Button>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{filteredTopics.length}</div>
            <div className="text-sm text-muted-foreground">Active Topics</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {filteredTopics.filter((t) => t.volume === 'High').length}
            </div>
            <div className="text-sm text-muted-foreground">High Volume</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(
                filteredTopics.reduce((acc, t) => acc + t.relevance, 0) / filteredTopics.length
              ) || 0}
              %
            </div>
            <div className="text-sm text-muted-foreground">Avg Relevance</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
