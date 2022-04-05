<template>
  <section id="app-section">
    <img v-bind:src="picture" :width="size" ref="imageEl" /><br />

    <form @submit.prevent="submitForm">
      <label for="">ป้อนชื่อเล่น : </label>
      <input type="text" v-on:input="setNickname" ref="nickNameEl" />
      <button type="submit">บันทึก</button>
    </form>

    <div class="info-container">
      <div class="basic-info">
        <h1>ชื่อผู้ใช้ : {{ getFullName }}</h1>
        <p v-if="nickname.length != 0">
          ชื่อเล่น : <span>{{ nickname }}</span>
        </p>
        <p v-else>ชื่อเล่น : ไม่มี</p>
        <p>
          อายุ : <span>{{ age }}</span>
        </p>
        <p>
          ที่อยู่ : <span v-html="address"></span> (v-html : To show html style
          in text)
        </p>
      </div>

      <div class="btn-second-info-container">
        <button class="btn-second-info" @click="toggleVisible()">
          {{ isVisible ? "ซ่อน" : "แสดง" }}รายละเอียด
        </button>
      </div>

      <div class="second-info" v-show="isVisible">
        <div class="hobby-info">
          <p>งานอดิเรก</p>
          <ul>
            <li v-for="(item, index) in hobby" v-bind:key="index">
              {{ index + 1 }} : {{ item }}
            </li>
          </ul>
          <span>(v-for, v-bind:key)</span>
        </div>

        <div class="addition-info">
          <p>ข้อมูลพื้นฐาน</p>
          <ul>
            <li v-for="(item, key) in general" v-bind:key="key">
              <span>{{ key }} : </span><span>{{ item }}</span>
            </li>
            <!-- <li>
              <span>เพศ : </span><span>{{ general.gender }}</span>
            </li>
            <li>
              <span>นํ้าหนัก : </span><span>{{ general.weight }}</span>
            </li>
            <li>
              <span>ส่วนสูง : </span><span>{{ general.height }}</span>
            </li>
            <li>
              <span>โรคประจำตัว : </span><span>{{ general.status }}</span>
            </li> -->
            <li>
              <span>Social : </span
              ><span><a :href="social" target="_blank">Github</a></span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <button v-on:click="showData()">คลิกเพื่อดูข้อมูล v-on:click</button>
    <button @click="increment(1)">เพิ่มค่า age @click</button>
    <button @click.ctrl.c="decrement(1)">ลดค่า age ctrl+c+click</button>
    <hr />

    <h2>Compute properties</h2>
    <div class="compute-container">
      <div class="compute-compare">
        <p>Method1 : {{ getRandomByMethod() }}</p>
        <p>Method2 : {{ getRandomByMethod() }}</p>
        <p>Compute1 : {{ getRandomByCompute }}</p>
        <p>Compute2 : {{ getRandomByCompute }}</p>
      </div>
      <div>
        <p>(From data) salary : {{ salary }}</p>
        <p>Yearly income : {{ getIncome }}</p>
        <p>
          Department (>=35000): <b>{{ getDepartment }}</b>
        </p>
        <button @click="increaseSalary(2000)">เพิ่ม salary + 2000</button>
        <button @click="decreaseSalary(2000)">ลด salary + 2000</button>
        <p>Click button and watch console log.</p>
      </div>
    </div>
    <div class="compute-conclusion">
      <p><b>Method</b> will be called everytime the page re-render.</p>
      <p><b>Compute properties</b> will be called when the data has changed.</p>
    </div>
    <hr />

    <h2>Watcher</h2>
    <div class="watcher-container">
      <div class="watcher-ex1">
        <p>Interested value : {{ interestdValue }}</p>
        <button @click="increaseinterestdValue(20)">+20</button>
        <button @click="decreaseinterestdValue(20)">-20</button>
        <div class="watcher-conclusion">
          <ul>
            <li>
              Watcher can work with Asynchronous function such as setTimeout.
            </li>
            <li>Watcher will track the interested value or object.</li>
            <li>We can add some logic to the value to do somethings events.</li>
            <li>Define watcher function by the name of interestd Value.</li>
            <li>
              The distinction of watcher and compute properties is compute
              properties can not work with Asynchromous function.
            </li>
          </ul>
        </div>
      </div>
    </div>
    <hr />

    <h2>What're tags I have learned.</h2>
    <div class="tag-conclusion-container">
      <ul class="tag-conclusion">
        <li>v-html</li>
        <li>v-on:click="function()" | @click="function()"</li>
        <li>@click.key.key.. | @click.ctrl.alt</li>
        <li>v-bind:attribute | v-bind:src="picture" | :width="size"</li>
        <li>refs="nameElement" | To get element node by javascript.</li>
        <li>
          v-if , v-else | To show element by properties value. |
          v-if="nickname.length != 0"
        </li>
        <li>v-if will render element. It destroy and recreate element.</li>
        <li>
          v-show | To show element by properties value. | v-show="isToggle"
        </li>
        <li>
          v-show will keep element in DOM and chang its CSS style when value was
          toggled.
        </li>
        <li>v-for="(item, index) in properties_data" v-bind:key="index"</li>
      </ul>
    </div>
    <hr />
  </section>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      firstname: "Teeratach",
      lastname: "Thawilwang",
      nickname: "",
      age: 26,
      address: "<i>จังหวัดขอนแก่น</i>",
      size: 140,
      social: "https://github.com/Teeratach-Thawilwang",
      picture:
        "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
      hobby: ["เขียนโปรแกรม", "ฟังเพลง", "ดูหนัง"],
      general: { gender: "ชาย", weight: 70.4, height: 170, status: false },
      isVisible: false,
      salary: 24000,
      interestdValue: 100,
    };
  },
  methods: {
    showData() {
      alert(this.firstname + " " + this.lastname);
    },
    increment(value) {
      this.age = this.age + value;
    },
    decrement(value) {
      this.age = this.age - value;
    },
    setNickname() {
      // To set value of nickName when user are typing.
      // Have to set v-on:input="setNickname" for input tag
      // Define function to setNickname(event)
      // this.nickname = event.target.value;
    },
    submitForm() {
      // to prevent auto refreash page when alert clicked.
      // event.preventDefault();
      alert("บันทึกชื่อเล่นเรียบร้อย");

      // when submitForm, the refs will be use here.
      this.nickname = this.$refs.nickNameEl.value;
    },
    toggleVisible() {
      this.isVisible = !this.isVisible;
    },
    getRandomByMethod() {
      return Math.random();
    },
    increaseSalary(val) {
      this.salary = this.salary + val;
      console.log("increaseSalary called");
    },
    decreaseSalary(val) {
      this.salary = this.salary - val;
      console.log("decreaseSalary called");
    },
    increaseinterestdValue(value) {
      this.interestdValue += value;
    },
    decreaseinterestdValue(value) {
      this.interestdValue -= value;
    },
  },
  computed: {
    getFullName() {
      return this.firstname + " " + this.lastname;
    },
    getRandomByCompute() {
      return Math.random();
    },
    getIncome() {
      return this.salary * 12;
    },
    getDepartment() {
      return this.salary >= 35000 ? "Manager" : "Developer";
    },
  },
  watch: {
    interestdValue(value) {
      if (value > 200) {
        alert("Value must not more than 200.");
        setTimeout(() => {
          this.interestdValue = 100;
        }, 2000);
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
}
#app .info-container {
  display: grid;
  grid-template-columns: 1fr;
}
.second-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 10px;
}
.second-info p {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0px 5px 0px;
  /* border: 1px solid red; */
}
.second-info ul {
  margin: 0; /* To remove default bottom margin */
  padding: 0; /* To remove default left padding */
}
.second-info li {
  list-style: none;
}
.second-info div {
  max-width: 200px;
  width: 100%;
  /* height: 160px; */
  margin: auto;
  padding-bottom: 10px;
  border: 4px solid rgb(204, 204, 204);
  border-radius: 3px;
}
.hobby-info li {
  text-align: center;
}
.addition-info li {
  display: flex;
  justify-content: space-between;
  justify-self: center;
  margin-left: 20px;
  margin-right: 20px;
  /* border: 1px solid green; */
}
.addition-info li a {
  background-color: rgb(77, 116, 199);
  text-decoration: none;
  padding: 2px 5px 2px 5px;
  border-radius: 3px;
  font-size: 14px;
  color: #fff;
}
.addition-info li a:hover {
  background-color: rgb(179, 203, 255);
  text-decoration: none;
  padding: 2px 5px 2px 5px;
  border-radius: 3px;
  font-size: 14px;
  color: rgb(77, 116, 199);
}
.btn-second-info-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
.btn-second-info {
  font-size: 15px;
  width: 150px;
  height: 30px;
  background-color: rgb(127, 127, 255);
  color: #fff;
  border-radius: 3px;
  border: 0px;
}
.btn-second-info:hover {
  font-size: 15px;
  width: 150px;
  height: 30px;
  background-color: rgb(84, 84, 211);
  color: rgb(255, 255, 255);
  border-radius: 3px;
  border: 0px;
}
.compute-container {
  display: flex;
  justify-content: space-around;
}
.compute-container div {
  width: 300px;
}
.watcher-container, .tag-conclusion-container {
  margin-bottom: 20px;
}
.watcher-conclusion, .tag-conclusion {
  width: 60%;
  margin: auto;
  text-align: left;
  line-height: 24px;
}
@media screen and (max-width: 800px) {
  .watcher-conclusion, .tag-conclusion {
    width: 90%;
    margin: auto;
  }
}
</style>
