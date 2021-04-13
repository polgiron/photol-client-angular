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
  albums?: Album[] & string[]
  stars: number
  toPrint: boolean
  public: boolean
  darkroomSettings: DarkroomSettings
}

export interface DarkroomSettings {
  duration: number
  contrast: number
  aperture: number
  note: string
}

export interface FlickerBox {
  aspectRatio: number
  height: number
  left: number
  top: number
  width: number
}
