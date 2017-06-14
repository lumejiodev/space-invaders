import Element from './Element';
import PlayerSprite from '../sprites/Player';
import PlayerBullet from './partials/PlayerBullet';
import SoundPlayer from '../sounds/SoundPlayer';
import { easeOutCirc } from '../utils/easings';
import { FrameWidth, FieldWidth, PlayerTopPosition } from '../constants/Sizes';
import { KeyLeft, KeyRight, KeySpace } from '../constants/Keys';
import { PlayerExplosionTime } from '../constants/Time';

export default class Player extends Element {
    constructor( ...args ) {
        super( ...args );

        this.pos = 0.5; // положение от 0 до 1
        this.step = 0.01;
        this.stepInterval = 16;
        this.maxPos = FieldWidth - this.spriteWidth;

        this.exploding = false;
        this.explodeStamp = Date.now();

        PlayerBullet.prototype.ctx = this.ctx;

        this.initUserControl();
    }

    attachSprite() {
        this.spriteWidth = 52;
        this.spriteHeight = 32;
        this.sprite = new PlayerSprite( this.ctx, this.spriteWidth, this.spriteHeight );
    }

    initUserControl() {
        // todo Вынести обработку пользовательских действий в отдельный класс
        this.moveTimer = null;
        this.moveDirection = false;
        window.addEventListener( 'keydown', e => {
            if (this.exploding) {
                // ничего не делать
            } else if (e.keyCode === KeyLeft || e.keyCode === KeyRight) {
                if (e.keyCode !== this.moveDirection) {
                    clearTimeout( this.moveTimer );
                    this.moveDirection = e.keyCode;
                    this.positionStep();
                }
            } else if (e.keyCode === KeySpace) {
                this.fire();
            }
        });
        window.addEventListener( 'keyup', e => {
            if (this.exploding) {
                // ничего не делать
            } else if (e.keyCode === this.moveDirection) {
                this.moveDirection = false;
            }
        });
    }

    positionStep() {
        if (this.moveDirection === false) return;

        let step = this.moveDirection === KeyLeft ? -this.step : this.step;
        this.pos = Math.max( 0, Math.min( 1, this.pos + step ));
        this.moveTimer = setTimeout( ::this.positionStep, this.stepInterval );
    }

    fire() {
        if (this.bullet && this.bullet.alive) return;

        this.bullet = new PlayerBullet( this.position + this.spriteWidth/2, this.topPosition );
    }

    explode() {
        if (this.exploding) return;
            this.exploding = true;
            this.explodeStamp = Date.now();
        clearTimeout( this.moveTimer );
        setTimeout( () => { this.exploding = false }, PlayerExplosionTime );
        SoundPlayer.play( 'explosion' );
    }

    get position() {
        return FrameWidth + this.pos * this.maxPos;
    }

    get topPosition() {
        return PlayerTopPosition - this.spriteHeight;
    }

    update() {
        const { root, bullet } = this;
        if (bullet && bullet.alive) {
            bullet.updatePosition();
            if (bullet.alive) root.playerBullet = bullet; // выношу в рут, чтобы потом сравнивать в Enemies
        } else {
            root.playerBullet = null;
        }

        const { alienBullets } = this.root;
        if (alienBullets && alienBullets.length) {
            alienBullets.forEach( bullet => {
                if (bullet.alive &&
                    bullet.positionY + bullet.height > this.topPosition &&
                    bullet.positionY < this.topPosition + this.spriteHeight &&
                    bullet.positionX > this.position &&
                    bullet.positionX < this.position + this.spriteWidth) {
                    alienBullets.destroy( bullet );
                    this.explode();
                }
            });
        }
    }

    renderExplosion() {
        let { ctx } = this;
        let [ transX, transY ] = [ this.position + this.spriteWidth/2, this.topPosition + this.spriteHeight/2 ];
        let pos = (Date.now() - this.explodeStamp) / PlayerExplosionTime;

        ctx.save();
        ctx .trans( transX, transY )
            .scaleBoth( easeOutCirc( pos, 1, -1, 1 ) )
            .trans( -transX, -transY )
            .globalAlpha = 1 - pos;
        this.sprite.renderAt( this.position, this.topPosition );
        ctx.restore();
    }

    render() {
        if (this.exploding) {
            this.renderExplosion();
        } else {
            this.sprite.renderAt( this.position, this.topPosition );
        }

        if (this.bullet && this.bullet.alive) {
            this.bullet.render();
        }
    }
}
