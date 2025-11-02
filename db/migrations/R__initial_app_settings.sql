-- V1_1__initial_app_settings.sql
-- Create a small AppSettings table and insert initial default application settings

-- Create table to hold key/value JSON settings for the app


-- Insert initial application settings
INSERT INTO "AppSettings" ("key", "value") VALUES
  ('site',      '{"name":"SocialCraft","url":"http://localhost:3000","timezone":"UTC","supportEmail":"support@socialcraft.example"}'::jsonb)
  ON CONFLICT ("key") DO NOTHING;

INSERT INTO "AppSettings" ("key", "value") VALUES
  ('brand', '{"colors":{"primary":"#2563EB","secondary":"#16A34A","accent":"#9333EA"},"voice":"professional","defaultHashtags":["#SocialCraft","#AIContent","#MarketingTech"]}'::jsonb)
  ON CONFLICT ("key") DO NOTHING;

INSERT INTO "AppSettings" ("key", "value") VALUES
  ('features', '{"quickPost":true,"scheduling":true,"analytics":false}'::jsonb)
  ON CONFLICT ("key") DO NOTHING;

INSERT INTO "AppSettings" ("key", "value") VALUES
  ('integrations', '{"facebook":{"enabled":true},"twitter":{"enabled":false}}'::jsonb)
  ON CONFLICT ("key") DO NOTHING;

INSERT INTO "AppSettings" ("key", "value") VALUES
  ('notifications', '{"post_published":true,"engagement_milestone":true,"trending_topics":false,"team_activity":true,"account_security":true}'::jsonb)
  ON CONFLICT ("key") DO NOTHING;

-- Create a default tag so new posts have at least one category available
INSERT INTO "Tag" ("id", "name", "slug", "createdAt") VALUES
  ('00000000-0000-0000-0000-000000000001', 'general', 'general', CURRENT_TIMESTAMP)
  ON CONFLICT ("slug") DO NOTHING;

-- Optionally create a system user placeholder (safe default credentials should be changed)
INSERT INTO "User" ("id", "email", "username", "name", "password", "createdAt", "updatedAt") VALUES
  ('00000000-0000-0000-0000-000000000010', 'admin@example.com', 'admin', 'Administrator', 'changeme', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  ON CONFLICT ("email") DO NOTHING;

-- Note: for production you must replace the placeholder admin account with a secure password or create the admin via a one-time migration/seed tool.




INSERT INTO "AppSettings" ("key", "value")
VALUES
(
  'connectedAccounts',
  '[
    {"platform": "LinkedIn", "username": "@john.doe", "status": "Not Connected", "color": "bg-blue-700"},
    {"platform": "Twitter", "username": "@johndoe", "status": "Not Connected", "color": "bg-blue-500"},
    {"platform": "Instagram", "username": "@johndoe_official", "status": "Not Connected", "color": "bg-pink-500"},
    {"platform": "Facebook", "username": "John Doe", "status": "Not Connected", "color": "bg-blue-600"},
    {"platform": "TikTok", "username": "@johndoe", "status": "Not Connected", "color": "bg-black"}
  ]'::jsonb
),
(
  'teamMembers',
  '[
    {"id": 1, "name": "Sarah Wilson", "email": "sarah@company.com", "role": "Admin", "avatar": "SW", "status": "Active"},
    {"id": 2, "name": "Mike Johnson", "email": "mike@company.com", "role": "Editor", "avatar": "MJ", "status": "Active"},
    {"id": 3, "name": "Emily Davis", "email": "emily@company.com", "role": "Viewer", "avatar": "ED", "status": "Pending"}
  ]'::jsonb
),
(
  'notificationSettings',
  '[
    {"id": "post_published", "label": "Post Published", "description": "Get notified when a scheduled post is published", "enabled": true},
    {"id": "engagement_milestone", "label": "Engagement Milestones", "description": "Notifications for likes, comments, and shares milestones", "enabled": true},
    {"id": "trending_topics", "label": "Trending Topics", "description": "Weekly digest of trending topics in your industry", "enabled": false},
    {"id": "team_activity", "label": "Team Activity", "description": "Updates when team members create or edit content", "enabled": true},
    {"id": "account_security", "label": "Security Alerts", "description": "Important security notifications and login alerts", "enabled": true}
  ]'::jsonb
)
ON CONFLICT ("key") DO NOTHING;
