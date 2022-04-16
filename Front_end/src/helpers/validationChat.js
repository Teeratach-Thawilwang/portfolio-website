export function validationChat(formInput, ErrorMsg) {
    if (formInput.comment === "" && formInput.username === "") {
        ErrorMsg.text = "Please fill your nickname and message.";
        return -1;
    }
    if (formInput.username === "") {
        ErrorMsg.text = "Please fill your nickname.";
        return -1;
    }
    if (formInput.comment === "") {
        ErrorMsg.text = "Please fill your comment.";
        return -1;
    }
    return 1;
}