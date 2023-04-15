export interface Serie {
  title: string;
  id: number;
  isFavorite: boolean;
  description: string;
  series: {
    items: any[];
    available: number;
  };
  stories: {
    items: {
      resourceURI: string;
      name: string;
    }[];
    available: number;
  };
  characters: {
    items: any[];
    available: number;
  };
  comics: {
    items: any[];
    available: number;
  };
  thumbnail: {
    path: string;
    extension: string;
  };
}
