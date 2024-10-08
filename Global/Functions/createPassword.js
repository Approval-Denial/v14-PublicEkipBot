function createPassword() {
    var character = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    var lengthPsw = 8;
    var randomPsw = '';
    for (var i=0; i < lengthPsw; i++) {
     var numPws = Math.floor(Math.random() * character.length);
     randomPsw += character.substring(numPws,numPws+1);
    }
    return randomPsw
}
module.exports = { createPassword }