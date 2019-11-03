import { Tag } from "./tag.model";

export interface Image {
  _id: string;
  title?: string;
  oriWidth: number;
  oriHeight: number;
  ratio: number;
  signedUrl?: string;
  tags?: Tag[];
  stars: number
}

// export class Image {
//   _id: number;
//   title?: string;
//   oriWidth: number;
//   oriHeight: number;
//   ratio: number;
//   signedUrl?: string;
//   favorite?: boolean;
//   tags?: Tag[];

//   constructor(data: any) {
//     this.ratio = data.oriWidth / data.oriHeight;
//   }
// }
