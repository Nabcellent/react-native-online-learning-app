import { ImageSourcePropType } from "react-native";

export type Category = {
    id: number,
    title: string,
    thumbnail: ImageSourcePropType
}

export type Course = {
    id: number
    title: string
    duration: string
    instructor?: string
    ratings?: number
    price?: number
    is_favourite?: boolean
    thumbnail: ImageSourcePropType
}