<template>
  <div class="view-label-container">
    <div id="topic-1" class="content-container">
      <div v-if="posts != null">
        <div class="header-post">
          <div>
            <p class="fs-big">{{ posts.page_name }}</p>
            <p>{{ posts.post_time }}</p>
          </div>
          <ul>
            <li>
              <a
                :href="`${$BackendURL}html?page_name=${posts.page_name}&post_id=${posts.post_id}`"
                target="_blank"
                >HTML</a
              >
            </li>
            <li><a :href="posts.url" target="_blank">Link</a></li>
          </ul>
        </div>
        <hr />
        <div class="content-post">
          {{ posts.post_text }}
        </div>
        <div class="image-post" v-if="image != null">
            <imageCarouselGeneral
              :Images="image"
              class="image-Carousel"
            ></imageCarouselGeneral>
        </div>
      </div>
    </div>
    <div id="topic-2" class="content-container">
      <div v-if="label != null && category != null">
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
        <div v-if="ErrorMSG != ''" class="m-t-1 p-1-0 bg-red b-r-10px">
          <p class="fs-normal text-center c-white">{{ErrorMSG}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import imageCarouselGeneral from "@/components/subview/labelpost/postImageCarouselContainer.vue";
export default {
  name: "labelpost-component",
  props: ["param"],
  components: {
    imageCarouselGeneral,
  },
  data() {
    return {
      posts: null,
      image: null,
      label: null,
      category: null,
      hideDetail: true,
      headerData: null,
      ErrorMSG : '',
    };
  },
  computed: {
    getAccount() {
      return this.$store.getters.getAccount;
    },
    themeColorNormal() {
      return this.$store.getters.getThemeColorNormal;
    },
    themeColorInvert() {
      return this.$store.getters.getThemeColorInvert;
    },
  },
  watch: {
    posts(newVal) {
      newVal.post_time = newVal.post_time.replace(".000000", "");
    },
    image(newVal) {
      for (let i = 0; i < newVal.length; i++) {
        newVal[i] = `${this.$BackendURL}postImage/${newVal[i]}`;
      }
      newVal = Object.values(newVal);
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
    getPostID(post_id) {
      const param = "?post_id=" + post_id;
      axios
        .get(this.$BackendURL + "posts" + param, this.headerData)
        .then((res) => {
          // console.log("getPostID", res.data);
          this.posts = res.data.posts;
        })
        .catch((err) => {
          console.log("Axios getPosts err : ", err.response.data);
          // show error message from server
          this.ErrorMSG = err.response.data.error;
        });
    },
    getLabel(post_id) {
      const param = "?post_id=" + post_id;
      axios
        .get(this.$BackendURL + "label" + param, this.headerData)
        .then((res) => {
          // console.log("getLabel", res.data);
          this.label = res.data.labels;
        })
        .catch((err) => {
          console.log("Axios getLabel err : ", err.response.data);
          // show error message from server
          this.ErrorMSG = err.response.data.error;
        });
    },
    getLabelDes(post_id) {
      const param = "?post_id=" + post_id;
      axios
        .get(this.$BackendURL + "labelDes" + param, this.headerData)
        .then((res) => {
          // console.log("getLabelDes", res.data);
          this.category = res.data.labelDes;
        })
        .catch((err) => {
          console.log("Axios getLabelDes err : ", err.response.data);
          // show error message from server
          this.ErrorMSG = err.response.data.error;
        });
    },
    getImage(post_id) {
      const param = "/" + post_id;
      axios
        .get(this.$BackendURL + "getPostImage" + param, this.headerData)
        .then((res) => {
          // console.log("getImage", res.data);
          this.image = res.data.image;
        })
        .catch((err) => {
          console.log("Axios getImage err : ", err.response.data);
          // show error message from server
          this.ErrorMSG = err.response.data.error;
        });
    },
    submit() {
      this.label.labeller = this.getAccount.username;
      axios
        .post(this.$BackendURL + "label/update", this.label, this.headerData)
        .then((res) => {
          // console.log("Axios Submit success : ", res.data);
          // update success, redirect to post table
          this.ErrorMSG = ''
          this.$router.push("label");
        })
        .catch((err) => {
          console.log("Axios Submit err : ", err.response.data);
          // show error message from server
          this.ErrorMSG = err.response.data.error;
        });
    },
    setHeader(val) {
      this.headerData = {
        headers: {
          "x-access-token": val,
          "content-type": "application/json",
        },
      };
    },
  },

  created() {
    this.setSidebarTopic();
    window.scrollTo(0, 0);
  },
  mounted() {
    this.setHeader(this.getAccount.token);
    this.getPostID(this.param.post_id);
    this.getImage(this.param.post_id);
    this.getLabel(this.param.post_id);
    this.getLabelDes(this.param.post_id);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/font";
@import "@/assets/css/layout";
@import "@/assets/css/box";

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
  word-break: break-word;   // Prevent overflow text. This fixed child make parent's width expend.
  word-spacing: 1px;
  white-space: pre-line;
  line-height: 1.75rem;
}

.image-post {
  text-align: center;
}
.image-post .image-Carousel {
  height: 700px;
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

@media screen and (max-width: 1024px) {
  .image-post .image-Carousel {
    height: 600px;
  }
}
@media screen and (max-width: 900px) {
  .image-post .image-Carousel {
    height: 500px;
  }
}
@media screen and (max-width: 700px) {
  .image-post .image-Carousel {
    height: 500px;
  }
}
@media screen and (max-width: 600px) {
  .image-post .image-Carousel {
    height: 500px;
  }
}
@media screen and (max-width: 500px) {
  .image-post .image-Carousel {
    height: 400px;
  }
}
</style>