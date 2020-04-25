import dateFormat from '../utils/dateFormat';

//Класс для создания новой карточки
export default class NewsCard {

  createCard(link, image, date, title, description, source) {

    const card = document.createElement('li');
    card.classList.add('card');

    const cardLink = document.createElement('a');
    cardLink.classList.add('card__link');
    cardLink.setAttribute ('href',`${link}`);
    cardLink.setAttribute ('target','_blank');
    cardLink.setAttribute ('rel','noopener');

    if (image === null) {
      image = 'https://bananavape.ru/img/nophoto.jpg';
    }
    const cardImg = document.createElement('div');
    cardImg.classList.add('card__img');
    cardImg.setAttribute('style', `background-image:url('${image}')`);


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
    cardLabel.textContent = source;

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

