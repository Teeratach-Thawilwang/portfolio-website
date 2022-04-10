<template>
  <div class="chat-container">
    <h1>
      Leave your comment
      <hr />
    </h1>
    <div class="chatbox-content">
      <div class="chatbox">
        <ul>
          <li v-for="(item, index) in getChat" :key="index">
            <div class="user-icon">
              {{ item.username }}
            </div>
            <div class="comment-text">
              {{ item.comment }}
            </div>
          </li>
        </ul>
      </div>
      <div class="form-chat">
        <div>
          <input
            type="text"
            v-model.lazy="chatUsername"
            placeholder="Username"
          />
          <textarea
            type="text"
            name=""
            id=""
            placeholder="...What do you think?"
            v-model.lazy="inputComment"
          ></textarea>
        </div>
        <button @click="addComment">send</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home-chat-component",
  components: {},
  data() {
    return {
      chatUsername: "",
      inputComment: "",
    };
  },
  computed: {
    themeColorNormal() {
      return this.$store.getters.getThemeColorNormal;
    },
    themeColorInvert() {
      return this.$store.getters.getThemeColorInvert;
    },
    getChat() {
      return this.$store.getters.getChat;
    },
  },
  methods: {
    addComment() {
      const data = { user: this.chatUsername, text: this.inputComment };
      this.$store.dispatch("addCommentAction", data);
      this.inputComment = "";
    },
  },
};
</script>

<style scoped>
p {
  color: rgb(81, 81, 81);
}

.chat-container {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

/* Custom scrollbar*/
.chatbox::-webkit-scrollbar {
  width: 15px;
}
.chatbox::-webkit-scrollbar-track {
  border-radius: 10px;
  background: rgb(81, 81, 81);
}
.chatbox::-webkit-scrollbar-thumb {
  background: rgb(127, 127, 127);
  border-radius: 10px;
}
.chatbox::-webkit-scrollbar-thumb:hover {
  background: rgb(160, 160, 160);
}
.chatbox-content {
  width: 80%;
  height: 300px;
  margin: auto;
  margin-top: 1rem;
  border-radius: 10px;
  background-color: #fff;
}
.chatbox {
  width: 100%;
  height: 260px;
  overflow-y: scroll;
  overflow-x: wrap;
}
.chatbox ul li {
  font-size: 1rem;
  padding: 0;
  margin: 1rem;
  height: 2rem;
  border-radius: 10px;
  color: #fff;
  width: 90%;
  display: flex;
  align-items: center;
}
.chatbox ul li:nth-child(odd) .user-icon,
.chatbox ul li:nth-child(odd) .comment-text {
  background: #828282;
}
.chatbox ul li:nth-child(even) .user-icon,
.chatbox ul li:nth-child(even) .comment-text {
  background: #4a4a4a;
}
.user-icon,
.comment-text {
  border-radius: 10px;
  padding: 5px 1rem;
  margin-right: 5px;
  display: flex;
  align-items: center;
}

.form-chat {
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  /* border: 3px solid red; */
}
.form-chat div input,
.form-chat div textarea {
  position: absolute;
  font-size: 1rem;
  padding: 0.5rem;
  height: 100%;
  border-radius: 10px;
  border: 1px solid rgb(195, 195, 195);
  background-color: #fff;
  resize: none;
  overflow: hidden;
  z-index: 2;
}
.form-chat div input {
  text-align: center;
  width: calc(150px);
}
.form-chat div textarea {
  left: 150px;
  width: calc(100% - 150px - 60px);
}
.form-chat div input::placeholder,
.form-chat div textarea::placeholder {
  text-align: center;
}
.form-chat button {
  position: absolute;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 40px;
  font-size: 1rem;
  font-weight: bolder;
  border-radius: 20px;
  border: none;
  color: #fff;
  background-color: green;
  cursor: pointer;
}

@media screen and (max-width: 1024px) {
  .chat-container {
    width: 90%;
    margin: auto;
  }
}

@media screen and (max-width: 900px) {
}

@media screen and (max-width: 700px) {
  .chat-container h1 {
    text-align: center;
  }
}
@media screen and (max-width: 600px) {
  .chat-container {
    width: 80%;
  }
}
@media screen and (max-width: 500px) {
  .chat-container {
    width: 90%;
  }
}
</style>