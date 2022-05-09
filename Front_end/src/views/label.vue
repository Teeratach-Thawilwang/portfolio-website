<template>
  <div class="view-label-container">
    <div id="topic-1" class="content-container">
      <h1 class="text-header">
        Post List
        <hr />
      </h1>
      <div class="horizontal-scroll">
        <div class="table-nav">
          <div class="show-npage">
            <span>Show</span>
            <select name="show-npage" id="npage" v-model="shownpage">
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="500">500</option>
              <option value="1000">1000</option>
            </select>
          </div>
          <div>
            <div class="goPostId">
              <span>ToPost</span>
              <input
                type="number"
                v-model="postIndex"
                @keydown.enter.exact="MoveToPostIndex()"
              />
            </div>
            <div class="pagination">
              <span @click="setnPage($event, -1)">&laquo;</span>
              <input
                type="number"
                v-model="nPage"
                @keydown.enter.exact="setnPage($event)"
              />
              <span @click="setnPage($event, +1)">&raquo;</span>
            </div>
          </div>
        </div>
        <table class="label-table">
          <tr>
            <th>#</th>
            <th>Pagename</th>
            <th>Date</th>
            <th>Labeller</th>
            <th>Status</th>
          </tr>
          <tr
            v-for="(post, index) in posts"
            :key="index"
            :id="`postIndex${(nPage - 1) * shownpage + index + 1}`"
            tabindex="0"
          >
            <td>{{ (nPage - 1) * shownpage + index + 1 }}</td>
            <td>{{ post.page_name }}</td>
            <td>{{ post.post_time }}</td>
            <td>{{ post.labeller }}</td>
            <td>
              <p class="fs-small">{{ post.status }}</p>
              <a
                class="btn-label"
                :href="`/labelpost?post_id=${post.post_id}`"
                >Label</a
              >
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Label-component",
  data() {
    return {
      shownpage: null,
      postIndex: null,
      nPage: null,
      posts: null,
    };
  },
  computed: {
    getToken() {
      return this.$store.getters.getToken;
    },
    themeColorNormal() {
      return this.$store.getters.getThemeColorNormal;
    },
    themeColorInvert() {
      return this.$store.getters.getThemeColorInvert;
    },
    getShownpage() {
      return this.$store.getters.getShownpage;
    },
    getLabelnPage() {
      return this.$store.getters.getLabelnPage;
    },
    getLabelPostIndex() {
      return this.$store.getters.getLabelPostIndex;
    },
  },
  watch: {
    getShownpage() {
      this.getPosts(this.nPage, this.shownpage);
    },
    posts(newVal) {
      newVal.forEach((element) => {
        element.post_time = element.post_time.split(" ")[0];
      });
    },
    shownpage(newVal) {
      newVal = parseInt(newVal);
      this.postIndex = newVal * (this.nPage - 1) + 1;
      this.getPosts(this.nPage, newVal);

      // set data to vuex
      this.$store.dispatch("setShownpageAction", newVal);
    },
    nPage(newVal) {
      if (newVal <= 0) {
        this.nPage = 1;
      }
      this.postIndex = this.shownpage * (this.nPage - 1) + 1;

      // set data to vuex
      this.$store.dispatch("setLabelnPageAction", newVal);
    },
    postIndex(newVal) {
      // set data to vuex
      this.$store.dispatch("setLabelPageIndexAction", newVal);
    },
  },
  methods: {
    setSidebarTopic() {
      let topic = [{ key: "Post List", value: "hand-peace" }];
      this.$store.dispatch("setTopicAction", topic);
    },
    setnPage(event, val = 0) {
      // add, minus with arrow pagination
      if ((val != 0 && this.nPage > 1) || val == +1) {
        this.nPage += val;
      }
      // check nPage is number
      if (Number.isInteger(this.nPage)) {
        // if true, show data array on page number.
        this.getPosts(this.nPage, this.shownpage);
      }
      event.target.blur();
    },
    getPosts(nPage = 1, row = 50) {
      const param = "?nPage=" + nPage + "&row=" + row;
      const data = {
        headers: {
          "x-access-token": this.getToken,
          "content-type": "application/json",
        },
      };
      axios
        .get(this.$BackendURL + "getPosts" + param, data)
        .then((res) => {
          // console.log(res.data);
          this.posts = res.data.posts;
        })
        .catch((err) => {
          console.log("Axios getPosts err : ", err.response.data);
          // show error message from server
          this.ErrorMSG = err.response.data.error;
        });
    },
    MoveToPostIndex() {
      document.getElementById("postIndex" + this.postIndex).focus();
    },
  },
  mounted() {
    this.shownpage = this.getShownpage;
    this.postIndex = this.getLabelPostIndex;
    this.nPage = this.getLabelnPage;
    this.getPosts(this.nPage, this.shownpage);
  },
  created() {
    this.setSidebarTopic();
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
  // border: 1px solid red;
}

