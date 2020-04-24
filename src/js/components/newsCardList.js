import {resultBtn, NUMBER_OF_CARDS} from '../constants/constants.js';

export default class NewsSearchResult {


  constructor(list){
    this.list = list;
    this.numberOfCards = NUMBER_OF_CARDS;
    this.lastCard = 0; //последняя карта
  }
  _availabilityOfCards(data, card) {
    if (data.length > this.lastCard) {
      resultBtn.classList.add('result__btn_on') //класс, который отображает кнопку показать еще
      resultBtn.onclick = () => this.render(data,card);
    } else {
      resultBtn.classList.remove('result__btn_on');
    }
  }

  deleteCards () {
    while (this.list.firstChild) {
      this.list.removeChild(this.list.firstChild);
    }
  }

  render(data, card) {
    const articles = data;
    for (let i = this.lastCard; i < Math.min(this.lastCard + this.numberOfCards, articles.length); i++) {
      const article = articles[i];
      this.list.appendChild (card.createCard(
        article.url,
        article.urlToImage,
        article.publishedAt,
        article.title,
        article.description,
        article.source.name,
      ));
    }
    this.lastCard = this.lastCard + this.numberOfCards;
    this._availabilityOfCards(data, card);
  }

}
