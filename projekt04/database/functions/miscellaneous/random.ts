// Selects a random element from an array, shorthand function

Array.prototype.random = () => {
    return this[Math.floor((Math.random() * this.length))];
}