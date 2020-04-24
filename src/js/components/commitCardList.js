export default class CommitCardList {
  constructor(list) {
    this.list = list;
    this.renderCards = this.renderCards.bind(this);
  }
  renderCards(caruselCell) {
    this.list.append(caruselCell);
  }
}
