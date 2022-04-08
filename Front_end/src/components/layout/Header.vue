<template>
  <div class="header-app-container unselected">
    <nav>
      <div class="home-icon">
        <a href="/"><img src="../../assets/home/profile.jpg" alt="" /></a>
      </div>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/">Project</a></li>
        <li v-if="loginStatus"><a href="#">Logout</a></li>
        <li v-else><a href="#" @click="clickLogin = true">Login</a></li>
      </ul>
      <div class="Theme-icon-container" @click="changeTheme">
        <fa-icon class="Theme-icon" :icon="themeIcon" />
      </div>
    </nav>
  </div>
  <div class="login-container" :class="[clickLogin ? 'active' : '']">
    <div class="close-btn" @click="clickLogin = false">&times;</div>
    <p>Login</p>
    <form action="" class="login-form">
      <div class="form-element">
        <span>Email</span>
        <input type="text" id="email" placeholder="Enter email" />
      </div>
      <div class="form-element">
        <span>Password</span>
        <input type="password" id="password" placeholder="Enter password" />
      </div>
      <div class="form-element">
        <input type="checkbox" id="remember_me" />
        <span>Remember me</span>
      </div>
      <div class="form-element">
        <button>login</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Header-app",
  data() {
    return {
      clickLogin: false,
      loginStatus: false,
      themeMode: "dark",
      themeColor: "#fff",
      themeIcon: "sun",
    };
  },
  methods: {
    changeTheme() {
      if (this.themeIcon === "sun") {
        this.themeIcon = "moon";
        this.themeMode = "white";
        this.themeColor = "#000";
      } else {
        this.themeIcon = "sun";
        this.themeMode = "dark";
        this.themeColor = "#fff";
      }
      this.$store.dispatch('changeThemeAction');
    },
  },
  mounted(){
    this.loginStatus = this.$store.getters.getLoginState;
  },
};
</script>

<style scoped>
.header-app-container {
  height: 12vh;
  margin: 0 5vw;
  /* border: 1px solid rgb(163, 209, 113); */
}
nav {
  height: 12vh;
  display: grid;
  grid-template-columns: 25fr 65fr 10fr;
  /* border: 1px solid red; */
}
.unselected {
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}

/* Home icon */
.home-icon {
  position: relative;
  /* border: 1px solid red; */
}
.home-icon img {
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  height: 9vh;
  width: 9vh;
  object-fit: cover;
  object-position: 80% 20%;
  border-radius: 100%;
  border: calc(0.15vw + 0.5vmin) solid transparent;
  transition: ease-in-out 0.2s;
}
.home-icon img:hover {
  width: 12vh;
  height: 12vh;
  border: calc(0.15vw + 0.5vmin) solid v-bind(themeColor);
  transform: translate(0vh, 2vh);
}
/* End Home icon */

/* nav menu */
nav ul {
  padding-right: 1rem;
  /* font-size: calc(1rem + (10) * ((100vw - 375px) / (1920 - 375))); */
  font-size: calc(0.8vw + 1.5vh - 0.1vmax);
  list-style: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  /* border: 1px solid red; */
}
nav a {
  color: v-bind(themeColor);
  text-decoration: none;
  padding: calc(1vw + 1vh - 1vmax);
  margin-right: 1vw;
  border-radius: calc(5vw + 5vmin);
  border: calc(0.15vw + 0.15vmin) solid transparent;
  transition: ease-in-out 0.3s;
}
nav ul a:hover {
  border: calc(0.15vw + 0.15vmin) solid v-bind(themeColor);
}
/* End nav menu */

/* Theme icon */
.Theme-icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
}
.Theme-icon {
  color: v-bind(themeColor);
  padding: calc(0.7vw + 0.7vh - 0.45vmax);
  font-size: calc(0.5vw + 3vh - 0.1vmax);
  transition: ease-in-out 0.3s;
  border: calc(0.15vw + 0.15vmin) solid transparent;
  border-radius: 100%;
}
.Theme-icon:hover {
  border: calc(0.15vw + 0.15vmin) solid v-bind(themeColor);
  cursor: pointer;
}
/* End Theme icon */

/* Login Form */
.login-container {
  position: fixed;
  top: -150%;
  left: 50%;
  opacity: 0;
  transform: translate(-50%, -50%) scale(1.25);
  width: 380px;
  padding: 20px 30px;
  box-shadow: 5px 5px 20px 20px rgba(0, 0, 0, 0.15);
  background-color: #fff;
  border-radius: 10px;
  z-index: 2;
}
.login-container.active {
  top: 50%;
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
  transition: top 0ms ease-in-out 0ms, opacity 200ms ease-in-out 0ms,
    transform 20ms ease-in-out 0ms;
}
.login-container p {
  font-size: 24px;
  color: #222;
  font-weight: bold;
  text-align: center;
  margin: 10px 0px 20px;
  /* border: 1px solid red; */
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  height: 15px;
  width: 15px;
  text-align: center;
  line-height: 15px;
  font-size: 24px;
  color: rgb(68, 68, 68);
  cursor: pointer;
  /* border: 1px solid red; */
}
.form-element {
  margin: 15px 0px;
  /* border: 1px solid red; */
}
.form-element span {
  font-size: 14px;
  color: #222;
}
.form-element input[type="text"],
.form-element input[type="password"] {
  margin-top: 5px;
  display: block;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  border: 1px solid #aaa;
  border-radius: 5px;
}
.form-element input[type="checkbox"] {
  margin-right: 5px;
}
.form-element button {
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
  font-size: 15px;
  background-color: #222;
  color: #f5f5f5;
  border-radius: 10px;
  cursor: pointer;
}
</style>