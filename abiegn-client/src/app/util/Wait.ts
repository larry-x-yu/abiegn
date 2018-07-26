export class Wait {
    constructor(private milliseconds: number) {}
    start() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, this.milliseconds);
        });
    }
}
