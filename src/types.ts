export interface IImgzClientOptions {
    resize?: {
        width?: number,
        height?: number
    },
    quality?: number,
    timeout?: number,
}

export type TFormat = 'jpg'|'png'|'webp';
