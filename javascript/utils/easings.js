// t - пройденное время
// b - изначальное значение
// c - разница значений
// d - длительность [анимации]

export function easeOutCirc(t,b,c,d) {
    t /= d; t--;
    return c * Math.sqrt(1 - t*t) + b;
}
