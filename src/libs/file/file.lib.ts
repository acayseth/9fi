import {resolve} from "path";
import * as fs from "fs";

export type FileDirType = 'founds' | 'sent';

export class File {

  public exists(filename: string, dir: FileDirType) {
    return fs.existsSync(this.path(filename, dir));
  }

  public create(filename: string, dir: FileDirType) {
    return fs.writeFileSync(this.path(filename, dir), '');
  }

  public delete(filename: string, dir: FileDirType) {
    fs.rmSync(this.path(filename, dir));
  }

  public move(filename: string) {
    this.create(filename, 'sent');
    this.delete(filename, 'founds')
  }

  private path(filename: string, dir: FileDirType) {
    return resolve(process.cwd(), 'storage', dir, filename);
  }

}
