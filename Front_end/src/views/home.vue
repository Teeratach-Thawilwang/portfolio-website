<template>
  <div class="view-home-container">
    <div id="topic-1" class="topic-container">
      <!-- aboutme -->
      <aboutme></aboutme>
    </div>
    <div id="topic-2" class="topic-container">
      <!-- info-contact -->
      <infoContact></infoContact>
    </div>
    <div id="topic-3" class="topic-container">
      <!-- skill -->
      <skills></skills>
    </div>
    <div id="topic-4" class="topic-container">
      <!-- education-container -->
    </div>
  </div>
</template>

<script>
import aboutme from "@/components/subview/home/home_aboutme.vue";
import infoContact from "@/components/subview/home/home_info_contact.vue";
import skills from "@/components/subview/home/home_skills.vue";
export default {
  name: "view-home",
  components: {
    aboutme,
    infoContact,
    skills,
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
  computed: {
    themeColorNormal() {
      return this.$store.getters.getThemeColorNormal;
    },
    themeColorInvert() {
      return this.$store.getters.getThemeColorInvert;
    },
  },
  methods: {},
};
</script>

<style>
/* Global tag */
hr {
  border: 1px solid v-bind(themeColorNormal);
  background-color: v-bind(themeColorNormal);
}
a {
  text-decoration: underline;
  color: v-bind(themeColorNormal);
}
h1 {
  font-size: 2.5rem;
  font-weight: bolder;
  text-align: left;
}
p {
  padding: 0 1rem;
  font-size: 1.25rem;
  letter-spacing: 2px;
  word-spacing: 0px;
}

@media screen and (max-width: 1024px) {
  h1 {
    font-size: 2rem;
  }
}
@media screen and (max-width: 900px) {
}
@media screen and (max-width: 700px) {
  h1 {
    font-size: 1.5rem;
  }
  p {
    font-size: 1rem;
    padding: 0 1rem;
    letter-spacing: 0px;
    /* word-break: keep-all; */
  }
}
@media screen and (max-width: 600px) {
  h1 {
    font-size: 2rem;
    text-align: center;
    padding: 0;
    /* border: 1px solid red; */
  }
  p {
    padding: 0;
    letter-spacing: 0px;
    /* color: yellow; */
  }
}
/* End Global tag */
</style>

<style scoped>
.view-home-container {
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 1px solid skyblue; */
}
/* Global Container */
.topic-container {
  display: block;
  width: 90%;
  margin-top: 3rem;
  /* border: 1px solid skyblue; */
}
/* End Global Container */

@media screen and (max-width: 1024px) {
}
@media screen and (max-width: 900px) {
}
@media screen and (max-width: 700px) {
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
    width: 100%;
    padding: 0;
    /* border: 1px solid red; */
  }
  /* End Global Container */
}
</style>