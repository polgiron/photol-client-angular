import { Image } from "./image.model";

export interface Album {
  _id: number;
  title: string;
  rollId?: number;
  date?: number;
  images?: Image[];
  cover?: Image
}
