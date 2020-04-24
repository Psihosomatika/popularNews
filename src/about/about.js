//import '../pages/index.css';

//import Flickity from 'flickity';
/*
const slider = new Flickity('.carousel', {
  // Настройки плагина
  wrapAround: true,

});
*/
/*  cellAlign: 'centr',
contain: true,
freeScroll: true,
wrapAround: true,
groupCells: '90%',*/

const slider = document.querySelector('.carousel');
const GITHUB_URL = 'https://api.github.com/repos/Psihosomatika/popularNews/commits';
const MONTS_ARR = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

function dateFormat(date) {
  const cardDate = document.createElement('time');
  cardDate.setAttribute('datetime', date);
  let info = new Date(date);
  cardDate.textContent = info.getDate() + ' ' + MONTS_ARR[info.getMonth()] + ', ' + info.getFullYear();
  cardDate.classList.add('card__date');
  return cardDate;
}

class GithubApi {
  constructor(url) {
    this.url = url;
  }
  async getCommits() {
    console.log(this.url);
    const res = await fetch(this.url);
    return await (res.ok ? Promise.resolve(res.json()) : Promise.reject(`Ошибка: ${res.status}`));
  }
}
const githubApi = new GithubApi(GITHUB_URL);



class CommitCard {

  createCard(cardData) {
    const caruselCell = document.createElement('div');
    caruselCell.classList.add('carousel-cell');

    const position = document.createElement('div');
    position.classList.add('position');

    const cardDate = dateFormat(cardData.commit.author.date);

    const caruselBlock = document.createElement('div');
    caruselBlock.classList.add('carusel__block');

    const caruselPhoto = document.createElement('div');
    caruselPhoto.classList.add('carusel__photo');

    const caruselImg = document.createElement('img');
    caruselImg.classList.add('carusel__img');
    caruselImg.setAttribute('alt', 'Фотография того, кто оставил коммит');
    caruselImg.src = `${cardData.author.avatar_url}`;

    const caruselFlex = document.createElement('div');
    caruselFlex.classList.add('carusel__flex2');

    const caruselName = document.createElement('p');
    caruselName.classList.add('carusel__name');
    caruselName.textContent = cardData.commit.committer.name;

    const caruselEmail = document.createElement('p');
    caruselEmail.classList.add('carusel__email');
    caruselEmail.textContent = cardData.commit.committer.email;

    const caruselText = document.createElement('p');
    caruselText.classList.add('carusel__text');
    caruselText.textContent = cardData.commit.message;

    caruselCell.appendChild(position);
    position.appendChild(cardDate);
    position.appendChild(caruselBlock);
    position.appendChild(caruselText);
    caruselBlock.appendChild(caruselPhoto);
    caruselBlock.appendChild(caruselFlex);
    caruselPhoto.appendChild(caruselImg);
    caruselFlex.appendChild(caruselName);
    caruselFlex.appendChild(caruselEmail);

    return caruselCell;
  }
}
const commitCard = new CommitCard();

class CommitCardList {
  constructor(list) {
    this.list = list;
  }
  renderCards(card) {
    this.list.append(card);
  }
}
const commitsCardList = new CommitCardList(slider);

githubApi.getCommits()
.then((res) => {
  console.log(`res: ${res}`);
  res.forEach(cardData => commitsCardList.renderCards(commitCard.createCard(cardData)))
})
.catch((err) => {
  console.log(`err: ${err}`);
})

