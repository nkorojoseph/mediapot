'use client';
import { use, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  PenSquare,
  Image,
  Hash,
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  Upload,
  Eye,
  Send,
  Save,
} from 'lucide-react';

const platforms = [
  { id: 'twitter', name: 'Twitter', color: 'bg-blue-500' },
  { id: 'linkedin', name: 'LinkedIn', color: 'bg-blue-700' },
  { id: 'instagram', name: 'Instagram', color: 'bg-pink-500' },
  { id: 'facebook', name: 'Facebook', color: 'bg-blue-600' },
  { id: 'tiktok', name: 'TikTok', color: 'bg-black' },
];

const suggestedHashtags = [
  '#socialmedia',
  '#marketing',
  '#contentcreator',
  '#digitalmarketing',
  '#brand',
  '#engagement',
  '#socialmediamarketing',
  '#content',
  '#strategy',
  '#growth',
  '#entrepreneur',
  '#business',
];

const templates = [
  {
    id: 'motivational',
    name: 'Motivational Monday',
    content:
      '🌟 Monday Motivation: [Your inspiring message here]\n\nRemember: [Key insight or tip]\n\nWhat motivates you this week? Let us know in the comments! 👇',
  },
  {
    id: 'tip',
    name: 'Quick Tip',
    content:
      "💡 Pro Tip: [Your valuable tip here]\n\nHere's why this works:\n• [Reason 1]\n• [Reason 2]\n• [Reason 3]\n\nTry it out and let us know your results! 🚀",
  },
  {
    id: 'announcement',
    name: 'Announcement',
    content:
      '📢 Exciting News! [Your announcement here]\n\n[Brief description of what makes this special]\n\nStay tuned for more updates! ✨',
  },
  {
    id: 'question',
    name: 'Engagement Question',
    content:
      '🤔 Quick question for you: [Your question here]\n\n[Optional context or background]\n\nShare your thoughts in the comments! We love hearing from you 💬',
  },
];

export default function CreatePostPage() {
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['twitter', 'linkedin']);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined);
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setContent(template.content);
      setSelectedTemplate(templateId);
    }
  };

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId) ? prev.filter((p) => p !== platformId) : [...prev, platformId]
    );
  };

  const handleHashtagToggle = (hashtag: string) => {
    setSelectedHashtags((prev) =>
      prev.includes(hashtag) ? prev.filter((h) => h !== hashtag) : [...prev, hashtag]
    );
  };

  const generateAIContent = () => {
    const aiContent = `🚀 The future of content creation is here with AI-powered tools! 

Did you know that brands using AI for content see:
• 73% faster content production
• 45% higher engagement rates
• 60% more consistent brand voice

The key is finding the right balance between automation and authentic human connection.

What's your experience with AI in content marketing? Share your thoughts below! 👇

#AIMarketing #ContentCreation #DigitalStrategy #MarketingTrends`;

    setContent(aiContent);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Create New Post</h1>
          <p className="text-muted-foreground">
            Craft engaging content for your social media platforms
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Content Creation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PenSquare className="h-5 w-5" />
                Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="write" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="write">Write</TabsTrigger>
                  <TabsTrigger value="template">Templates</TabsTrigger>
                  <TabsTrigger value="ai">AI Generate</TabsTrigger>
                </TabsList>

                <TabsContent value="write" className="space-y-4">
                  <Textarea
                    placeholder="What's on your mind? Share your thoughts, insights, or updates..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[200px]"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{content.length} characters</span>
                    <span>Optimal length: 100-280 characters</span>
                  </div>
                </TabsContent>

                <TabsContent value="template" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {templates.map((template) => (
                      <Card
                        key={template.id}
                        className={`cursor-pointer hover:bg-muted/50 transition-colors ${
                          selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => handleTemplateSelect(template.id)}
                      >
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2">{template.name}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {template.content.replace(/\[.*?\]/g, '...')}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="ai" className="space-y-4">
                  <div className="space-y-4">
                    <Input placeholder="Enter a topic or prompt for AI generation..." />
                    <Button onClick={generateAIContent} className="w-full">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate AI Content
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Media Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Media
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-2">Drag and drop images or videos here</p>
                <Button variant="outline">Choose Files</Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          {content && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="whitespace-pre-line">{content}</p>
                  {selectedHashtags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {selectedHashtags.map((hashtag) => (
                        <Badge key={hashtag} variant="secondary" className="text-xs">
                          {hashtag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Platform Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Platforms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {platforms.map((platform) => (
                <div key={platform.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={platform.id}
                    checked={selectedPlatforms.includes(platform.id)}
                    onCheckedChange={() => handlePlatformToggle(platform.id)}
                  />
                  <label htmlFor={platform.id} className="flex items-center gap-2 cursor-pointer">
                    <Badge className={`${platform.color} text-white hover:opacity-90`}>
                      {platform.name}
                    </Badge>
                  </label>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Hashtags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="h-5 w-5" />
                Hashtags
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-1">
                {suggestedHashtags.map((hashtag) => (
                  <Badge
                    key={hashtag}
                    variant={selectedHashtags.includes(hashtag) ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => handleHashtagToggle(hashtag)}
                  >
                    {hashtag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Scheduling */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Post Time</Label>
                <Select defaultValue="now">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="now">Post Now</SelectItem>
                    <SelectItem value="schedule">Schedule for Later</SelectItem>
                    <SelectItem value="optimal">Post at Optimal Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Date & Time</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {scheduledDate ? scheduledDate.toLocaleDateString() : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={scheduledDate}
                      onSelect={setScheduledDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Time</Label>
                <Input type="time" defaultValue="09:00" />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button className="w-full">
              <Send className="mr-2 h-4 w-4" />
              Publish Now
            </Button>
            <Button variant="outline" className="w-full">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Schedule Post
            </Button>
            <Button variant="outline" className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Save as Draft
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
