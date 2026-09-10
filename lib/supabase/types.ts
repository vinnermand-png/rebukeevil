export type Link = {
  id: string;
  title: string;
  label: string | null;
  subtitle: string | null;
  url: string;
  cta_label: string | null;
  is_active: boolean;
  sort_order: number;
  open_in_new_tab: boolean;
  created_at: string;
  updated_at: string;
};
