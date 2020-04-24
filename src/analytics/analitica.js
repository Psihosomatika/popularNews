import '../pages/index.css';
import {MS_IN_DAY, data, keyWord, resultKeyWord, numberOfNewsItems, month, mentions, weekday, graph, item } from '../js/constants/constants.js';

resultKeyWord.textContent = '«' + localStorage.getItem('findingWord') + '»';
numberOfNewsItems.textContent = data.totalResults;
mentions.textContent = theCountingOfReferences(keyWord, data.articles);
month.textContent = '(' + showMonth() + ')';

function showMonth() {
  const theDesiredMonth = new Date(data.articles[0].publishedAt.slice(0,10));
  return theDesiredMonth.toLocaleDateString('ru', { month: 'long' })
}

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
  const arrDay = Object.values(obj);
  function getMaxOfArray(arrDay) {
    return Math.max.apply(null, arrDay);
  }
  let max = getMaxOfArray(arrDay);
  for(let i = 0; i < Object.values(obj).length; i++) {
    item[i].textContent = Object.values(obj)[i];
    const statisticalSeries = Object.values(obj)[i]/max*100;
    console.log(`${statisticalSeries}%`);
    graph[i].style.width = `${statisticalSeries}%`
  }
}

dates();
mentionsPerDay();
