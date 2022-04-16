<template>
  <div class="chat-container">
    <h1>
      Leave your comment
      <hr />
    </h1>
    <div class="chatbox-content">
      <div class="chatbox">
        <ul>
          <li v-for="(item, index) in commentData" :key="index">
            <div class="comment-li-container">
              <div class="user-icon">
                <fa-icon icon="user-large" />
              </div>
              <div class="comment-li">
                <div class="user-name">
                  {{ item.username }}
                </div>
                <div class="comment-text">
                  {{ item.comment }}
                </div>
              </div>
            </div>
            <div class="comment-date">
              {{ item.datetime }}
            </div>
          </li>
          <li v-for="(item, index) in userTyping" :key="index">
            <div class="comment-li-container">
              <div class="user-icon">
                <fa-icon icon="user-large" />
              </div>
              <div class="comment-li typing">
                <div class="user-name">
                  {{ item }}
                </div>
                <div class="comment-text">Typing {{ typingPoint.point }}</div>
              </div>
            </div>
          </li>
          <li v-show="formError != ''" class="popup-error" :key="formErrorCnt">
            <p>{{ formError.text }}</p>
          </li>
        </ul>
      </div>
      <div class="form-chat">
        <input
          type="text"
          placeholder="Nickname"
          maxlength="30"
          @input="oninputUsername($event)"
          @keydown.enter.exact.prevent="focusComment()"
        />
        <div class="textarea">
          <textarea
            type="text"
            placeholder="Comment..."
            v-model="formInput.comment"
            @input="onInputComment()"
            @keydown.enter.exact.prevent="addComment"
            @keydown.enter.shift.exact="newline"
          ></textarea>
        </div>
        <button @click="addComment">send</button>
      </div>
    </div>
  </div>
</template>

<script>
import getDateTimeForChat from "@/helpers/DateTime";
import {checkValueInArray, setTypingInterval} from "@/helpers/socket";
import {validationChat} from '@/helpers/validationChat'
const { io } = require("socket.io-client");
const socket = io("http://192.168.199.104:8081");
export default {
  name: "home-chat-component",
  components: {},
  data() {
    return {
      commentData: [],
      formInput : { username : "", comment: ""},
      chatUpdate: true,
      formError: {text : ""},
      formErrorCnt: 0,
      scrollHigh: 0,
      userTyping: [],
      typingPoint: { point: "." },
    };
  },
  methods: {
    addComment() {
      this.formErrorCnt += 1;
      if (this.formErrorCnt >= 100) this.formErrorCnt = 0;
      if (validationChat(this.formInput, this.formError)== -1) return;
      const data = {
        username: this.formInput.username,
        comment: this.formInput.comment,
        datetime: getDateTimeForChat(),
      };
      this.commentData.push(data);
      socket.emit("addMessage", data);

      this.formError.text = "";
      this.formInput.comment = "";
      this.chatUpdate = true;
    },
    oninputUsername(event) {
      event.target.value = event.target.value.substring(0, 30);
      this.formInput.username = event.target.value;
    },
    onInputComment() {
      const textarea = document.querySelector("textarea");
      textarea.scrollTop = textarea.scrollHeight;
      socket.emit("typing", { username: this.formInput.username });
    },
    focusComment() {
      if (this.formInput.username === "") {
        this.formError.text = "Please fill your nickname.";
        this.chatUpdate = true;
        return;
      }
      const textarea = document.querySelector(".form-chat .textarea textarea");
      textarea.focus();
    },
    scrollCommentDown() {
      const chatbox = document.querySelector('[class="chatbox"]');
      if (chatbox.scrollTop >= this.scrollHigh - 80 || this.chatUpdate) {
        chatbox.scrollTop = chatbox.scrollHeight;
        this.scrollHigh = chatbox.scrollTop;
      }
      this.scrollHigh = chatbox.scrollHeight - chatbox.clientHeight;
      this.chatUpdate = false;
    },
  },
  computed: {
    ThemeColor() {
      return this.$store.getters.getThemeColorSet;
    },
  },
  mounted() {
    // console.log("on mounted");
    this.scrollCommentDown();
  },
  updated() {
    // console.log("on update");
    this.scrollCommentDown();
  },
  created() {
    // console.log("on created.");
    socket.on("allMessage", (data) => {
      this.commentData.push(...data);
    });

    socket.on("userTyping", (data) => {
      // handle username typing
      var temp = data.username;
      var pushFlag = checkValueInArray(this.userTyping, temp);
      if (pushFlag || this.userTyping.length === 0) {
        this.userTyping.push(temp);
        var typingInterval = setTypingInterval(this.typingPoint)
        setTimeout(() => {
          this.userTyping.shift();
          clearInterval(typingInterval);
        }, 1000);
      }
    });

    socket.on("newMessage", (data) => {
      var temp = {
        username: data.username,
        comment: data.comment,
        datetime: data.datetime,
      };
      setTimeout(() => {
        this.commentData.push(temp);
      }, 1000);
    });
  },
};
</script>

