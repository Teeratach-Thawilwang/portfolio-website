<template>
  <div class="carousel-container">
    <div class="carousel-frame">
      <div v-if="Images.length > 0">
        <carouselSlideGeneral
          class="carousel"
          v-for="(imgItem, index) in Images"
          :key="index"
          :index="index"
          :visibleSlide="visibleSlide"
          :direction="direction"
          @next="next"
          @prev="prev"
        >
          <img :src="imgItem" />
        </carouselSlideGeneral>
        <button v-if="Images.length > 1" @click="prev" class="prevImg">
          <fa-icon icon="angle-left" />
        </button>
        <button v-if="Images.length > 1" @click="next" class="nextImg">
          <fa-icon icon="angle-right" />
        </button>
      </div>
      <div v-else>
        <p>Post no image</p>
      </div>
    </div>
  </div>
</template>

<script>
import carouselSlideGeneral from "@/components/subview/labelpost/postImageCarrouselSlide.vue";
export default {
  name: "labelpost-carousel-container-component",
  components: {
    carouselSlideGeneral,
  },
  props: ["Images"],
  data() {
    return {
      visibleSlide: 0,
      direction: "left",
    };
  },
  computed: {
    slideLength() {
      return this.Images.length;
    },
  },
  methods: {
    prev() {
      if (this.visibleSlide <= 0) {
        this.visibleSlide = this.slideLength - 1;
      } else {
        this.visibleSlide -= 1;
      }
      this.direction = "left";
    },
    next() {
      if (this.visibleSlide >= this.slideLength - 1) {
        this.visibleSlide = 0;
      } else {
        this.visibleSlide += 1;
      }
      this.direction = "right";
    },
  },
};
</script>

<style scoped>
.carousel-container {
  position: relative;
  height: 100%;
  width: 100%;
  /* border: 1px solid red; */
}
.carousel-frame {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* border: 1px solid red; */
}
.carousel-frame div {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #111;
  /* border: 1px solid red; */
}
.carousel {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  background-color: #111;
  /* border: 1px solid red; */
}
.carousel img {
  display: block;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: 100%;
  object-fit: cover;
}
button {
  height: 100%;
  color: #fff;
  position: absolute;
  padding: 0 1rem;
  font-size: calc(2vw + 2vh - 0.5vmax);
  background-color: #000;
  opacity: 0.1;
  border: none;

  top: 50%;
  transform: translate(0, -50%);
}
.carousel-frame:hover div > button {
  opacity: 0.4;
  cursor: pointer;
}
.prevImg {
  left: 0px;
}
.nextImg {
  right: 0px;
}
</style>