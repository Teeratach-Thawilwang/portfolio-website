<template>
  <div class="view-home-container">
    <div id="topic-1" class="topic-container">
      <div class="self-desc">
        <h1>
          About Me
          <hr />
        </h1>
        <p>
          &emsp;Hello! My name is <b>Teeratach Thawilwang</b>. I have
          programming skills in AI, Machine Learning, and web development. I
          have ever worked as a software engineer (for 8 months). <br /><br />
          &emsp;Now, I am studying master's degree in computer science and
          researching the topic of Fake News detection by applying Machine
          learning. You can see detail in the Project.
          <br /><br />
          &emsp;I have self-learning skills and a mindset to learn new skills as
          a front-end developer. I also Interested in back-end developer.
        </p>
      </div>
      <div class="self-img">
        <carouselContainer :profileImgs="profileImages"> </carouselContainer>
      </div>
    </div>
    <div id="topic-2" class="topic-container">
      <div class="detail-contact">
        <h1>
          Detail
          <hr />
        </h1>
        <table>
          <tr>
            <th>Nickname</th>
            <th>Ne</th>
          </tr>
          <tr>
            <th>Gender</th>
            <th>Male</th>
          </tr>
          <tr>
            <th>Nationality</th>
            <th>Thai</th>
          </tr>
          <tr>
            <th>Attitude</th>
            <th>No nothing we can't do. We just can't do now.</th>
          </tr>
        </table>
      </div>
      <div class="detail-contact">
        <h1>
          Contact
          <hr />
        </h1>
        <table>
          <tr>
            <th>Phone</th>
            <th>062-959-1812</th>
          </tr>
          <tr>
            <th>Email</th>
            <th>Teeratach.ten@gmail.com</th>
          </tr>
          <tr>
            <th>GitHub</th>
            <th>
              <a href="https://github.com/Teeratach-Thawilwang"
                >Teeratach-Thawilwang</a
              >
            </th>
          </tr>
          <tr>
            <th>Address</th>
            <th>Muang Khon Kaen, Khon Kaen 40000.</th>
          </tr>
        </table>
      </div>
    </div>

    <div id="topic-3" class="topic-container">
      <div class="skill-container">
        <h1>
          Skills
          <hr />
        </h1>
        <div class="skill-item">
          <div class="skil-des">
            <p>HTML</p>
            <p>80%</p>
          </div>
          <div class="slill-level">
            <hr />
            <hr />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import carouselContainer from "../components/CarouselContainer.vue";
export default {
  name: "view-home",
  props: ["theme_app"],
  components: {
    carouselContainer,
  },
  data() {
    return {
      themeColorNormal: "#fff",
      themeColorInvert: "#000",
      profileImages: [
        require("../assets/home/profile.jpg"),
        require("../assets/home/profile2.jpg"),
        require("../assets/home/profile3.jpg"),
      ],
    };
  },
  methods: {
    changeTheme() {
      if (this.theme_app === "theme-white") {
        this.themeColorNormal = "#000";
        this.themeColorInvert = "#fff";
      } else {
        this.themeColorNormal = "#fff";
        this.themeColorInvert = "#000";
      }
    },
  },
  beforeUpdate() {
    this.changeTheme();
  },
};
</script>

<style scoped>
.view-home-container {
  width: 95vw;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 1px solid skyblue; */
}
/* Global tag */
hr {
  /* height: 1px; */
  border: 1px solid v-bind(themeColorNormal);
  background-color: v-bind(themeColorNormal);
}
a {
  text-decoration: none;
  color: v-bind(themeColorNormal);
}
/* End Global tag */
/* Global Container */
.topic-container {
  width: 80vw;
  margin-top: 3rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* border: 1px solid skyblue; */
}
.topic-container ul {
  list-style: none;
  text-align: left;
}
/* End Global Container */
/* Topic-1 Self-description */
.self-desc {
  color: v-bind(themeColorNormal);
  width: 60vw;
  font-size: 2vw;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* border: 1px solid red; */
}
.self-desc h1 {
  display: block;
  text-align: left;
  font-size: 2.5rem;
  font-weight: bolder;
  padding-right: 2rem;
  /* border: 1px solid red; */
}
.self-desc p {
  display: block;
  padding-top: 1rem;
  padding-right: 2rem;
  font-size: 1.25rem;
  font-weight: normal;
  /* text-align: justify; */
  letter-spacing: 2px;
  word-spacing: 0px;
  /* border: 1px solid red; */
}
.self-img {
  height: 20vw;
  width: 20vw;
  /* border: 1px solid red; */
}
/* End Topic-1 Self-description */
/* Topic-2 detail-contact */
#topic-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.5rem;
}
.detail-contact{
  height: 100%;
}
.detail-contact h1 {
  width: 100%;
  text-align: left;
  font-size: 2.5rem;
  font-weight: bolder;
  padding-right: 2rem;
  /* border: 1px solid red; */
}
.detail-contact table {
  width: 100%;
  padding: 0 1rem;
  margin-top: 1rem;
  font-size: 1.25rem;
  /* border: 1px solid red; */
}
.detail-contact tr th:first-child {
  /* padding-left: 1rem; */
  text-align: left;
  font-weight: bold;
  /* border: 1px solid red; */
}
.detail-contact tr th:last-child {
  padding-left: 1rem;
  text-align: left;
  font-weight: normal;
  /* border: 1px solid red; */
}
/* End Topic-2 detail-contact */
/* Topic-3 skill */
#topic-3 {
  display: block;
  /* border: 1px solid red; */
}
.skill-container
.skill-container h1{
  text-align: left;
  font-size: 2.5rem;
  font-weight: bolder;
  /* padding-right: 2rem; */
}
/* End Topic-2 skill */

