'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Library,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  FileText,
  Image,
  Video,
  Calendar,
  Eye,
  Heart,
  MessageCircle,
  Share,
  Download,
} from 'lucide-react';

const contentItems = [
  {
    id: 1,
    type: 'post',
    title: 'AI Content Creation Guide',
    content:
      '🚀 The future of AI in content marketing is here! Our latest report reveals 5 game-changing trends...',
    status: 'published',
    platform: 'LinkedIn',
    createdAt: '2024-01-14',
    performance: { likes: 342, comments: 28, shares: 15 },
    tags: ['AI', 'Marketing', 'Guide'],
    thumbnail: null,
  },
  {
    id: 2,
    type: 'post',
    title: 'Monday Motivation Post',
    content:
      '☕ Monday morning thought: The best content feels like a conversation, not a broadcast...',
    status: 'scheduled',
    platform: 'Twitter',
    createdAt: '2024-01-14',
    scheduledFor: '2024-01-15 08:00',
    tags: ['Motivation', 'Engagement'],
    thumbnail: null,
  },
  {
    id: 3,
    type: 'image',
    title: 'Brand Logo Collection',
    content: 'High-resolution brand logos and variations',
    status: 'archived',
    platform: null,
    createdAt: '2024-01-10',
    tags: ['Brand', 'Assets'],
    thumbnail: '/placeholder-image.jpg',
  },
  {
    id: 4,
    type: 'video',
    title: 'Behind the Scenes',
    content: 'Office tour and team introduction video',
    status: 'draft',
    platform: 'Instagram',
    createdAt: '2024-01-12',
    tags: ['BTS', 'Team', 'Culture'],
    thumbnail: '/placeholder-video.jpg',
  },
  {
    id: 5,
    type: 'template',
    title: 'Product Launch Template',
    content: '📢 Exciting News! [Product Name] is here! [Brief description]...',
    status: 'template',
    platform: null,
    createdAt: '2024-01-08',
    tags: ['Template', 'Launch', 'Announcement'],
    thumbnail: null,
  },
  {
    id: 6,
    type: 'post',
    title: 'Industry Insights Post',
    content: '📊 New blog post: "5 Data-Driven Strategies to Boost Your Social Media ROI"...',
    status: 'published',
    platform: 'Facebook',
    createdAt: '2024-01-13',
    performance: { likes: 89, comments: 12, shares: 8 },
    tags: ['Data', 'ROI', 'Strategy'],
    thumbnail: null,
  },
];

const statusColors = {
  published: 'bg-green-500',
  scheduled: 'bg-blue-500',
  draft: 'bg-yellow-500',
  archived: 'bg-gray-500',
  template: 'bg-purple-500',
};

const typeIcons = {
  post: FileText,
  image: Image,
  video: Video,
  template: FileText,
};

export default function ContentLibraryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const filteredContent = contentItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleItemSelect = (itemId: number) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredContent.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredContent.map((item) => item.id));
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Content Library</h1>
          <p className="text-muted-foreground">
            Manage your posts, media, templates, and brand assets
          </p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          New Content
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search content, tags, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Content Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="post">Posts</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="template">Templates</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="draft">Drafts</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
                <SelectItem value="template">Templates</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Checkbox
                  checked={selectedItems.length === filteredContent.length}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm">{selectedItems.length} items selected</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button size="sm" variant="outline">
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicate
                </Button>
                <Button size="sm" variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content Tabs */}
      <Tabs defaultValue="grid" className="w-full">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredContent.map((item) => {
              const IconComponent = typeIcons[item.type as keyof typeof typeIcons];
              return (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          onCheckedChange={() => handleItemSelect(item.id)}
                        />
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
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
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          {item.status === 'published' && (
                            <DropdownMenuItem>
                              <ExternalLink className="mr-2 h-4 w-4" />
                              View Original
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardTitle className="text-sm line-clamp-2">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {item.thumbnail && (
                      <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                        <Image className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}

                    <p className="text-xs text-muted-foreground line-clamp-2">{item.content}</p>

                    <div className="flex items-center justify-between">
                      <Badge
                        className={`${
                          statusColors[item.status as keyof typeof statusColors]
                        } text-white text-xs`}
                      >
                        {item.status}
                      </Badge>
                      {item.platform && (
                        <Badge variant="outline" className="text-xs">
                          {item.platform}
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                      {item.tags.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{item.tags.length - 2}
                        </Badge>
                      )}
                    </div>

                    {item.performance && (
                      <div className="flex items-center gap-3 text-xs text-muted-foreground pt-2 border-t">
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {item.performance.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          {item.performance.comments}
                        </div>
                        <div className="flex items-center gap-1">
                          <Share className="h-3 w-3" />
                          {item.performance.shares}
                        </div>
                      </div>
                    )}

                    <div className="text-xs text-muted-foreground">
                      Created: {new Date(item.createdAt).toLocaleDateString()}
                      {item.scheduledFor && (
                        <div className="flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3" />
                          Scheduled: {new Date(item.scheduledFor).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="space-y-0">
                {filteredContent.map((item, index) => {
                  const IconComponent = typeIcons[item.type as keyof typeof typeIcons];
                  return (
                    <div
                      key={item.id}
                      className={`flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors ${
                        index !== filteredContent.length - 1 ? 'border-b' : ''
                      }`}
                    >
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => handleItemSelect(item.id)}
                      />

                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <IconComponent className="h-4 w-4 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{item.title}</h4>
                          <p className="text-sm text-muted-foreground truncate">{item.content}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge
                          className={`${
                            statusColors[item.status as keyof typeof statusColors]
                          } text-white`}
                        >
                          {item.status}
                        </Badge>
                        {item.platform && <Badge variant="outline">{item.platform}</Badge>}
                      </div>

                      <div className="text-sm text-muted-foreground min-w-[100px]">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>

                      {item.performance && (
                        <div className="flex items-center gap-3 text-sm text-muted-foreground min-w-[120px]">
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {item.performance.likes}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" />
                            {item.performance.comments}
                          </div>
                          <div className="flex items-center gap-1">
                            <Share className="h-3 w-3" />
                            {item.performance.shares}
                          </div>
                        </div>
                      )}

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
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
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {filteredContent.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Library className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No content found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || selectedType !== 'all' || selectedStatus !== 'all'
                ? 'Try adjusting your filters or search terms.'
                : 'Start creating content to build your library.'}
            </p>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Create New Content
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
