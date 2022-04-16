function getDateTimeForChat() {
    const D = String(new Date());
    let date = D.substring(0, D.indexOf("GMT") - 1).split(" ");
    date =
        date[0] +
        ", " +
        date[2] +
        " " +
        date[1] +
        " " +
        date[3] +
        ", " +
        date[4];
    return date
}

export default getDateTimeForChat;