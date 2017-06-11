// Aliases
const CanvasProto = HTMLCanvasElement.prototype;
const CanvasContextProto = CanvasRenderingContext2D.prototype;

CanvasContextProto.clearCanvas = function(){
    let { width, height } = this.canvas;
    return this.clearRect( 0, 0, width, height ) && this;
};

CanvasContextProto.R = function( x, y, w = 1, h = 1 ) {
    return this.rect( x, y, w, h ) && this;
};

CanvasContextProto.fR = function( x, y, w = 1, h = 1 ) {
    return this.fillRect( x, y, w, h ) && this;
};

CanvasContextProto.cR = function( x, y, w = 1, h = 1 ) {
    return this.clearRect( x, y, w, h ) && this;
};

CanvasContextProto.move = function( x, y ) {
    return this.moveTo( x, y ) && this;
};

CanvasContextProto.line = function( x, y ) {
    return this.lineTo( x, y ) && this;
};

CanvasContextProto.trans = function( x, y ) {
    return this.translate( x, y ) && this;
};

CanvasContextProto.bezier = function( x1, y1, x2, y2, x, y ) {
    return this.bezierCurveTo( x1, y1, x2, y2, x, y ) && this;
};

CanvasContextProto.begin = function(){
    return this.beginPath() && this;
};

CanvasContextProto.close = function(){
    return this.closePath() && this;
};

CanvasContextProto.style = function( color = 'black', type = 'fill' ) {
    return (this[ type + 'Style'] = color) && this;
};

CanvasContextProto.drawArc = function( x, y, r, fill ) {
    this.begin().arc( x, y, r, 0, Math.PI*2, true );
    this.close()[ fill ? 'fill' : 'stroke']();
    return this;
};

CanvasContextProto.text = function( text, x, y ) {
    return this.fillText( text, x, y ) && this;
};

CanvasContextProto.imageSmooth = function( value = false ){
    this.imageSmoothingEnabled = value;
    this.msImageSmoothingEnabled = value;
    this.mozImageSmoothingEnabled = value;
    this.webkitImageSmoothingEnabled = value;
    return this;
};

CanvasProto.setDimensions = function( width, height, saveColors = true, retina ) {
    var ctx, fill, stroke, pixelRatio;
        ctx = this.getContext('2d');
        ctx.retina = this.retina = !!retina;

        pixelRatio = retina ? window.devicePixelRatio || 1 : 1;

    // проверяем - нужно ли вообще что-то изменять
    if (this.width === width * pixelRatio &&
        this.height === height * pixelRatio) {
        return;
    }

    if (saveColors) {
        fill = ctx.fillStyle;
        stroke = ctx.strokeStyle;
    }

    if (width) {
        this.style.width = width + 'px';
        this.width = width * pixelRatio;
    }

    if (height) {
        this.style.height = height + 'px';
        this.height = height * pixelRatio;
    }

    if (retina) ctx.scale( pixelRatio, pixelRatio );

    if (saveColors) {
        ctx = this.getContext('2d');
        ctx.fillStyle = fill;
        ctx.strokeStyle = stroke;
    }
};
