import fs = require('fs')

export const clearConsole = () => process.stdout.write(process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H')

// 主要解决 ts 对直接使用 for in 的类型校验问题
export const helpForIn = <T extends { [s: string]: any }>(cb: (key: Extract<keyof T, string>) => any, obj: T) => { 
  for (const key in obj) cb(key)
}

const readFileP = (path: string) => new Promise<string>((resolve, reject) => {
  fs.readFile(path, (err, data) => {
    if (err) return reject(err)
    resolve(data.toString())
  })
})

const writeFileP = (path: string, data: any) => new Promise((resolve, reject) => {
  fs.writeFile(path, data, err => {
    if (err) return reject(err)
    resolve()
  })
})

export const modifyFileP = (path: string, field: string, val: string | number) => new Promise(async (resolve, reject) => {
  const res = await readFileP(path)
  const regExp = new RegExp(`^([\\s\\S]*?${field}\\s*=\\s*)(\\d+)([\\s\\S]*)$`)
  await writeFileP(path, res.replace(regExp, `$1${val}$3`))
  resolve()
})