.content-container {
  @extend .content-container;
  margin-top: 3rem;
  width: 100%;
}

.horizontal-scroll {
  overflow: hidden;
  overflow-x: auto;
  clear: both;
  width: 100%;
}

.table-nav {
  display: flex;
  justify-content: space-between;
  margin: 1rem 0 0.5rem 0;
}

.table-nav div {
  display: flex;
}
.goPostId {
  margin-right: 1rem;
}

.show-npage span,
.goPostId span {
  @extend .fs-normal;
  margin-right: 5px;
  // border: 1px solid #fff;
}

.show-npage select {
  @extend .fs-normal;
  text-align: center;
}

.pagination {
  display: flex;
  align-items: center;
  // border: 1px solid #fff;
}

.pagination span {
  @extend .fs-bigger;
  padding: 0px 5px 4px 5px;
  height: 1.5rem;
  display: inline-flex;
  align-items: center;
  // border: 1px solid #fff;
}

.goPostId span:hover,
.pagination span:hover {
  border-radius: 3px;
  background-color: v-bind(themeColorNormal);
  color: v-bind(themeColorInvert);
  cursor: pointer;
}

.goPostId input,
.pagination input {
  @extend .fs-normal;
  display: inline-block;
  width: 3rem;
  height: 1.5rem;
  outline-width: 0px;
  // border-radius: 3px;
  text-align: center;
}

.goPostId input::-webkit-outer-spin-button,
.goPostId input::-webkit-inner-spin-button,
.pagination input::-webkit-outer-spin-button,
.pagination input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.label-table {
  @extend .w-100;
  @extend .fs-small;
  @extend .text-center;
  @extend .b-collapse;

  tr {
    border: 1px solid #000;
    background-color: #fff;
    color: #000;

    td {
      height: auto;
      padding: 10px 10px;
      border: 1px solid #000;
    }
  }

  tr:hover {
    background-color: rgb(230, 230, 230);
  }

  tr:first-child {
    @extend .fs-small;
    border: 1px solid rgb(175, 176, 177);
    background-color: rgb(55, 60, 65);
    color: rgb(205, 205, 205);

    th {
      padding: 10px 0;
      border: 1px solid rgb(175, 176, 177);
    }
  }

  th:nth-child(1),
  td:nth-child(1) {
    width: 5%;
  }

  th:nth-child(2),
  td:nth-child(2) {
    width: 45%;
    white-space: wrap;
    overflow: hidden;
    word-wrap: break-word;
    max-width: 1px;
  }

  td:nth-child(2) {
    text-align: left;
  }

  th:nth-child(3),
  td:nth-child(3) {
    width: 25%;
  }

  th:nth-child(4),
  td:nth-child(4) {
    width: 15%;
  }

  th:nth-child(5),
  td:nth-child(5) {
    width: 10%;
  }
}

.btn-label {
  @extend .fs-small;
  // margin-left: 1rem;
  padding: 5px 10px;
  border-radius: 3px;
  background-color: rgb(22, 161, 22);
  border: 0px;
  color: #fff;
  text-decoration: none;
}

.btn-label:hover {
  background-color: rgb(28, 145, 28);
}
</style>