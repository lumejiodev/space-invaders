export default class Element {
    constructor( root ) {
        this.root = root;
        this.ctx = root.ctx;
        this.attachSprite();
    }

    attachSprite() {}

    update() {}

    unload() {}

    render() {}
}
