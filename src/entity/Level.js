class Level {
    constructor(id, name, numberLevel, description, imagePath) {
        this.id = id;
        this.name = name;
        this.numberLevel = numberLevel;
        this.description = description;
        this.imagePath = imagePath
    }

    getName() { 
        return this.name;
    }

    getNumberLevel() {
        return this.numberLevel;
    }

}

module.exports = Level;