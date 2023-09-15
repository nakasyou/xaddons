import * as fs from "fs/promises"
import * as path from 'path'

export const emptyDir = async (targetPath: string) => {
  if (await existsDir(targetPath)) {
    rmDir(targetPath)
  } else {
    await fs.mkdir(targetPath)
  }
}

export const existsDir = async (path: string): Promise<boolean> => {
  try {
    const data = await fs.stat(path)
    if (data.isDirectory()) {
      return true
    }
  } catch (_error) {}
  return false
}

async function rmDir (dirPath: string): Promise<void> {
    const dirEntries = await fs.readdir(dirPath);
    for (const entry of dirEntries) {
      const entryPath = `${dirPath}/${entry}`;
      const stats = await fs.lstat(entryPath);

      if (stats.isDirectory()) {
        // ディレクトリの場合、再帰的に削除
        await rmDir(entryPath);
        await fs.rmdir(entryPath);
      } else {
        // ファイルの場合、削除
        await fs.unlink(entryPath);
      }
    }
}