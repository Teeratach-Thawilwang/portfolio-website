function checkValueInArray(dataArray, value) {
    var pushFlag = true;
    var i = 0;
    for (i = 0; i < dataArray.length; i++) {
        if (dataArray[i] === value) {
            pushFlag = false;
            break;
        }
    }
    return pushFlag
}

function setTypingInterval(typingPoint) {
    var typingInterval = setInterval(() => {
        typingPoint.point += ".";
        if (typingPoint.point.length > 3) {
            typingPoint.point = "";
        }
    }, 500);
    return typingInterval;
}

module.exports.checkValueInArray = checkValueInArray
module.exports.setTypingInterval = setTypingInterval