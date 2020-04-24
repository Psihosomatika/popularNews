import { MONTS_ARR } from '../constants/constants.js';

export default function dateFormat(date) {
  const cardDate = document.createElement('time');
  cardDate.setAttribute('datetime', date);
  let info = new Date(date);
  cardDate.textContent = info.getDate() + ' ' + MONTS_ARR[info.getMonth()] + ', ' + info.getFullYear();
  cardDate.classList.add('card__date');
  return cardDate;
}
