<template>
  <div class="info-contact-container">
    <div class="info-contact">
      <h1>
        General Info.
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
    <div class="info-contact">
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
</template>

<script>
export default {
  name: "home-info-contact-component",
  data() {
    return {};
  },
};
</script>

<style scoped>
/* Topic-2 info-contact */
.info-contact-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.5rem;
}
.info-contact {
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
  padding: 0 1rem;
  margin-top: 1rem;
  font-size: 1.25rem;
  /* border: 1px solid red; */
}
.info-contact tr th:first-child {
  /* padding-left: 1rem; */
  text-align: left;
  font-weight: bold;
  /* border: 1px solid red; */
}
.info-contact tr th:last-child {
  padding-left: 1rem;
  text-align: left;
  font-weight: normal;
  /* border: 1px solid red; */
}
/* End Topic-2 info-contact */

@media screen and (max-width: 1024px) {
  /* Topic-2 info-contact */
  .info-contact h1 {
    font-size: 2rem;
    text-align: left;
    /* border: 1px solid red; */
  }
  .info-contact table {
    font-size: 1.25rem;
    /* border: 1px solid red; */
  }
  .info-contact tr th:first-child {
    padding-left: 0rem;
    text-align: left;
    font-weight: bold;
    /* border: 1px solid red; */
  }
  .info-contact tr th:last-child {
    padding: 0 1rem;
    word-wrap: none;
    /* border: 1px solid red; */
  }
  /* End Topic-2 info-contact */
}

@media screen and (max-width: 900px) {
  /* Topic-2 info-contact */
  .info-contact-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* border: 1px solid red; */
  }
  .info-contact {
    margin: 1rem auto;
    width: 80%;
    /* margin: auto; */
  }
  /* End Topic-2 info-contact */
}

@media screen and (max-width: 700px) {
  /* Topic-2 info-contact */
  .info-contact {
    margin: 0rem auto;
  }
  .info-contact h1 {
    font-size: 1.5rem;
    text-align: center;
  }
  .info-contact tr th:first-child {
    font-size: 1rem;
    /* border: 1px solid red; */
  }
  .info-contact tr th:last-child {
    font-size: 1rem;
    /* border: 1px solid red; */
  }
  /* End Topic-2 info-contact */
}

@media screen and (max-width: 600px) {
  /* Topic-2 info-contact */
  .info-contact-container {
    width: 100%;
    /* border: 1px solid rgb(13, 0, 255); */
  }
  .info-contact {
    width: 90%;
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
</style>