@media screen and (max-width: 1024px) {
  /* Topic-1 Self-description */
  .self-desc h1 {
    font-size: 2rem;
    width: 100%;
    /* padding-left: 1rem; */
    /* padding-right: 1rem; */
    /* justify-content: center; */
  }
  .self-desc p {
    padding: 1rem;
    /* word-break: keep-all; */
    /* border: 1px solid red; */
  }
  /* End Topic-1 Self-description */
  /* Topic-2 detail-contact */
  .detail-contact h1 {
    font-size: 2rem;
    text-align: left;
    /* border: 1px solid red; */
  }
  .detail-contact table {
    font-size: 1.25rem;
    /* border: 1px solid red; */
  }
  .detail-contact tr th:first-child {
    padding-left: 0rem;
    text-align: left;
    font-weight: bold;
    /* border: 1px solid red; */
  }
  .detail-contact tr th:last-child {
    padding: 0 1rem;
    word-wrap: none;
    /* border: 1px solid red; */
  }
  /* End Topic-2 detail-contact */
}

@media screen and (max-width: 900px) {
  /* Topic-1 Self-description */
  #topic-1 {
    width: 90vw;
    /* border: 1px solid red; */
  }
  /* End Topic-1 Self-description */
  /* Topic-2 detail-contact */
  #topic-2 {
    width: 90vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* border: 1px solid red; */
  }
  .detail-contact {
    margin: 1rem auto;
    width: 80%;
    /* margin: auto; */
  }
  /* End Topic-2 detail-contact */
}

@media screen and (max-width: 700px) {
  /* Topic-1 Self-description */
  .self-desc h1 {
    font-size: 1.5rem;
    /* justify-content: center; */
  }
  .self-desc p {
    font-size: 1rem;
    padding: 1rem;
    letter-spacing: 0px;
    /* word-break: keep-all; */
  }
  /* End Topic-1 Self-description */
  /* Topic-2 detail-contact */
  .detail-contact h1 {
    font-size: 1.5rem;
    text-align: center;
  }
  .detail-contact tr th:first-child {
    font-size: 1rem;
    /* border: 1px solid red; */
  }
  .detail-contact tr th:last-child {
    font-size: 1rem;
    /* border: 1px solid red; */
  }
  /* End Topic-2 detail-contact */
}

@media screen and (max-width: 600px) {
  /* Global Container */
  .view-home-container {
    display: block;
    width: 100%;
    padding: 0;
    margin: 0;
    /* border: 1px solid red; */
  }
  .topic-container {
    width: 100vw;
    padding: 0;
    /* margin: 0; */
    /* border: 1px solid red; */
  }
  /* End Global Container */
  /* Topic-1 Self-description */
  #topic-1 {
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    width: 100%;
    /* border: 1px solid rgb(13, 0, 255); */
  }
  .self-desc {
    padding-left: 0;
    padding-right: 0;
    margin-top: 1rem;
    width: 90%;
    /* border: 1px solid red; */
  }
  .self-desc h1 {
    font-size: 2rem;
    text-align: center;
    padding: 0;
    /* border: 1px solid red; */
  }
  .self-desc p {
    padding-left: 0;
    padding-right: 0;
    letter-spacing: 1.2px;
    /* border: 1px solid red; */
  }
  .self-img {
    height: 50vw;
    width: 50vw;
    /* border: 1px solid red; */
  }
  /* End Topic-1 Self-description */
  /* Topic-2 detail-contact */
  #topic-2 {
    width: 100%;
    /* border: 1px solid rgb(13, 0, 255); */
  }
  .detail-contact {
    width: 90%;
    /* width: 85vw; */
    /* border: 1px solid red; */
  }
  .detail-contact h1 {
    font-size: 2rem;
    text-align: center;
    padding: 0;
    /* border: 1px solid red; */
  }
  .detail-contact table {
    /* border: 1px solid red; */
  }
  /* End Topic-2 detail-contact */
}
</style>