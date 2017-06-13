import AlienBulletSprite from '../../sprites/AlienBullet';
import { AlienBulletWidth, AlienBulletHeight } from '../../constants/Sizes';

export default class AlienBullet {
    constructor( ctx, x, y, speed ) {
        this.ctx = ctx;
        this.positionX = x;
        this.positionY = y;
        this.speed = speed;

        this.alive = true;
        this.sprite = new AlienBulletSprite( ctx, AlienBulletWidth, AlienBulletHeight );
        this.sprite.stateTick = 300;
    }

    render() {
        this.sprite.renderAt( this.positionX, this.positionY );
    }
}
