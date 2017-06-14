import { Sounds } from '../constants/Sounds';

const SoundsLibrary = {}; // static

export default class SoundPlayer {
    static play( sound ) {
        if (sound in SoundsLibrary && SoundsLibrary[sound].playable) {
            SoundsLibrary[sound].currentTime = 0;
            SoundsLibrary[sound].play();
        } else {
            SoundPlayer.load( sound, () => SoundPlayer.play( sound ) );
        }
    }

    static load( sound, callback = null ) {
        if (SoundsLibrary[sound]) return;

        let audio = new Audio( Sounds[sound] );
            audio.addEventListener( 'canplaythrough', function() {
                audio.playable = true;
                if (callback) callback();
            });
            audio.load();

        SoundsLibrary[sound] = audio;
    }
}
