import './pages/index.css';

import NewsSearchResult from './js/components/newsCardList.js';
import NewsCard from './js/components/newsCard';
import NewsApi from './js/modules/newsApi';
import { URL_START, URL_END, cards, infoForm, infoInput, infoBtn, cardsNothingFound, cardsSearsc, result, serverError } from './js/constants/constants.js';

const newsCard = new NewsCard();
const newsSearchResult = new NewsSearchResult(cards);
const newsApi = new NewsApi(URL_START, URL_END);
//валидация
function validateInput() {
  if (infoInput.value === ""){
    infoInput.setCustomValidity('Нужно ввести ключевое слово');
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
  localStorage.clear();

  newsSearchResult.deleteCards();
  event.preventDefault();
  result.classList.add('result_on');
  renderPreloader(true);
  cardsNothingFound.classList.remove('cards__nothing-found_on');
  serverError.classList.remove('server__error_on');
  infoBtn.setAttribute('disabled', true);

  if (validateInput()) {
    newsApi.getNews(infoInput.value)

    .then((resultat) => {
      checkResult(resultat.articles);
      trasferData(infoInput.value, resultat);
    })

    .catch((err) => {
      console.log(err);
      result.classList.add('result_on');
      serverError.classList.add('server__error_on');
      cardsNothingFound.classList.remove('cards__nothing-found_on');
    })

    .finally (() => {
      infoBtn.removeAttribute('disabled');
      infoInput.removeAttribute('disabled');
      renderPreloader(false);
    })

  } else {
    infoBtn.removeAttribute('disabled');
    renderPreloader(false);
    result.classList.remove('result_on');
  }
};

function checkResult(resultat) {
  if (resultat.length == 0) {

    localStorage.clear();
    cardsNothingFound.classList.add('cards__nothing-found_on');
    serverError.classList.remove('server__error_on');
    result.classList.remove('result_on');
  } else {
    cardsNothingFound.classList.remove('cards__nothing-found_on');
    result.classList.add('result_on');
    newsSearchResult.render(resultat, newsCard);
  }
};

function trasferData(word, data) {
  const apiInfo = JSON.stringify(data);

  localStorage.clear();
  localStorage.setItem('info', apiInfo);
  localStorage.setItem('findingWord', word);
}
//перезагрузка
if(localStorage.getItem('info') !== null) {
  infoInput.value = localStorage.getItem('findingWord');
  const cardsInfo = JSON.parse(localStorage.getItem('info'));
  result.classList.add('result_on');
  checkResult(cardsInfo.articles);
}

infoInput.addEventListener('input', validateInput);
infoForm.addEventListener('submit', handlerSearch);
