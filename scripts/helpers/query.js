export class Query {
  constructor(data) {
    this._data = data
  }

  async fetch() {
    try {
      const response = await fetch(this._data)
      const data = await response.json()
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
}