<style scoped>
.chat-container {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

/* Custom scrollbar*/
.chatbox::-webkit-scrollbar {
  width: 10px;
}
.chatbox::-webkit-scrollbar-track {
  border-radius: 10px;
  margin-bottom: 10px;
  /* background: v-bind('ThemeColor.scrollbarTrack'); */
}
.chatbox::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: v-bind("ThemeColor.scrollbarThumb");
}
.chatbox::-webkit-scrollbar-thumb:hover {
  background: v-bind("ThemeColor.scrollbarThumbHover");
}
/* End Custom scrollbar*/
/* Chat layout */
.chatbox-content {
  width: 80%;
  height: 500px;
  margin: auto;
  margin-top: 1rem;
  border-radius: 5px;
  /* border: 1px solid v-bind("ThemeColor.chatFormBorder"); */
  /* changeed by theme : chatboxBG*/
  /* background: v-bind("ThemeColor.chatboxBG"); */
}
.chatbox {
  width: 100%;
  height: calc(500px - 40px);
  overflow-y: scroll;
  overflow-x: wrap;
}
.chatbox-content:hover {
  /* background: #445869; */
  filter: brightness(1.1);
}
/* End Chat layout */
/* Comment-text Chat */
.chatbox ul li {
  text-align: center;
  margin-bottom: 1rem;
}
.chatbox ul li .comment-li-container {
  display: flex;
  justify-content: left;
  align-items: center;
  margin: 2rem 2rem 0 2rem;
  /* border: 1px solid red; */
}
.chatbox ul li .comment-li {
  font-size: 1.25rem;
  padding: 1rem 1rem;
  margin-left: 1rem;
  width: 100%;
  height: 100%;
  word-break: break-all;
  white-space: pre;
  list-style: none;
  text-align: left;
  border-radius: 20px;
  /* changeed by theme : normal*/
  color: v-bind("ThemeColor.normal");
  /* changeed by theme : chatTextBG*/
  background: v-bind("ThemeColor.chatTextBG");
}
.chatbox ul li .comment-li.typing {
  width: auto;
}
.user-name {
  font-weight: bolder;
  margin-bottom: 0.5rem;
}
.comment-text {
  margin-left: 0rem;
}
.user-icon {
  font-size: 1.25rem;
}
.comment-date {
  font-size: 1rem;
}
/* End Comment-text Chat */
/* Input .textarea textarea Chat */
@keyframes popupAnimation {
  0% {
    transform: scale(0.5, 0.5);
  }
  90% {
    transform: scale(1.2, 1.2);
  }
  100% {
    transform: scale(1, 1);
  }
}
.popup-error {
  width: 100%;
  list-style: none;
  display: flex;
  justify-content: center;
  word-break: break-all;
}
.popup-error p {
  box-sizing: border-box;
  color: v-bind("ThemeColor.normal");
  animation: 0.3s popupAnimation;
  animation-fill-mode: forwards;
}
.form-chat {
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  /* border: 3px solid red; */
}
.form-chat input,
.form-chat .textarea textarea {
  outline-width: 0px;
  position: absolute;
  bottom: 1px;
  font-size: 1.25rem;
  height: 100%;
  border-radius: 5px;
  /* changeed by theme : chatFormBorder*/
  border: 1px solid v-bind("ThemeColor.chatFormBorder");
  /* changeed by theme */
  color: v-bind("ThemeColor.normal");
  /* changeed by theme : chatInputBG*/
  background-color: v-bind("ThemeColor.chatInputBG");
  resize: none;
  overflow: hidden;
  z-index: 1;
}
.form-chat input:focus,
.form-chat .textarea textarea:focus {
  /* changeed by theme : chatFormBorder*/
  border: 1px solid v-bind("ThemeColor.normal");
}
.form-chat button {
  position: absolute;
  bottom: 1px;
  right: -1px;
  width: 80px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  font-weight: bolder;
  border-radius: 5px;
  border: none;
  color: #fff;
  background-color: #21a221;
  cursor: pointer;
  z-index: 1;
}
.form-chat input {
  outline-color: v-bind("ThemeColor.chatFormBorder");
  text-align: center;
  left: 0px;
  width: calc(150px);
}
.form-chat .textarea textarea {
  outline-color: v-bind("ThemeColor.chatFormBorder");
  line-height: 2;
  padding-left: 1rem;
  left: calc(150px);
  width: calc(100% - (150px) - (80px - 1px));
}
.form-chat input::placeholder,
.form-chat .textarea textarea::placeholder {
  font-size: 1.25rem;
  line-height: 40px;
  text-align: center;
  color: v-bind("ThemeColor.normal"); /* changeed by theme : normal*/
}
.form-chat button:hover {
  background-color: #0d890d;
}
/* End Input .textarea textarea Chat */

