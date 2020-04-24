import dateFormat from '../utils/dateFormat.js';

export default class CommitCard {

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

