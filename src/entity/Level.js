class Level {
    constructor(id, name, numberLevel, maxValue, description, imagePath) {
        this.id = id;
        this.name = name;
        this.numberLevel = numberLevel;
        this.maxValue = maxValue;
        this.description = description;
        this.imagePath = imagePath
    }

    getName() { 
        return this.name;
    }

    getNumberLevel() {
        return this.numberLevel;
    }

    getMaxValue() {
        return this.maxValue;
    }

}


module.exports = Level;