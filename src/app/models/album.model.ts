import { Image } from "./image.model";

export interface Album {
  _id: string;
  title: string;
  rollId?: number;
  date?: number;
  images?: Image[];
  cover?: Image
}
