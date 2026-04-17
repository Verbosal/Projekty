export default () => {
    Array.prototype.random = function () {
        return this[Math.floor((Math.random()*this.length))];
    }
}

// stack overflow my beloved