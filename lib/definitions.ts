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
  tags: string[] | null;
};

export type Experience = {
  id: number;
  created_at: string;
  title: string;
  current: boolean;
  company: {
    name: string;
    logo?: string;
    location?: string;
    website?: string;
  };
  description: string;
  start_date: string;
  end_date: string;
  skills: Skill[];
};

export type Skill = {
  id: number;
  created_at: string;
  title: string;
  description: string;
  icon?: string;
};
