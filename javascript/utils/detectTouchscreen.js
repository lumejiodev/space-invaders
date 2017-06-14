window.addEventListener( 'touchstart', function setTouchscreenClass() {
    document.documentElement.className += ' has-touchscreen';
    window.removeEventListener( 'touchstart', setTouchscreenClass );
});
