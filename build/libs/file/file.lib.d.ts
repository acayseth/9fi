export type FileDirType = 'founds' | 'sent';
export declare class File {
    exists(filename: string, dir: FileDirType): boolean;
    create(filename: string, dir: FileDirType): void;
    delete(filename: string, dir: FileDirType): void;
    move(filename: string): void;
    private path;
}
