import { Tag } from "./tag.model";

export interface Image {
  _id: string;
  title?: string;
  oriWidth: number;
  oriHeight: number;
  ratio: number;
  signedUrl?: string;
  tags?: Tag[];
  albums?: string[];
  stars: number
}
