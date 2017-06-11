import './utils/extendCanvasContext';
import SpaceInvaders from './SpaceInvaders';

const canvas = document.getElementById('game');
if (canvas) new SpaceInvaders( canvas );
