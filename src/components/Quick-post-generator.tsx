'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { PenSquare, Sparkles, Image, Calendar } from 'lucide-react';
// import { getCompletion } from '@/integrations/openai';

const suggestedHashtags = [
  '#socialmedia',
  '#marketing',
  '#contentcreator',
  '#digitalmarketing',
  '#brand',
  '#engagement',
  '#socialmediamarketing',
  '#content',
];

const platformBadges = [
  { name: 'Twitter', color: 'bg-blue-500' },
  { name: 'LinkedIn', color: 'bg-blue-700' },
  { name: 'Instagram', color: 'bg-pink-500' },
  { name: 'Facebook', color: 'bg-blue-600' },
];

export function QuickPostGenerator() {
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');

  const handleGenerate = async () => {
    setGeneratedContent('Generating...');
    try {
      const res = await fetch('/api/generate-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      console.log(data);
      setGeneratedContent(data.content || 'No content generated.');
    } catch (err) {
      setGeneratedContent('Error generating content.');
    }
  };

  const handleGenerateFromTrend = () => {
    const trendContent = `📈 AI-powered content creation is revolutionizing how brands connect with their audience!

Here's what we're seeing:
• 73% faster content production
• 45% higher engagement rates  
• 60% more consistent brand voice

The future of marketing is here, and it's intelligent. Are you ready to embrace the change?

#AIMarketing #ContentCreation #DigitalTransformation #MarketingAutomation`;

    setGeneratedContent(trendContent);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PenSquare className="h-5 w-5" />
          Quick Post Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="prompt">Enter your idea or prompt:</label>
          <Textarea
            id="prompt"
            placeholder="e.g., 'Write a motivational Monday post about productivity tips for remote workers'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleGenerate} className="flex-1">
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Content
          </Button>
          <Button variant="outline" onClick={handleGenerateFromTrend}>
            Generate from Trend
          </Button>
        </div>

        {generatedContent && (
          <>
            <Separator />
            <div className="space-y-3">
              <h4>Generated Content:</h4>
              <div className="bg-muted p-3 rounded-lg">
                <p className="whitespace-pre-line">{generatedContent}</p>
              </div>

              <div className="space-y-2">
                <h5>Suggested Hashtags:</h5>
                <div className="flex flex-wrap gap-1">
                  {suggestedHashtags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h5>Publishing Options:</h5>
                <div className="flex flex-wrap gap-2">
                  {platformBadges.map((platform) => (
                    <Badge
                      key={platform.name}
                      className={`${platform.color} text-white hover:opacity-90`}
                    >
                      {platform.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline">
                  <Image className="mr-2 h-4 w-4" />
                  Add Media
                </Button>
                <Button size="sm" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule
                </Button>
                <Button size="sm">Publish Now</Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
