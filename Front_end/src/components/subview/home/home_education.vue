<template>
  
</template>

<script>
export default {

}
</script>

<style scoped>
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
  /* Topic-3 skill */
  #topic-3 h1 {
    font-size: 2rem;
  }
  /* End Topic-3 skill */
}

@media screen and (max-width: 900px) {
  /* Topic-1 Self-description */
  .self-container {
    width: 90%;
    /* border: 1px solid red; */
  }
  /* End Topic-1 Self-description */
  /* Topic-2 detail-contact */
  #topic-2 {
    width: 100%;
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
  /* Topic-3 skill */
  #topic-3 {
    width: 80%;
  }
  /* End Topic-3 skill */
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
  /* Topic-3 skill */
  #topic-3 h1 {
    font-size: 1.5rem;
    text-align: center;
  }
  #topic-3 span {
    font-size: 1rem;
  }
  /* End Topic-3 skill */
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
  /* Topic-2 detail-contact */
  #topic-2 {
    width: 100%;
    /* border: 1px solid rgb(13, 0, 255); */
  }
  .detail-contact {
    width: 90%;
    /* border: 1px solid red; */
  }
  .detail-contact h1 {
    font-size: 2rem;
    text-align: center;
    padding: 0;
    /* border: 1px solid red; */
  }
  /* End Topic-2 detail-contact */
  /* Topic-3 skill */
  #topic-3 {
    width: 100%;
    display: flex;
    justify-content: center;
    /* border: 1px solid rgb(13, 0, 255); */
  }
  .skill-container {
    width: 90%;
  }
  #topic-3 h1 {
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