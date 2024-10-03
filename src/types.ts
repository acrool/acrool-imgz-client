
export interface IResize {
    width?: number
    height?: number
}


export interface ISquashOptions {
    resize?: IResize;
    quality?: number;
    // savePath?: string;
}
export type TFormat = 'jpg'|'png'|'webp';
