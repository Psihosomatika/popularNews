//newsapi
export const URL_START = 'https://newsapi.org/v2/everything?q=';
export const URL_END = 'sortBy=popularity&pageSize=100&apiKey=da509dbac2d74492a4498c044ca28d18';

//список карточек
export const NUMBER_OF_CARDS = 3;
// дата
export const MS_IN_DAY = 86400000;//или лучше формулой?
//GithubApi
export const GITHUB_URL = 'https://api.github.com/repos/Psihosomatika/popularNews/commits';

export const MONTS_ARR = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

export const cards = document.querySelector('.cards');// ul для li с новостями. Куда помещаются новости
export const serverError = document.querySelector('.server__error'); // если что-то пошло не так. +
export const resultBtn = document.querySelector('.result__btn');//показать еще

export const infoForm = document.querySelector('.info'); // сама форма
export const infoInput = document.querySelector('.info__input'); //поле ввода
export const infoBtn = document.querySelector('.info__btn'); // кнопка формы
export const cardsNothingFound = document.querySelector('.cards__nothing-found'); // блок Ничего не найдено (нет результатов поиска)
export const cardsSearsc = document.querySelector('.cards__searsc'); //крутилка
export const result = document.querySelector('.result'); //общий блок с результатами поиска

export const data = JSON.parse(localStorage.getItem('info'));
export const keyWord = localStorage.getItem('findingWord');
export const resultKeyWord = document.querySelector('.keyword');//searchPharase
export const numberOfNewsItems = document.querySelector('.number-of-news-items');//weecCount
export const month = document.querySelector('.month');//diagramMonth
export const mentions = document.querySelector('.mentions');//titleCount
export const weekday = document.querySelectorAll('.weekday');//день недели diagramDate
export const graph = document.querySelectorAll('.graph');//синяя полоса
export const item = document.querySelectorAll('.item');//количество упоминаний в день graph (и полоса и число)
