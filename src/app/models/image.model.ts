import { Album } from './album.model'
import { Tag } from './tag.model'

export interface Image {
  _id: string
  title?: string
  date?: string
  oriWidth: number
  oriHeight: number
  ratio: number
  signedUrl?: string
  tags?: Tag[]
  // albums?: Album[] & string[]
  stars: number
  toPrint: boolean
  public: boolean
  darkroomSettingDuration: number
  darkroomSettingContrast: number
  darkroomSettingAperture: number
  note: string
  rollId: number
  albumId: string
}

export enum ImageSize {
  SMALL = 'SMALL',
  BIG = 'BIG'
}
