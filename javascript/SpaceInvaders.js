import { CanvasWidth, CanvasHeight } from './constants/Sizes';
import { FontSize, FontFamily } from './constants/Typography';
import requestAnimationFrame from './utils/requestAnimationFrame';
import SoundPlayer from './sounds/SoundPlayer';

import Background from './elements/Background';
import Player from './elements/Player';
import Enemies from './elements/Enemies';
import Frame from './elements/Frame';
import Score from './elements/Score';
import GameOverScreen from './elements/GameOver';

export default class SpaceInvaders {
    elements = [];

    constructor( canvas ) {
        this.canvas = canvas;
        this.initCanvasSizes();
        this.initSounds();
        this.initGame();
    }

    initCanvasSizes() {
        this.setCanvasSizes();
        window.addEventListener( 'resize', ::this.setCanvasSizes );
    }

    setCanvasSizes() {
        this.canvas.setDimensions( CanvasWidth, CanvasHeight, false, true );
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmooth( false );
        this.ctx.font = FontSize + ' ' + FontFamily;
        this.ctx.textBaseline = 'top';
    }

    initSounds() {
        SoundPlayer.load( 'fire' );
        SoundPlayer.load( 'killed' );
        SoundPlayer.load( 'explosion' );
        SoundPlayer.load( 'ufo' );
    }

    initGame() {
        this.addElement( Background );
        this.addElement( Player );
        this.addElement( Enemies );
        this.addElement( Frame );
        this.addElement( Score );
        this.running = true;
        requestAnimationFrame( this.renderFrame );
    }

    endGame() {
        this.addElement( GameOverScreen );
        this.running = false;
    }

    addElement( Element ) {
        this.elements.push( new Element( this ) );
    }

    updatePositions() {
        this.elements.forEach( item => item.update() );
    }

    renderElements() {
        this.elements.forEach( item => item.render() );
    }

    renderFrame = () => {
        this.ctx.clearCanvas();
        this.updatePositions();
        this.renderElements();

        if (this.running) {
            requestAnimationFrame( this.renderFrame );
        }
    };
}
