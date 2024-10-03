
export interface IResize {
    width?: number
    height?: number
}

export interface ISquashOptions {
    resize?: IResize;
    quality?: number;
}
export type TFormat = 'jpg'|'png'|'webp';


export interface IClientOptions {
    quality?: number;
    timeout?: number;
}
