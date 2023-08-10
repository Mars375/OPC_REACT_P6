import { PhotographerCard } from "../templates/PhotographerCard.js"

export class CardFactory {
  constructor(data, type) {
    this.data = data
    this.type = type

    return this.type === 'photographer' ? new PhotographerCard(this.data) : new MediaCard(this.data)
  }
}