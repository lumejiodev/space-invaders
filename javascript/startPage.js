import SpaceInvaders from './SpaceInvaders';

const screen0       = document.getElementById('screen-0');
const screen1       = document.getElementById('screen-1');
const buttonNext    = document.querySelector('[rel="next"]');
const buttonStart   = document.querySelector('[rel="start"]');
const gameCanvas    = document.getElementById('game');

buttonNext.addEventListener( 'click', e => {
    screen0.style.display = 'none';
    screen1.style.display = '';
});

buttonStart.addEventListener( 'click', e => {
    screen1.style.display = 'none';
    gameCanvas.style.display = '';

    new SpaceInvaders( gameCanvas );
});
