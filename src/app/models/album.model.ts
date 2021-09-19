import { Image } from './image.model'

export interface Album {
  _id: string
  title: string
  rollId: number
  date?: number
  images?: Image[]
  // covers?: Image[]
}

export interface OneAlbum extends Album {
  covers: string[]
}

export interface MultipleAlbum extends Album {
  covers: Image[]
}
