export interface Image {
  title: string;
  file: File;
  uploadSrc?: string;
  original_width?: number;
  original_height?: number;
  signedUrl?: string;
  selected?: boolean;
  // id?: number;
}
