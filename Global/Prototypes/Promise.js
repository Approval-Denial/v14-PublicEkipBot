/**
 * 
 * @param {String} Emoji Enter the Emoji to be added
 * @returns {Promise}
 */
Promise.prototype.addReaction = function (Emoji) {
    this.react(Emoji).catch(err => { })
}

/**
 * 
 * @param {Number} time Enter a number between 1-60
 * @returns {Promise}
 */
Promise.prototype.destroyMessage = function (time = 10) {
    if (this) this.then(s => {
        if (s.deletable) {
            setTimeout(async () => {
                s.delete().catch(e => { });
            }, time * 1000)
        }
    });
}