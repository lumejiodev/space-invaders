// Aliases
const CanvasProto = HTMLCanvasElement.prototype;
const CanvasContextProto = CanvasRenderingContext2D.prototype;

CanvasContextProto.clearCanvas = function(){
    let { width, height } = this.canvas;
    this.clearRect( 0, 0, width, height );
    return this;
};

CanvasContextProto.R = function( x, y, w = 1, h = 1 ) {
    this.rect( x, y, w, h );
    return this;
};

CanvasContextProto.fR = function( x, y, w = 1, h = 1 ) {
    this.fillRect( x, y, w, h );
    return this;
};

CanvasContextProto.cR = function( x, y, w = 1, h = 1 ) {
    this.clearRect( x, y, w, h );
    return this;
};

CanvasContextProto.move = function( x, y ) {
    this.moveTo( x, y );
    return this;
};

CanvasContextProto.line = function( x, y ) {
    this.lineTo( x, y );
    return this;
};

CanvasContextProto.trans = function( x, y ) {
    this.translate( x, y );
    return this;
};

CanvasContextProto.bezier = function( x1, y1, x2, y2, x, y ) {
    this.bezierCurveTo( x1, y1, x2, y2, x, y );
    return this;
};

CanvasContextProto.begin = function(){
    this.beginPath();
    return this;
};

CanvasContextProto.close = function(){
    this.closePath();
    return this;
};

CanvasContextProto.style = function( color = 'black', type = 'fill' ) {
    this[ type + 'Style'] = color;
    return this;
};

CanvasContextProto.drawArc = function( x, y, r, fill ) {
    this.begin().arc( x, y, r, 0, Math.PI*2, true );
    this.close()[ fill ? 'fill' : 'stroke']();
    return this;
};

CanvasContextProto.text = function( text, x, y ) {
    this.fillText( text, x, y );
    return this;
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
