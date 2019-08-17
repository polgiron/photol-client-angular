import { Image } from "./image.model";

export interface Tag {
  _id: number;
  value: string;
  images?: Image[];
}
