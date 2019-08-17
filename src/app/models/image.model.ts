import { Tag } from "./tag.model";

export interface Image {
  _id: number,
  title?: string;
  oriWidth?: number;
  oriHeight?: number;
  signedUrl?: string;
  favorite?: boolean;
  tags?: Tag[]
}
