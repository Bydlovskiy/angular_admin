import { Data } from "@angular/router";

export interface IPostRequest {
    title:string,
    text : string,
    author : string,
    date : Data,
    imagePath :string
}

export interface IPostResponse {
    id :number
    title:string,
    text : string,
    author : string,
    date : string,
    imagePath :string
}