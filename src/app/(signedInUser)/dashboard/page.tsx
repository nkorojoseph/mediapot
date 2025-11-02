// import Sidebar from "@/components/sidebar";
import { auth, currentUser } from '@clerk/nextjs/server';
import { QuickPostGenerator } from '@/components/Quick-post-generator';
import { TrendingTopics } from '@/components/Trending-topics';
import { EngagementSummary } from '@/components/Engagement-summary';
import { ScheduledPosts } from '@/components/Scheduled-posts';
import { RecentPosts } from '@/components/Recent-posts';
import { PerformanceLeaderboard } from '@/components/Post-performance-leaderboard';

export default async function DashboardPage() {
  const authObj = await auth();
  const userObj = await currentUser();

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {userObj?.username} 👋</h1>
        <p className="text-muted-foreground">
          Here's what's happening with your social media today. You have 5 posts scheduled and 6{' '}
          trending topics in your industry.
        </p>
      </div>

      {/* Top Row - Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <QuickPostGenerator />
        <TrendingTopics />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Analytics Overview</h2>
        <EngagementSummary />
      </div>

      {/* Content Management Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <ScheduledPosts />
        <RecentPosts />
        <PerformanceLeaderboard />
      </div>
    </div>
  );
}
