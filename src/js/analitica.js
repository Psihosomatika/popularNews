import '../pages/index.css';
const MS_IN_DAY = 86400000;//или лучше формулой?

const data = JSON.parse(localStorage.getItem('info'));
const keyWord = localStorage.getItem('findingWord');
const resultKeyWord = document.querySelector('keyword');//searchPharase
const numberOfNewsItems = document.querySelector('number-of-news-items');//weecCount
const month = document.querySelector('month');//diagramMonth
const mentions = document.querySelector('mentions');//titleCount
const weekday = document.querySelector('weekday');//день недели diagramDate
const graph = document.querySelector('graph');//синяя полоса
const item = document.querySelector('item');//количество упоминаний в день graph (и полоса и число)

resultKeyWord.textContent = '«' + localStorage.getItem('findingWord') + '»';
numberOfNewsItems.textContent = data.totalResults;
mentions.textContent = (keyWord, data.articles);
month.textContent = '(' + showMonth() + ')';

function showMonth() {
  const theDesiredMonth = new Date(data.articles[0].publishedAt.slice(0,10));
  return theDesiredMonth.toLocaleDateString('ru', { month: 'long' })
}
//countPharse
function theCountingOfReferences(key, articles) {
  let count = 0;
  articles.forEach((i) => {
    i.title = i.title.toLowerCase();
    key = key.toLowerCase();
    if(i.title.includes(key)) {
      return count++;
    }
  })
  return count;
}

function mentionsPerDay() {
  const days = {};
  data.articles.forEach((article) => {
    const daysMention = new Date(article.publishedAt.slice(0,10)).getDate();
    if (daysMention in days) {
      days[daysMention]++;
    } else {
      days[daysMention] = 1;
    }
  })
  renderGraph(days);
}

function dates() {
  const daysAgo = 6;
  const dateObj = [];
  for (let i = daysAgo; i>=0; i=i-1) {
    const day = new Date(new Date().getTime()-(i*MS_IN_DAY)).toLocaleDateString('ru', {day: 'numeric'});
    const date = new Date(new Date().getTime()-(i*MS_IN_DAY)).toLocaleDateString('ru', {weekday: 'short'});
    const format = day + ', ' + date;
    dateObj.push(format);
  }
  renderDates(dateObj);
}
//заполнение дня недели
function renderDates(arr) {
  arr.forEach((date, index) => {
    weekday[index].textContent = date;
  })
}

function renderGraph(obj) {
  for(let i = 0; i < Object.values(obj).length; i++) {

    item[i].textContent = Object.values(obj)[i];
    const statisticalSeries = Object.values(obj)[i]/data.totalResults*100;
    graph[i].style.width = `${statisticalSeries}`
  }
}

dates();
mentionsPerDay();
