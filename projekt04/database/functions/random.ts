// stack overflow my beloved
export default () => {
    Array.prototype.push(
        function random() {
            return this[Math.floor((Math.random()*this.length))];
        }
    )
}