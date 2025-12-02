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
    height: string;
    width: string;
    tilted?: 'left' | 'right';
    special?: 'band-1' | 'band-2'; // For books with decorative bands
  };
}
