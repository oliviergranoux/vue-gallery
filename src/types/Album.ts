export interface Album {
  // url: string; 
  folder: string; 
  caption?: string;
  images: [Image];
}

export interface Image {
  filename: string; 
  extension: string;
  caption?: string;
}