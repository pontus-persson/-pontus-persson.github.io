var nameSyllables = [
    "mon",
    "fay",
    "shi",
    "zag",
    "rash",
    "izen",
    "son",
    "tar",
    "lin",
    "nar",
    "zen",
    "tash",
    "shu",
];


var Name = function() {

    this.generateName = function() {
        var name = '';
        var syllables = 2 + Math.floor(Math.random() * 2);
        for (var i = 0; i < syllables; i++)
        {
            name += nameSyllables[Math.floor(Math.random() * nameSyllables.length)];
        }
        return name;
    }
    this.first = this.generateName();

}
