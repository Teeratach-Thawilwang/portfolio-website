<template>
  <div
    class="login-container"
    :class="[clickLoginPopUp ? 'show' : '']"
    v-click-outside="ClickOutSide.bind(null)"
  >
    <div class="close-btn" @click="closeLoginForm()">&times;</div>
    <div class="form-header">
      <span
        @click="ChooseLonginsignup('login')"
        :class="formChoiceActive == 'login' ? 'active' : ''"
        >Login</span
      >
      <span> | </span>
      <span
        @click="ChooseLonginsignup('signup')"
        :class="formChoiceActive == 'signup' ? 'active' : ''"
        >Sign Up</span
      >
    </div>
    <form
      class="login-form"
      :class="formChoiceActive"
      v-on:keydown.enter.prevent
      v-on:submit.prevent
    >
      <div class="form-element" v-show="formChoiceActive == 'signup'">
        <label>Nickname</label>
        <input
          type="text"
          id="username"
          placeholder="Enter nickname"
          v-model="inputForm.username"
          @keyup.enter="focusNextInputForm($event, 'email')"
        />
        <p v-if="v$.inputForm.username.$error">
          {{ v$.inputForm.username.$errors[0].$message }}
        </p>
      </div>
      <div class="form-element">
        <label>Email</label>
        <input
          type="text"
          id="email"
          placeholder="Enter email"
          v-model="inputForm.email"
          @keyup.enter="focusNextInputForm($event, 'password')"
        />
        <p v-if="v$.inputForm.email.$error">
          {{ v$.inputForm.email.$errors[0].$message }}
        </p>
      </div>
      <div class="form-element">
        <label>Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          v-model="inputForm.password"
          @keyup.enter="
            formChoiceActive == 'signup'
              ? focusNextInputForm($event, 'confirmPassword')
              : focusNextInputForm($event, 'remember_me')
          "
        />
        <p v-if="v$.inputForm.password.$error">
          {{ v$.inputForm.password.$errors[0].$message }}
        </p>
      </div>
      <div class="form-element" v-show="formChoiceActive == 'signup'">
        <label>Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm password"
          v-model="inputForm.passwordConfirm"
          @keyup.enter="focusNextInputForm($event, 'remember_me')"
        />
        <p v-if="v$.inputForm.passwordConfirm.$error">
          {{ v$.inputForm.passwordConfirm.$errors[0].$message }}
        </p>
      </div>
      <div class="form-element">
        <input
          type="checkbox"
          id="remember_me"
          value="true"
          v-model="inputForm.remember"
          @keyup.enter="focusNextInputForm($event, 'submitBtn')"
        />
        <label for="remember_me">Remember me</label>
      </div>
      <div class="form-element">
        <p>{{ loginResponse }}</p>
        <button @click="ClickSubmit()" id="submitBtn">
          {{ formChoiceActive == "login" ? "login" : "sign in" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import axios from "axios";
import {
  required,
  email,
  minLength,
  sameAs,
  helpers,
} from "@vuelidate/validators";
import { useCookies } from "vue3-cookies";
export default {
  name: "login-conponent",
  props: ["clickLoginPopUp"],
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  data() {
    return {
      v$: useValidate(),
      cntClickComponent: 0,
      formChoiceActive: "login",
      inputForm: {
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
        remember: true,
      },
      loginResponse: "",
    };
  },
  validations() {
    return {
      inputForm: {
        username: {
          required: helpers.withMessage("username is required.", required),
          minLength: helpers.withMessage(
            "username must have at least 6 characters.",
            minLength(6)
          ),
        },
        email: {
          required: helpers.withMessage("Email is required.", required),
          email,
        },
        password: {
          required: helpers.withMessage("Password is required.", required),
          minLength: helpers.withMessage(
            "Password must have at least 6 characters.",
            minLength(6)
          ),
        },
        passwordConfirm: {
          required: helpers.withMessage("Password is required.", required),
          sameAs: helpers.withMessage(
            "Confirm password must be the same as password.",
            sameAs(this.inputForm.password)
          ),
        },
      },
    };
  },
  methods: {
    ClickOutSide() {
      if (this.cntClickComponent > 0) {
        this.$emit("clickLoginPopUpProp", false);
        this.cntClickComponent = 0;
        return;
      }
      if (this.clickLoginPopUp) {
        this.cntClickComponent += 1;
      }
    },
    closeLoginForm() {
      this.$emit("clickLoginPopUpProp", false);
      this.cntClickComponent = 0;
    },
    ClickSubmit() {
      this.v$.$validate();
      if (
        this.formChoiceActive === "login" &&
        !this.v$.inputForm.email.$error &&
        !this.v$.inputForm.password.$error
      ) {
        // if no error validation, send login form
        let accData = {
          email: this.inputForm.email,
          password: this.inputForm.password,
        };
        axios
          .post(this.$BackendURL + "login", accData)
          .then((res) => {
            // console.log("Axios login success : ", res.data);
            // login success, set login status to vuex
            this.setLoginStatus(true);
            this.setAccount({
              username: res.data.account.username,
              email: res.data.account.email,
              token: res.data.account.token,
            });
            // set cookies login
            if (this.inputForm.remember) {
              let loginCookies = {
                email: res.data.account.email,
                token: res.data.account.token,
              };
              this.cookies.set("session", loginCookies);
            }
            // close login form
            this.closeLoginForm();
          })
          .catch((err) => {
            console.log("Axios login err : ", err.response.data);
            // show error message from server
            this.loginResponse = err.response.data.error;
          });
      } else if (
        this.formChoiceActive === "signup" &&
        !this.v$.inputForm.username.$error &&
        !this.v$.inputForm.email.$error &&
        !this.v$.inputForm.password.$error &&
        !this.v$.inputForm.passwordConfirm.$error
      ) {
        // if no error validation, send signup form
        let accData = {
          username: this.inputForm.username,
          email: this.inputForm.email,
          password: this.inputForm.password,
        };
        axios
          .post(this.$BackendURL + "signup", accData)
          .then((res) => {
            // signup success, set login status to vuex
            // console.log("Axios signup success : ", res.data);
            this.setLoginStatus(true);
            this.setAccount({
              username: res.data.account.username,
              email: res.data.account.email,
              token: res.data.account.token,
            });
            // set cookies login
            if (this.inputForm.remember) {
              let loginCookies = {
                email: res.data.account.email,
                token: res.data.account.token,
              };
              this.cookies.set("session", loginCookies);
            }
            // close login form
            this.closeLoginForm();
          })
          .catch((err) => {
            console.log("Axios signup err : ", err.response.data);
            // show error message from server
            this.loginResponse = err.response.data.error;
          });
      }
    },
    focusNextInputForm(event, id) {
      // console.log(e.target.value);
      var inputs = event.target.form.querySelectorAll('[id^="' + id + '"]');
      inputs[0].focus();
    },
    setLoginStatus(val) {
      this.$store.dispatch("setLoginAction", val);
    },
    setAccount(val) {
      this.$store.dispatch("setAccountAction", val);
    },
    ChooseLonginsignup(val) {
      this.formChoiceActive = val;
      this.loginResponse = "";
    },
  },
};
</script>

<style scoped>
/* Login Form */
.login-container {
  box-sizing: border-box;
  width: 500px;
  padding: 20px 30px;
  box-shadow: 5px 5px 20px 20px rgba(0, 0, 0, 0.15);
  background-color: #fff;
  border-radius: 10px;
  z-index: 2;
  overflow-x: hidden;
  position: fixed;
  opacity: 0;
  top: -150%;
  left: 50%;
  transform: translate(-50%, -50%) scale(2);
  transition: top 0s ease-in-out 0.5s, opacity 0.5s, transform 0.5s;
}
.login-container.show {
  opacity: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  transition: top 0s, opacity 0.5s, transform 0.5s;
}

@keyframes loginForm {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0%);
  }
}
@keyframes signupForm {
  0% {
    transform: translateX(50%);
  }
  100% {
    transform: translateX(0%);
  }
}
.login-form {
  margin: 1rem 1rem;
  /* border: 1px solid red; */
}
.login-form.login {
  animation: loginForm 0.3s ease-in-out;
  /* border: 1px solid red; */
}
.login-form.signup {
  animation: signupForm 0.3s ease-in-out;
  /* border: 1px solid orange; */
}

