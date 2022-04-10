<template>
  <div class="carousel-container">
    <div class="carousel-frame">
      <carouselSlide
        class="carousel"
        v-for="(imgItem, index) in profileImgs"
        :key="index"
        :index="index"
        :visibleSlide="visibleSlide"
        :direction="direction"
        @next="next"
        @prev="prev"
      >
        <img :src="imgItem" />
      </carouselSlide>
      <button @click="prev" class="prevImg">
        <fa-icon icon="angle-left" />
      </button>
      <button @click="next" class="nextImg">
        <fa-icon icon="angle-right" />
      </button>
    </div>
  </div>
</template>

<script>
import carouselSlide from "@/components/imageCarrouselSlide.vue";
export default {
  name: "carousel-container-component",
  components: {
    carouselSlide,
  },
  props: ["profileImgs"],
  data() {
    return {
      visibleSlide: 0,
      direction: "left",
    };
  },
  computed: {
    slideLength() {
      return this.profileImgs.length;
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
  border-radius: 100%;
  overflow: hidden;
  /* border: 1px solid red; */
}
.carousel {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  overflow: hidden;
}
.carousel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 0% 30%;
}
button {
  color: #fff;
  position: absolute;
  padding: 15px 2px;
  font-size: calc(2vw + 2vh - 0.5vmax);
  background-color: #000;
  opacity: 0.2;
  border-radius: 1px;
  border: none;

  top: 50%;
  transform: translate(0, -50%);
}
.carousel-frame:hover > button{
  opacity: 0.6;
  cursor: pointer;
}
.prevImg {
  left: 0px;
}
.nextImg {
  right: 0px;
}
</style>