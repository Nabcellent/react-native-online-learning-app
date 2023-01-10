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

export type ClassType = {
    id: number,
    label: string
    icon: ImageSourcePropType
}

export type ClassLevel = {
    id: number
    label: string
}

export type CreatedWithin = {
    id: number
    label: string
}