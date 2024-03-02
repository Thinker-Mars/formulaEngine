export class Store<S = any> {
    state: S;

    constructor(initialValue: S) {
        this.state = initialValue;
    }

    setState(pendingState: S) {
        this.state = pendingState;
    }
}