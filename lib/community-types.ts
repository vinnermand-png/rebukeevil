export type Profile = { id: string; username: string; display_name: string | null; bio: string | null; created_at: string; is_banned: boolean };
export type CommunityPost = { id: string; user_id: string; type: 'PRAYER' | 'ACCOUNTABILITY' | 'TESTIMONY'; title: string; body: string; is_deleted: boolean; created_at: string; updated_at: string };
export type CommunityReply = { id: string; post_id: string; user_id: string; body: string; is_deleted: boolean; created_at: string };
export type CommunityReport = { id: string; reporter_user_id: string; post_id: string | null; reply_id: string | null; reason: string; details: string | null; status: string; created_at: string };
