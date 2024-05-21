export type BlogPost = {
  id: number;
  created_at: string; // timestamp with time zone
  cover_image: string | null;
  cover_image_attribution: string | null;
  title: string;
  content: any;
  created_by: string; // uuid
  hits: number;
  published: boolean;
  description: string | null;
};
