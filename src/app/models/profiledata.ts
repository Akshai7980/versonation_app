import { SafeUrl } from "@angular/platform-browser";

export interface ProfileData {
    coverImageUrl:String | SafeUrl,
    profileImageUrl:String | SafeUrl,
    name:String,
    bestdescription:String,
    followers:string,
    bio:string
}

export interface IProfileImage {
    Image: string,
    followersCount: number,
    id: string,
    name: string,
    show?: boolean,
    timestamp?: number
}
