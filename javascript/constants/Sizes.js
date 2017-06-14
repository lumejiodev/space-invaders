export const CanvasWidth = 1000;
export const CanvasHeight = CanvasWidth/16*9;

export const FrameWidth = 5;
export const FieldWidth = CanvasWidth - FrameWidth*2;
export const FieldHeight = CanvasHeight - FrameWidth*2;

export const BorderWidth = 3;
export const BorderOffset = 60;
export const BorderTopPosition = Math.round( CanvasHeight - BorderOffset );

export const PlayerOffset = BorderOffset + BorderWidth + 5;
export const PlayerTopPosition = Math.round( CanvasHeight - PlayerOffset );

export const PlayerBulletWidth = 2;
export const PlayerBulletHeight = 14;

export const AlienWidth = 36;
export const AlienHeight = 24;
export const AlienOffset = 16;
export const AlienStartPosition = 60;

export const AlienSpecialWidth = 48;
export const AlienSpecialHeight = 21;
export const AlienSpecialPosition = 20;

export const AlienBulletWidth = 4;
export const AlienBulletHeight = 15;

export const ScoreOffset = 18;

export const GameOverWidth = 400;
export const GameOverHeight = 300;
export const GameOverTop = Math.round( CanvasHeight - GameOverHeight ) / 3;
export const GameOverLeft = Math.round( CanvasWidth - GameOverWidth ) / 2;
