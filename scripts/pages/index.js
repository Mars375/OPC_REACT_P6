import { Query } from '../helpers/query.js'
import { Loader } from '../components/Loader.js'
import { GetPhotographer } from '../models/getPhotographer.js'
import { CardFactory } from '../factories/cardFactory.js'

class App {
  constructor() {
    const link = '/P6/data/photographers.json'
    this.query = new Query(link)
    this.photographerSection = document.querySelector('.photographer_section')
    this.spinnerLoader = new Loader()
  }

  async getPhotographers() {
    const data = await this.query.fetch()
    return data['photographers']
  }

  displayPhotographers(photographers) {
    photographers
      .map(photographer => new GetPhotographer(photographer))
      .forEach(photographer => {
        const template = new CardFactory(photographer, 'photographer')
        const card = template.createCard()
        this.photographerSection.append(card)
      })
    this.spinnerLoader.hide()
  }

  async init() {
    this.spinnerLoader.show()
    const photographers = await this.getPhotographers()
    this.displayPhotographers(photographers)
  }
}

const app = new App();
app.init() 