<template>
  <div class="view-label-container">
    <div id="topic-1" class="content-container">
      <div v-if="posts != null">
        <div class="header-post">
          <div>
            <p>{{ posts.page_name }}</p>
            <p>{{ posts.post_time }}</p>
          </div>
          <ul>
            <li><a :href="posts.url" target="_blank">HTML</a></li>
            <li><a :href="posts.url" target="_blank">Link</a></li>
          </ul>
        </div>
        <hr />
        <div class="content-post">
          {{ posts.post_text }}
        </div>
        <div class="image-post">
          <img
            src="https://scontent.fbkk27-1.fna.fbcdn.net/v/t39.30808-6/254267285_3044259815789400_2390815700095365136_n.png?stp=dst-png_s1080x2048&_nc_cat=100&ccb=1-6&_nc_sid=730e14&_nc_eui2=AeH6P1SjQQTe4bPgJPAqSmkU39O7nBLHHlff07ucEsceV1RBz_37btKvFB5mPevGqR45tY8XsA7vfr1OR438w4Jv&_nc_ohc=xdWiIVo-k-AAX_2LQCj&_nc_ht=scontent.fbkk27-1.fna&oh=00_AT981jGYoHUrQi4mf2YfPG8UqDPpr1eCuUOtt-L6EUBhrw&oe=6279732D"
            alt=""
          />
        </div>
      </div>
    </div>
    <div id="topic-2" class="content-container">
      <div v-if="label != null">
        <div class="header-Label">
          <p class="fw-bolder text-center p-1-1">Label</p>
          <p class="fs-small" @click="hideDetail = !hideDetail">
            Hide Description
          </p>
        </div>
        <div class="checkbox-container">
          <div v-for="(val, index) in label" :key="index">
            <hr
              v-if="
                index != '_id' &&
                index != 'labeller' &&
                index != 'status' &&
                index != 'post_id'
              "
            />
            <label
              class="checkbox-item"
              v-if="
                index != '_id' &&
                index != 'labeller' &&
                index != 'status' &&
                index != 'post_id'
              "
            >
              <input
                type="checkbox"
                class="checkbox-input"
                v-model="label[index]"
                :id="index"
              />
              <span></span>
              <label class="fs-normal" :for="index"
                ><p class="fw-bold">{{ index }}</p>
                <p v-if="hideDetail">{{ category[index] }}</p></label
              >
            </label>
          </div>
        </div>
        <button class="btn-submit" @click="submit()">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "labelpost-component",
  props: ["param"],
  data() {
    return {
      posts: null,
      label: null,
      image: null,
      category: {
        Real: "ข่าวจริง ข้อมูลถูกต้อง หรือเเสดงความเห็นแบบเป็นกลาง เชิงพูดคุย มุกขำขันที่เป็นความจริง ไม่มีการชักจูง ไม่มีอารมณ์ในข้อความ",
        Satire: "มีข้อความเสียดสี ล้อเลียน โดยไม่มีเค้าโครงความจริง",
        FalseNews:
          "ให้ข้อมูลผิด ไม่มีอ้างอิงหรืออ้างอิงผิด ใช้รูปภาพไม่ถูกต้อง",
        Commentary: "เขียนเชิงวิจารณ์ มีอารมณ์เเละความคิดเห็นในข้อความ",
        Persuasive: "ข่าวที่มีการโน้มน้าว ชักชวน โฆษณาเกินจริง",
        Polarizing:
          "ข่าวที่เเสดงความเห็นไปด้านใดด้านนึงโดยไม่มีหลักฐาน มีทัศนคติ อารมณ์หรือคำหยาบในข้อความ",
        Misreporting:
          "ให้ข้อมูลผิดโดยไม่ตั้งใจโดยเเหล่งข่าวมีชื่อเสียง ไม่มีเจตนาหลอกหลวง ",
        NoReference: "ไม่มีเเหล่งอ้างอิง มาสนับสนุนข้อมูลที่กล่าว",
        Video: "โพสวิดีโอ",
        Deleted: "โพสถูกลบเเล้ว",
      },
      hideDetail: true,
    };
  },
  computed: {
    themeColorNormal() {
      return this.$store.getters.getThemeColorNormal;
    },
    themeColorInvert() {
      return this.$store.getters.getThemeColorInvert;
    },
    getAccount() {
      return this.$store.getters.getAccount;
    },
  },
  watch: {
    posts(newVal) {
      newVal.post_time = newVal.post_time.replace(".000000", "");
    },
  },
  methods: {
    setSidebarTopic() {
      let topic = [
        { key: "Post", value: "hand-peace" },
        { key: "Label", value: "hand-peace" },
      ];
      this.$store.dispatch("setTopicAction", topic);
    },
    getPostID() {
      const param = "?post_id=" + this.param.post_id;
      axios
        .get(this.$BackendURL + "posts" + param)
        .then((res) => {
          //   console.log(res.data);
          this.posts = res.data.posts;
        })
        .catch((err) => {
          console.log("Axios getPosts err : ", err.response.data);
          // show error message from server
          this.ErrorMSG = err.response.data.error;
        });
    },
    getLabel() {
      const param = "?post_id=" + this.param.post_id;
      axios
        .get(this.$BackendURL + "label" + param)
        .then((res) => {
          //   console.log(res.data);
          this.label = res.data.labels;
        })
        .catch((err) => {
          console.log("Axios getLabel err : ", err.response.data);
          // show error message from server
          this.ErrorMSG = err.response.data.error;
        });
    },
    getImage() {
      const param = "?post_id=" + this.param.post_id;
      axios
        .get(this.$BackendURL + "image" + param)
        .then((res) => {
          //   console.log(res.data);
          this.image = res.data.image;
        })
        .catch((err) => {
          console.log("Axios getImage err : ", err.response.data);
          // show error message from server
          this.ErrorMSG = err.response.data.error;
        });
    },
    submit() {
      this.label.labeller = this.getAccount.nickname;
      console.log(this.label);
      axios
          .post(this.$BackendURL + "label/update", this.label)
          .then((res) => {
            console.log("Axios Submit success : ", res.data);
            // update success, redirect to post table
            this.$router.push('label')
          })
          .catch((err) => {
            console.log("Axios Submit err : ", err.response.data);
            // show error message from server
            this.ErrorMSG = err.response.data.error;
          });
    },
  },

  created() {
    // console.log("on create", this.param);
    this.setSidebarTopic();
  },
  mounted() {
    this.getPostID();
    this.getLabel();
    // this.getImage();
  },
};
</script>