@media screen and (max-width: 1024px) {
  .chat-container {
    width: 90%;
    margin: auto;
  }
  .chat-container h1 {
    font-size: 2rem;
  }
  .chatbox-content {
    width: 100%;
  }
}

@media screen and (max-width: 900px) {
}

@media screen and (max-width: 700px) {
  .chat-container h1 {
    font-size: 1.5rem;
    text-align: center;
  }
  .chatbox ul li .comment-li {
    font-size: 1rem;
  }
  .form-chat input {
    outline-width: 0px;
    width: calc(100px);
    transition: 1s;
    z-index: 3;
  }
  .form-chat .textarea textarea {
    outline-width: 0px;
    left: calc(100px);
    height: 100%;
    width: calc(100% - (100px) - (80px - 1px));
    transition: 1s;
    z-index: 2;
  }
  .form-chat input:focus {
    width: calc(100% - 80px);
  }
  .form-chat .textarea textarea:focus {
    left: 0px;
    width: calc(100% - (80px - 1px));
    padding-top: calc((40px - 1rem) / 2);
    padding-bottom: calc((40px - 1rem) / 2);
    line-height: 1.25;
    height: 125%;
    z-index: 99;
  }
  .form-chat .textarea textarea:focus::placeholder {
    line-height: 2;
  }
  .form-chat input::placeholder,
  .form-chat .textarea textarea::placeholder {
    font-size: 1rem;
  }
  .comment-date {
    font-size: 0.7rem;
  }
}
@media screen and (max-width: 600px) {
  .chat-container {
    width: 80%;
  }
  .chat-container h1 {
    font-size: 2rem;
  }
}
@media screen and (max-width: 500px) {
  .chat-container {
    width: 90%;
  }
  .form-chat input {
    width: calc(80px);
  }
  .form-chat .textarea textarea {
    left: 80px;
    width: calc(100% - 80px - (80px - 1px));
  }
}
</style>