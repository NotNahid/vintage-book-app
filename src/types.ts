export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  liveUrl?: string;
  sourceUrl?: string;
  book: {
    color: string;
    height?: string;
    width?: string;
    tilted?: string | null;
    special?: string | null;

  };
}
