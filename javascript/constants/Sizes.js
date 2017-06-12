export const CanvasWidth = 1000;
export const CanvasHeight = CanvasWidth/16*9;

export const FrameWidth = 5;
export const FieldWidth = CanvasWidth - FrameWidth*2;

export const BorderWidth = 3;
export const BorderOffset = 60;
export const BorderTopPosition = Math.round( CanvasHeight - BorderOffset );

export const PlayerOffset = BorderOffset + BorderWidth + 5;
export const PlayerTopPosition = Math.round( CanvasHeight - PlayerOffset );

export const PlayerBulletWidth = 2;
export const PlayerBulletHeight = 14;
