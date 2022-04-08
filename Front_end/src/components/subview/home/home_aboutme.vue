<template>
  <div class="self-container">
    <div class="self-desc">
      <h1>
        About Me
        <hr />
      </h1>
      <p>
        &emsp;Hello! My name is <b>Teeratach Thawilwang</b>. I have programming
        skills in AI, Machine Learning, and web development. I have ever worked
        as a software engineer (for 8 months). <br /><br />
        &emsp;Now, I am studying master's degree in computer science and
        researching the topic of Fake News detection by applying Machine
        learning. You can see detail in the Project.
        <br /><br />
        &emsp;I have self-learning skills and a mindset to learn new skills as a
        front-end developer. I also Interested in back-end developer.
      </p>
    </div>
    <div class="self-img">
      <carouselContainer :profileImgs="profileImages"> </carouselContainer>
    </div>
  </div>
</template>

<script>
import carouselContainer from "@/components/CarouselContainer.vue";
export default {
  name: "home-aboutme-component",
  components: {
    carouselContainer,
  },
  data() {
    return {
      profileImages: [
        require("@/assets/home/profile.jpg"),
        require("@/assets/home/profile2.jpg"),
        require("@/assets/home/profile3.jpg"),
      ],
    };
  },
};
</script>

<style scoped>
/* Topic-1 Self-description */
.self-container {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* border: 1px solid red; */
}
.self-desc {
  color: v-bind(themeColorNormal);
  width: 80%;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* border: 1px solid red; */
}
.self-desc p b {
  text-decoration: underline;
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
  letter-spacing: 2px;
  word-spacing: 0px;
  /* border: 1px solid red; */
}
.self-img {
  display: block;
  height: 20vw;
  width: 20vw;
  /* border: 1px solid red; */
}
/* End Topic-1 Self-description */

@media screen and (max-width: 1024px) {
  /* Topic-1 Self-description */
  .self-desc h1 {
    font-size: 2rem;
    width: 100%;
  }
  .self-desc p {
    padding: 1rem;
    /* border: 1px solid red; */
  }
  /* End Topic-1 Self-description */
}

@media screen and (max-width: 900px) {
  /* Topic-1 Self-description */

  /* End Topic-1 Self-description */
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
}

@media screen and (max-width: 600px) {
  /* Topic-1 Self-description */
  .self-container {
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
    letter-spacing: 0px;
    /* border: 1px solid red; */
  }
  .self-img {
    height: 50vw;
    width: 50vw;
    /* border: 1px solid red; */
  }
  /* End Topic-1 Self-description */
}
</style>