<style scoped>
@import "@/assets/css/font.css";
@import "@/assets/css/layout.css";
@import "@/assets/css/box.css";
hr {
  border: 1px solid v-bind(themeColorNormal);
  background-color: v-bind(themeColorNormal);
}
a {
  text-decoration: underline;
  color: v-bind(themeColorNormal);
}
.view-label-container {
  display: block;
  width: 100%;
  margin-bottom: 5rem;
  /* border: 1px solid skyblue; */
}
</style>

<style lang="scss" scoped>
@import "@/assets/css/font";
@import "@/assets/css/layout";
@import "@/assets/css/box";

.text-header {
  @extend .fs-big;
  @extend .fw-bolder;
}
.text-normal {
  @extend .fs-normal;
  @extend .text-left;
  @extend .text-indent;
  padding: 1rem 0 0 0;
}
.content-container {
  @extend .content-container;
  margin-top: 3rem;
  width: 100%;
  border-radius: 10px;
}

.header-post {
  display: flex;
  padding: 0.5rem 1rem;
  @extend .fs-normal;
}
.header-post div {
  width: 70%;
  height: 3.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.header-post ul {
  width: 30%;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.header-post ul li a {
  text-decoration: none;
}
.header-post ul li a:hover {
  text-decoration: underline;
  cursor: pointer;
}
.header-post div:first-child p:last-child {
  @extend .fs-small;
}

/* Content post */
.content-post {
  @extend .fs-normal;
  padding: 0.5rem 1rem;
  word-wrap: break-word;
  word-spacing: 1px;
  white-space: pre-wrap;
  line-height: 1.75rem;
}

.image-post {
  text-align: center;
}
.image-post img {
  width: 600px;
  max-width: 100%;
  object-fit: cover;
}
/* End Content post */

/* Label */
.header-Label {
  position: relative;
}
.header-Label p:last-child {
  position: absolute;
  bottom: 0;
  right: 1rem;
  cursor: pointer;
}
/* btn-submitt */
.btn-submit {
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
  font-size: 1.25rem;
  background-color: #21a221;
  color: #f5f5f5;
  border-radius: 10px;
  cursor: pointer;
}
.btn-submit:hover {
  background-color: #0d890d;
}
/* End btn-submitt */

/* checkbox */
.checkbox-container {
  padding: 0rem 1rem;
}
.checkbox-item {
  width: 100%;
  display: grid;
  grid-template-columns: 0% 25px auto;
  padding: 0.5rem 0;
}
.checkbox-item label {
  display: block;
  margin-left: 2rem;
}
/* Custom checkbox */
.checkbox-item input {
  /* Hide default checkbox */
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.checkbox-item span {
  /* Create a custom checkbox */
  align-self: center;
  height: 25px;
  width: 25px;
  background-color: #fff;
}
.checkbox-item:hover input ~ span {
  /* mouse-over, add a grey background color */
  background-color: #ddd;
}
.checkbox-item input:checked ~ span {
  /* When the checkbox is checked, add a blue background */
  background-color: #2196f3;
}
.checkbox-item input:checked ~ span:after {
  /* Show the checkmark when checked */
  display: block;
}
.checkbox-item span:after {
  /* Style the checkmark/indicator */
  content: "";
  position: relative;
  display: none;

  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}
/* End Custom checkbox */
/* End checkbox */
/* End Label */
</style>