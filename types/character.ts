export interface Character {
  description: string;
  id: number;
  isFavorite: boolean;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: {
    items: Array<{
      resourceURI: string;
      name: string;
    }>;
    available: number;
  };
  series: {
    items: Array<{
      resourceURI: string;
      name: string;
    }>;
    available: number;
  };
  stories: {
    items: Array<{
      resourceURI: string;
      name: string;
    }>;
    available: number;
  };
}
