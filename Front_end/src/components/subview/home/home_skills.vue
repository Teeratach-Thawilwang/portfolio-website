<template>
  <div class="skill-div-container">
    <div class="skill-container">
      <h1>
        Skills
        <hr />
      </h1>
      <div class="skill-item-container">
        <div class="skill-item" v-for="(item, index) in skills" :key="index">
          <div class="skil-des">
            <span>{{ item.skill }}</span>
            <span>{{ item.value }}</span>
          </div>
          <div class="progressbar">
            <div
              :style="{ width: item.value, backgroundColor: item.color }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home-skills-component",
  data() {
    return {
      skills: [
        { skill: "HTML", value: "80%", color: "rgb(0,128,0,0.6)" },
        { skill: "Javascript", value: "60%", color: "rgb(255,165,0,0.6)" },
        { skill: "CSS", value: "70%", color: "rgb(0, 89, 255, 0.6)" },
        { skill: "VueJs", value: "60%", color: "rgb(255,0,0,0.6)" },
        { skill: "PHP-Laravel", value: "60%", color: "rgb(255,165,0,0.6)" },
        { skill: "SQL", value: "60%", color: "rgb(0,128,0,0.6)" },
        { skill: "MongoDB", value: "60%", color: "rgb(255,0,0,0.6)" },
        { skill: "C/C++", value: "90%", color: "rgb(255,0,0,0.6)" },
        { skill: "Python", value: "90%", color: "rgb(0, 89, 255, 0.6)" },
        {
          skill: "Machine Learning",
          value: "70%",
          color: "rgb(255,165,0,0.6)",
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Topic-3 skill */
.skill-container {
  display: block;
  /* border: 1px solid red; */
}
.skill-container h1 {
  width: 100%;
  text-align: left;
  font-size: 2.5rem;
  font-weight: bolder;
  margin-bottom: 1rem;
  /* border: 1px solid red; */
}
.skill-item-container {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  /* border: 1px solid red; */
}
.skil-des {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border: 1px solid red; */
}
.skil-des span {
  font-size: 1.25rem;
  font-weight: normal;
  /* border: 1px solid red; */
}
.progressbar {
  background-color: #fff;
  border-radius: 10px;
}
.progressbar > div {
  /* set background-color by javascript  */
  height: 10px;
}
/* End Topic-3 skill */

@media screen and (max-width: 1024px) {
  /* Topic-3 skill */
  .skill-container h1 {
    font-size: 2rem;
  }
  /* End Topic-3 skill */
}

@media screen and (max-width: 900px) {
  /* Topic-3 skill */
  .skill-div-container {
    width: 100%;
    display: flex;
    justify-content: center;
    /* border: 1px solid rgb(13, 0, 255); */
  }
  .skill-container {
    width: 80%;
  }
  /* End Topic-3 skill */
}

@media screen and (max-width: 700px) {
  /* Topic-3 skill */
  .skill-container h1 {
    font-size: 1.5rem;
    text-align: center;
  }
  .skill-container span {
    font-size: 1rem;
  }
  /* End Topic-3 skill */
}

@media screen and (max-width: 600px) {
  /* Topic-3 skill */
  .skill-container {
    width: 90%;
  }
  .skill-container h1 {
    font-size: 2rem;
    text-align: center;
  }
  .skill-item-container {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
    /* border: 1px solid red; */
  }
  /* End Topic-3 skill */
}
</style>