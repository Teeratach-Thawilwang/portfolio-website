<template>
  <div class="self-container">
    <div class="self-desc">
      <h1>
        About Me
        <hr />
      </h1>
      <p>
        Hello! My name is <b>Teeratach Thawilwang</b>. I have programming skills
        in AI, Machine Learning, and web development. I have ever worked as a
        software engineer (for 8 months).
      </p>
      <p>
        Now, I am studying master's degree in computer science and researching
        the topic of Fake News detection by applying Machine learning.
      </p>
      <p>
        I have self-learning skills and a mindset to learn new skills as a
        front-end developer. I also Interested in back-end developer.
      </p>
    </div>
    <div class="self-img">
      <imageCarousel :profileImgs="profileImages"> </imageCarousel>
    </div>
  </div>
</template>

<script>
import imageCarousel from "@/components/imageCarouselContainer.vue";
export default {
  name: "home-aboutme-component",
  components: {
    imageCarousel,
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
  text-indent: 2rem;
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
  .self-container {
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    width: 100%;
    /* border: 1px solid rgb(13, 0, 255); */
  }
  .self-desc {
    width: 90%;
  }
  .self-desc h1 {
    padding: 0rem;
    font-size: 2rem;
    width: 100%;
  }
  .self-desc p {
    padding: 1rem 0 0 0;
    /* border: 1px solid red; */
  }
  /* End Topic-1 Self-description */
}

@media screen and (max-width: 900px) {
  /* Topic-1 Self-description */
  .self-desc {
    width: 90%;
  }
  .self-desc p {
    padding: 1rem 0;
    letter-spacing: 0px;
    /* word-break: keep-all; */
  }
  /* End Topic-1 Self-description */
}

@media screen and (max-width: 700px) {
  /* Topic-1 Self-description */
  .self-desc {
    margin-top: 1rem;
    width: 90%;
  }
  .self-desc h1 {
    font-size: 1.5rem;
    text-align: center;
  }
  .self-desc p {
    font-size: 1rem;
    padding: 1rem 0 0 0;
    letter-spacing: 0px;
    /* word-break: keep-all; */
  }
  .self-img {
    height: 25vw;
    width: 25vw;
    /* border: 1px solid red; */
  }
  /* End Topic-1 Self-description */
}

@media screen and (max-width: 600px) {
  /* Topic-1 Self-description */
  .self-desc {
    padding: 1rem 0;
    margin-top: 1rem;
    width: 80%;
    /* border: 1px solid red; */
  }
  .self-desc h1 {
    font-size: 2rem;
    text-align: center;
    padding: 0;
    /* border: 1px solid red; */
  }
  .self-desc p {
    padding: 1rem 0 0 0;
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

@media screen and (max-width: 500px) {
  /* Topic-1 Self-description */
  .self-desc {
    padding: 1rem 0 0 0;
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
    padding: 1rem 0 0 0;
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