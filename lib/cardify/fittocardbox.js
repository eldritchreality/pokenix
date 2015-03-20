/**
 * Export `fitToCardBox`
 */
module.exports = fitToCardBox;


/**
 * Takes image and resizes it to fit available space
 * 
 * @param {GraphicsMagic} image
 * @return {GraphicsMagic} 
 * @api public
 */

function fitToCardBox(image) {
    
   var cardBoxWidth  = 424,
       cardBoxHeight = 256,
       paddingWidth = 50,
       paddingHeight = 30;
   
       return image.resize(cardBoxWidth-paddingWidth, cardBoxHeight-paddingHeight);
}