.form-header {
  font-size: 1.5rem;
  text-align: center;
  margin: 10px 0px 20px;
}
.form-header span:first-child,
.form-header span:last-child {
  cursor: pointer;
}

.form-header span.active {
  color: #222;
  font-weight: bold;
  text-decoration: underline;
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
.form-element label {
  font-size: 1.25rem;
  color: #222;
}
.form-element input[type="text"],
.form-element input[type="password"] {
  font-size: 1.25rem;
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
.form-element p {
  color: red;
  text-align: center;
}
.form-element button {
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
  font-size: 1.25rem;
  background-color: #222;
  color: #f5f5f5;
  border-radius: 10px;
  cursor: pointer;
}
.form-element button:hover {
  background-color: #000;
}
/* End Login Form */

@media screen and (max-width: 1024px) {
  .login-container {
    width: 450px;
  }
}
@media screen and (max-width: 900px) {
  .login-container {
    /* width: 450px; */
  }
}
@media screen and (max-width: 700px) {
  .login-container {
    width: 450px;
  }
  .form-header {
    font-size: 1.25rem;
  }
  .form-element label {
    font-size: 1rem;
  }
  .form-element input[type="text"],
  .form-element input[type="password"] {
    font-size: 1rem;
  }
  .form-element button {
    font-size: 1rem;
  }
}
@media screen and (max-width: 600px) {
  .login-container {
    width: 400px;
  }
}
@media screen and (max-width: 500px) {
  .login-container {
    width: 360px;
  }
  .login-form {
    margin: 1rem 0rem;
    /* border: 1px solid red; */
  }
}
</style>