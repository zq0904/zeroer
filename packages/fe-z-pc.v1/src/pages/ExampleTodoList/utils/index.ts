export class LsHelp {
  constructor (private name: string) {}
  set<T extends any> (v: T) {
    try {
      localStorage.setItem(this.name, JSON.stringify({ v }))
    } catch (err) {
      console.error(err)
    }
    return v
  }

  get () {
    let res = null
    try {
      // @ts-ignore
      res = JSON.parse(localStorage.getItem(this.name)).v
    } catch (err) {
      console.error(err)
    }
    return res
  }
}
