export type BlogPost = {
  id: number;
  created_at: string; // timestamp with time zone
  cover_image: string; // text
  title: string;
  content: any;
  created_by: string; // uuid
  hits: number; // numeric
  published: boolean;
};
