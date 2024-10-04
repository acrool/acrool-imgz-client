
export interface IResize {
    width?: number
    height?: number
    maintainAspectRatio?: 'width'|'height'|'min'|'max';
    ignoreOverSize?: boolean;
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
