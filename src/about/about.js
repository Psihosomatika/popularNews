import '../pages/index.css';

import Flickity from 'flickity';

import GithubApi from '../js/modules/githubApi.js';
import CommitCard from '../js/components/commitCard.js'
import CommitCardList from '../js/components/commitCardList.js';
import {GITHUB_URL} from '../js/constants/constants.js';

const slider = new Flickity('.carousel', {
  wrapAround: true,
  /*  cellAlign: 'centr',
  contain: true,
  freeScroll: true,
  wrapAround: true,
  groupCells: '90%',*/
});
const commitsCardList = new CommitCardList(slider);
const githubApi = new GithubApi(GITHUB_URL);
const commitCard = new CommitCard();

githubApi.getCommits()
.then((res) => {
  res.forEach(cardData => commitsCardList.renderCards(commitCard.createCard(cardData)))
})
.catch((err) => {
  console.log(`err: ${err}`);
})
