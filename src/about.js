import './pages/index.css';
import Flickity from 'flickity';

const slider = new Flickity('.carousel', {
  // Настройки плагина
  cellAlign: 'centr',
  contain: true,
  freeScroll: true,
  wrapAround: true,
  groupCells: '90%',
});
