/**
 * Export addName and addAbility
 */ 

module.exports = {"addName" : addName,
                  "addAbility" : addAbility};

/**
 * Import modules
 */

var Q = require("q"),
    gm = require("gm"),
    expect = require("chai").expect;

/**
 * Adds text to an existing card
 * 
 * @param {options} options object 
 * @param {card} Buffer or GraphicsMagic object
 * 
 * @api private
 * @return {Promise}
 */

function _addText(options, card) {
    
    var output;
    options = options || {};
    options.x = options.x || 0;
    options.y = options.y || 0;
    options.card = options.card || card;
    options.text = options.text;
    options.textSize = options.textSize || "35";
    options.font = options.font || "lib/cardify/Fonts/GillSansStd-Condensed.otf";
    
    output = gm(options.card) 
      .options({ imageMagick: true })
      .font(options.font)
      .fontSize(options.textSize)
      .drawText(options.x,options.y,options.text,"NorthWest")
      .stream("png")

    return Q(output);
}

/**
 * Adds line breaks characters to a string at fixed intervals.
 * 
 * @param {text} String 
 * @param {width} Number
 * 
 * @api private
 * @return {String}
 */

function _addLineBreaks(text, width) {
    width = width || 60;

    expect(text).to.be.a("string");
    expect(width).to.be.a("number");

    if(text.length < width) return text;
    
    return text.substring(0, width) + "\n" + _addLineBreaks(text.substring(width), width);
};

/**
 * Adds line breaks chAdds a title to the top of a pokemon cardt} string 
 * @pname {Sidth} number
 * 
 cardi Buffer or GraphicsMagic objecte
 * @return publice}
 */

function addName(name, card) {
    var nameLabel = {};
    
    expect(name).to.be.a("string");
    
    nameLabel.font = "lib/cardify/Fonts/GillSansStd-BoldCondensed.otf";
    nameLabel.textSize = "30";
    nameLabel.x = 35;
    nameLabel.y = 42;
    nameLabel.text = name;
    
    return _addText(nameLabel,card);
}

/**
 * Adds an ability element to the body of a pokemon card
 * 
 * @param {title} String 
 * @param {body} String
 * @param {card} Buffer or GraphicsMagic object
 * 
 * @api public
 * @return {Promise}
 */

function addAbility
(title, body, card) {
    var abilityName = {},
        abilityText = {},
        boxWidth = 60;
    
    expect(title).to.be.a("string");
    expect(title).to.have.length.below(41);
    expect(body).to.be.a("string");
    expect(body).to.have.length.below(661) 
    
    
    abilityName.font = "lib/cardify/Fonts/GillSansStd-BoldCondensed.otf";
    abilityName.textSize = "25";
    abilityName.x = 35;
    abilityName.y = 370;
    abilityName.text = title;
    
    abilityText.font = "lib/cardify/Fonts/GillSansStd.otf";
    abilityText.textSize = "15";
    abilityText.x = 35;
    abilityText.y = 400;
    abilityText.text = body;
    abilityText.text = _addLineBreaks(abilityText.text, boxWidth);
    
    return Q(card)
      .then(_addText.bind(null,abilityName))
      .then(_addText.bind(null,abilityText));
}

