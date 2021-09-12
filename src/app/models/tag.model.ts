import { Image } from './image.model'

export interface Tag {
  _id: string
  value: string
  images?: Image[]
  active?: boolean
}
