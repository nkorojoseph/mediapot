'use client';
import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
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
} from 'recharts';
import { TrendingUp, Heart, MessageCircle, Share, Eye } from 'lucide-react';

const weeklyData = [
  { day: 'Mon', likes: 2400, comments: 3400, shares: 2140, reach: 8600 },
  { day: 'Tue', likes: 1398, comments: 210, shares: 180, reach: 6200 },
  { day: 'Wed', likes: 9800, comments: 890, shares: 520, reach: 12400 },
  { day: 'Thu', likes: 3908, comments: 480, shares: 290, reach: 9800 },
  { day: 'Fri', likes: 4800, comments: 380, shares: 310, reach: 11200 },
  { day: 'Sat', likes: 3800, comments: 430, shares: 350, reach: 10600 },
  { day: 'Sun', likes: 4300, comments: 350, shares: 280, reach: 9400 },
];

const metrics = [
  {
    title: 'Total Likes',
    value: '24.6K',
    change: '+12.5%',
    icon: Heart,
    color: 'text-red-500',
  },
  {
    title: 'Comments',
    value: '3.2K',
    change: '+8.3%',
    icon: MessageCircle,
    color: 'text-blue-500',
  },
  {
    title: 'Shares',
    value: '1.8K',
    change: '+15.7%',
    icon: Share,
    color: 'text-green-500',
  },
  {
    title: 'Reach',
    value: '89.4K',
    change: '+22.1%',
    icon: Eye,
    color: 'text-purple-500',
  },
];

export function EngagementSummary() {
  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          let bgColor = '';
          switch (metric.title) {
            case 'Total Likes':
              bgColor = 'bg-red-50';
              break;
            case 'Comments':
              bgColor = 'bg-blue-50';
              break;
            case 'Shares':
              bgColor = 'bg-green-50';
              break;
            case 'Reach':
              bgColor = 'bg-purple-50';
              break;
            default:
              bgColor = 'bg-gray-50';
          }
          return (
            <Card key={metric.title} className={bgColor}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-semibold">{metric.value}</p>
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {metric.change}
                    </p>
                  </div>
                  {React.createElement(metric.icon, { className: `h-8 w-8 ${metric.color}` })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Engagement Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Engagement Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="likes" fill="#a85232" name="Likes" />
              <Bar dataKey="comments" fill="#3b82f6" name="Comments" />
              <Bar dataKey="shares" fill="#22c55e" name="Shares" />
              <Bar dataKey="reach" fill="#3285a8" name="Reach" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Reach Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Reach Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
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
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
