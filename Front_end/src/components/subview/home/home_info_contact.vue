<template>
  <div class="info-contact-container">
    <div class="info-contact">
      <h1>
        General Info.
        <hr />
      </h1>
      <table>
        <tr v-for="(item, index) in GeneralInfo" :key="index">
          <th>{{ item.topic }}:</th>
          <th v-if="item.link != null">
            <a :href="item.link">{{ item.desc }}</a>
          </th>
          <th v-else>{{ item.desc }}</th>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "home-info-contact-component",
  data() {
    return {
      GeneralInfo: [
        { topic: "Name", desc: "Teeratach Thawilwang" },
        { topic: "Gender", desc: "Male" },
        { topic: "Birthdate", desc: "02 July 1995" },
        { topic: "Nationality", desc: "Thai" },
        { topic: "Phone", desc: "062-959-1812" },
        { topic: "Email", desc: "Teeratach.ten@gmail.com" },
        {
          topic: "GitHub",
          desc: "Teeratach-Thawilwang",
          link: "https://github.com/Teeratach-Thawilwang",
        },
        { topic: "Address", desc: "Muang Khon Kaen, Khon Kaen 40000." },
      ],
    };
  },
};
</script>

<style scoped>
/* Topic-2 info-contact */
.info-contact-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.info-contact {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
.info-contact h1 {
  width: 100%;
  text-align: left;
  font-size: 2.5rem;
  font-weight: bolder;
  /* border: 1px solid red; */
}
.info-contact table {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
  font-size: 1.25rem;
  /* border: 1px solid red; */
}
.info-contact tr {
  display: inline-block;
  height: 100%;
  text-align: left;
  width: 50%;
  word-wrap: break-word;
  /* border: 1px solid red; */
}
.info-contact tr th:first-child {
  display: inline-block;
  width: 30%;
  font-weight: bold;
  /* border: 1px solid red; */
}
.info-contact tr th:last-child {
  display: inline-block;
  width: 70%;
  font-weight: normal;
  /* border: 1px solid red; */
}
/* End Topic-2 info-contact */

@media screen and (max-width: 1024px) {
  /* Topic-2 info-contact */
  .info-contact {
    width: 90%;
  }
  .info-contact h1 {
    font-size: 2rem;
    text-align: left;
    /* border: 1px solid red; */
  }
  /* End Topic-2 info-contact */
}

@media screen and (max-width: 900px) {
  /* Topic-2 info-contact */
  .info-contact {
    width: 90%;
  }
  .info-contact table {
    width: 90%;
    margin: 1rem auto;
    /* border: 1px solid red; */
  }
  .info-contact tr {
    width: 100%;
  }
  /* End Topic-2 info-contact */
}

@media screen and (max-width: 700px) {
  /* Topic-2 info-contact */
  .info-contact {
    width: 90%;
    margin: 0rem auto;
  }
  .info-contact h1 {
    font-size: 1.5rem;
    text-align: center;
  }
  .info-contact table {
    width: 100%;
  }
  .info-contact tr th {
    font-size: 1rem;
    /* border: 1px solid red; */
  }
  /* End Topic-2 info-contact */
}

@media screen and (max-width: 600px) {
  /* Topic-2 info-contact */
  .info-contact {
    width: 80%;
    /* border: 1px solid red; */
  }
  .info-contact h1 {
    font-size: 2rem;
    text-align: center;
    padding: 0;
    /* border: 1px solid red; */
  }
  /* End Topic-2 info-contact */
}

@media screen and (max-width: 500px) {
  /* Topic-2 info-contact */
  .info-contact {
    width: 90%;
    /* border: 1px solid red; */
  }
  /* End Topic-2 info-contact */
}
</style>