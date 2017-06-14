import { PlayerBulletColor } from '../../constants/Colors';
import { PlayerBulletWidth, PlayerBulletHeight } from '../../constants/Sizes';
import SoundPlayer from '../../sounds/SoundPlayer';

export default function PlayerBullet( position, topAnchor ) {
    const topPosition = topAnchor - PlayerBulletHeight;
    const fireTime = Date.now();

    this.positionX = position;
    this.positionY = topPosition;

    SoundPlayer.play( 'fire' );

    this.destroy = function() {
        this.alive = false;
    };

    this.getRelativePosition = function() {
        return (Date.now() - fireTime) / this.speed;
    };

    this.updatePosition = function() {
        const relativePosition = this.getRelativePosition();
        if (relativePosition > 1) {
            this.alive = false;
        } else {
            this.positionY = (topPosition + PlayerBulletHeight) * (1 - relativePosition) - PlayerBulletHeight;
        }
    };

    this.render = function() {
        this.ctx
            .style( PlayerBulletColor )
            .fR( position, this.positionY, PlayerBulletWidth, PlayerBulletHeight );
    };
}

PlayerBullet.prototype.alive = true;
PlayerBullet.prototype.speed = 1000;
