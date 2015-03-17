function fitToCardBox(image) {
    
   var cardBoxWidth  = 424,
       cardBoxHeight = 256,
       paddingWidth = 50,
       paddingHeight = 30;
   
       return image.resize(cardBoxWidth-paddingWidth, cardBoxHeight-paddingHeight);
}

module.exports = fitToCardBox;