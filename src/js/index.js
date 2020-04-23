//import '../pages/index.css';
const infoForm = document.querySelector('.info'); // сама форма
const infoInput = document.querySelector('.info__input'); //поле ввода
const infoBtn = document.querySelector('.info__btn'); // кнопка формы
const cardsNothingFound = document.querySelector('.cards__nothing-found'); // блок Ничего не найдено (нет результатов поиска)
const cardsSearsc = document.querySelector('.cards__searsc'); //крутилка
const cards = document.querySelector('.cards');// ul для li с новостями. Куда помещаются новости
const result = document.querySelector('.result'); //общий блок с результатами поиска
const serverError = document.querySelector('.server__error'); // если что-то пошло не так.

//блок поиска карточек
const NUMBER_OF_CARDS = 3;
const resultBtn = document.querySelector('.result__btn');
const MONTS_ARR = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

function dateFormat(date) {
  const cardDate = document.createElement('time');
  cardDate.setAttribute('datetime', date);
  let info = new Date(date);
  cardDate.textContent = info.getDate() + ' ' + MONTS_ARR[info.getMonth()] + ', ' + info.getFullYear();
  cardDate.classList.add('card__date');
  return cardDate;
}

class NewsSearchResult {
  consrtuctor (list) {
    this.list = list;
    this.mumberOfCards = NUMBER_OF_CARDS;
    this.lastCard = 0;
  }
  _availabilityOfCards(data, card) {
    if (this.lastCard < data.length) {
      resultBtn.classList.add('.result__btn_on') //класс, который отображает кнопку показать еще
      resultBtn.onclick = () => this.render(data,card);
    } else {
      resultBtn.classList.remove('.result__btn_on');
    }
  }
  deleteCards () {
    debugger;
    while (this.list.firstChild) {
      this.list.removeChild(this.list.firstChild);
    }
  }

  render(data, card) {
    const articles = data;
    for (let i = this.lastCard; i < Math.min(this.lastCard + this.numberOfCards, articles.length); i++) {
      const article = articles[i];
      this.list.appendChild (card.createdCard(
        article.url,
        article.urlToImage,
        article.publishedAt,
        article.title,
        article.description,
        article.source.name,
      ));
    }
    this.lastCard = this.lastCard + this.numberOfCards;
    this._checkBalance(data,card);
  }

}
const newsSearchResult = new NewsSearchResult(cards); //searchResult

class NewsCard {
  createCard(link, image, date, title, description, label) {
    const card = document.createElement('li');
    card.classList.add('card');

    const cardLink = document.createElement('a');
    cardLink.classList.add('card__link');
    cardLink.setAttribute ('href',`${link}`);
    cardLink.setAttribute ('target','_blank');
    cardLink.setAttribute ('rel','noopener');

    const cardImg = document.createElement('div');
    cardImg.classList.add('card__img');
    cardImg.setAttribute('style', `background-image:url(${image})`);

    const cardDate = dateFormat(date);

    const cardBlock = document.createElement('div');
    cardBlock.classList.add('card__block');

    const cardTitle = document.createElement('h3');
    cardTitle.classList.add('card__title');
    cardTitle.textContent = title;

    const cardText = document.createElement('p');
    cardText.classList.add('card__text');
    cardText.textContent = description;

    const cardLabel = document.createElement('span');
    cardLabel.classList.add('card__label');
    cardLabel.textContent = label;

    card.appendChild(cardLink);
    cardLink.appendChild(cardImg);
    cardLink.appendChild(cardDate);
    cardLink.appendChild(cardBlock);
    cardBlock.appendChild(cardTitle);
    cardBlock.appendChild(cardText);
    cardBlock.appendChild(cardLabel);

    return card;
  }
}
const newsCard = new NewsCard();

//newsapi
const KEY = 'da509dbac2d74492a4498c044ca28d18';
const URL_START = 'http://newsapi.org/v2/everything?q=';
const URL_END = 'sortBy=popularity&apiKey=' + KEY;

const MS_IN_DAY = 86400000;//или лучше формулой?
class NewsApi {
  constructor (baseUrl, parameters) {
    this.baseUrl = baseUrl;
    this.parameters = parameters;
  }
  async getNews(searchWord) {
    const currentDate = new Date();
    const previousDateInMs = 6 * MS_IN_DAY;
    const previousDate = new Date(currentDate.getTime()-previousDateInMs);
    const fromDate = previousDate.toISOString().slice(0, 10);
    const toDate = currentDate.toISOString().slice(0,10);

    const res = await fetch(`${this.baseUrl}${searchWord}$from=${fromDate}&to=${toDate}&language=ru&${this.parameters}`);
    return await (res.ok ? Promise.resolve(res.json()) : Promise.reject(`Ошибка: ${res.status}`));
  }
}
const newsApi = new NewsApi(URL_START, URL_END);



//валидация
function validateInput() {
  if (infoInput === ""){
    infoInput.setCustomValidity('Введите ключевое слово');
    return false;
  } else {
    infoInput.setCustomValidity('');
    return true;
  }
};
//отрисовать крутилку
function renderPreloader (isLoading) {
  if (isLoading) {
    cardsSearsc.classList.add('cards__search_on');
  } else {
    cardsSearsc.classList.remove('cards__search_on');
  }
};
//
function handlerSearch() {
  debugger;
  localStorage.clear();
  newsSearchResult.deleteCards();
  event.preventDefault();
  result.classList.add('result_on');
  renderPreloader(true);
  cardsNothingFound.classList.remove('cards__nothing-found_on');
  serverError.classList.remove('server__error_on');
  infoBtn.setAttribute('disabled', true);
  infoInput.setAttribute('disabled', true);

  if (validateInput()) {

    newsApi.getNews(infoInput.value)

    .then((res) => {
      checkResult(res.articles);
      trasferData(infoInput.value, res);
    })

    .catch((err) => {
      console.log(err);
      result.classList.remove('result_on');
      serverError.classList.add('server__error_on');
      cardsNothingFound.classList.remove('cards__nothing-found_on');
    })

    .finally (() => {
      infoBtn.removeAttribute('disabled');
      infoInput.removeAttribute('disabled');
      renderPreloader(false);
    })

  } else {
    result.classList.remove('result_on');
    infoBtn.removeAttribute('disabled');
    renderPreloader(false);
  }
};

function checkResult (res) {
  if (res.length == 0) {
    localStorage.clear();
    cardsNothingFound.classList.add('cards__nothing-found_on');
    serverError.classList.remove('server__error_on');
    result.classList.remove('result_on');
  } else {
    cardsNothingFound.classList.remove('cards__nothing-found_on');
    result.classList.add('result_on');
    newsSearchResult.render(res, newsCard);
  }
};

function trasferData(word, data) {
  const apiInfo = JSON.stringify(data);
  localStorage.clear();
  localStorage.setItem('info', apiInfo);
  localStorage.setItem('findingWord', word);
}

//tckb перезагрузка

if(localStorage.getItem('info') !== null) {
  infoInput.value = localStorage.getItem('findingWord');
  result.classList.add('result_on');
  checkResult(JSON.parse(localStorage.getItem('info')).articles);
}

infoInput.addEventListener('input', validateInput);
infoForm.addEventListener('submit', handlerSearch);
