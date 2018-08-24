<template>
<section class="hero is-success is-fullheight">
    <div class="hero-body">
        <div class="container has-text-centered">
          <div class="columns is-centered is-mobile">
            <div class="column is-5-desktop  is-6-tablet is-10-mobile">
                <h3 class="title has-text-grey">blockterms</h3>
                <p class="subtitle has-text-grey">Please login to proceed.</p>
                <div class="box">
                  <figure class="avatar">
                      <img src="assets/img/btlogo.png">
                  </figure>
                  <div class="field">
                    <div class="control">
                        <input v-model="email" class="input is-large" type="email" placeholder="Your Email" :class="{'is-danger' : loginError}" @focus="loginError = false">
                    </div>
                  </div>
                  <div class="field">
                    <div class="control">
                        <input v-model="password" class="input is-large" type="password" placeholder="Your Password" :class="{'is-danger' : loginError}" @focus="loginError = false">
                    </div>
                  </div>
                  <button class="button is-block is-info is-large is-fullwidth" @click="login()">Login</button>
                  <p class="help is-danger" v-show="loginError">Incorrect email/password.</p>
                  <figure class="icons">
                      <img src="assets/img/socmedia/facebook.png" class="facebook">
                  </figure>
                  <figure class="icons">
                      <img src="assets/img/socmedia/twitter.png" class="twitter">
                  </figure>
                </div>
                <p class="has-text-grey">
                    <a href="signup.html">Sign Up</a> &nbsp;·&nbsp;
                    <a href="forgot.html">Forgot Password</a> &nbsp;·&nbsp;
                    <a href="contactus.html">Need Help?</a>
                </p>
            </div>
          </div>
          </div>
    </div>
</section>
</template>

<script>

import axios from 'axios'

import i18n from 'assets/lang/lang.js'

import {API_ENDPOINT} from 'components/consts'

export default {

  mounted() {

  },
  created() {
    // If session exists, redirect to home
    if(localStorage.getItem("Authorization") != null) {
      window.location.href = this.getRedirectUrl();
    }
  },
  watch:{
  },

  // TODO: Map email and password to input fields using v-model
  data() {
    return {
      email: '',
      password: '',
      loginError: false
    }
  },
  computed: {

  },
  methods: {
      switchLang (lang) {
        i18n.locale = lang
      },

      async login() {
        if(!this.email || !this.password) {
          return
        }

        var data = {
          'email': this.email,
      	  'password': this.password
        }

        axios.post(this.getAPIEndPoint() + 'user/login', data)
        .then((response) => {

          if(response.data.error) {
            this.loginError = true;
            return;
          }
          console.log(response.data.token);
          localStorage.setItem("Authorization", "Bearer " + response.data.token);
          localStorage.setItem("uid", response.data.userId);
          this.loginError = false;
          window.location.href = this.getRedirectUrl();
        })
      },

      // Returns server URL
      getAPIEndPoint(){
        if (window.location.hostname == "127.0.0.1" || window.location.hostname == "localhost" ) {
          // return "http://blockterms.local:8000/api/v1.0/"
          return "http://192.168.99.100:2222/api/v1.0/"
        }
        return API_ENDPOINT
      },

      getRedirectUrl(){
         if (window.location.hostname == "127.0.0.1" || window.location.hostname == "localhost" ) {
           // return "http://blockterms.local:8000/myproduct.html"
           return "http://127.0.0.1:8010/myproduct.html"
         }
         return "/myproduct.html"
      },

  },



}

</script>

<style lang="css">

html,body {
  font-family: 'Miriam Libre';
  font-size: 14px;
  font-weight: 300;
  background: #f2f2f2;
}

.hero.is-success {
  background: linear-gradient(#7bc6cc,#be93c5);
}
.hero .nav, .hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.box {
  margin-top: 5rem;

}
.avatar {
  margin-top: -70px;
  padding-bottom: 20px;

}
.title {
  font-family: Miriam Libre,Arial,Helvetica,source-han-sans-simplified-c,å®‹ä½“,SimSun,åŽæ–‡ç»†é»‘,STXihei,sans-serif;
  font-weight: 700;
  font-size: 33px;
}
.avatar img {
  padding: 5px;
  background: #fff;
  border-radius: 0%;
  -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  height: 100px;
  width: 100px;
}
input {
  font-weight: 300;
}
p {
  font-weight: 700;
}
p.subtitle {
  padding-top: 1rem;
}

/* Add a hover effect if you want */
.fa:hover {
    opacity: 10.7;
}

/* Set a specific color for each brand */
.icons{
  position: relative;
  left:5%;
  text-align: center;
  margin-top: 15px;
  padding: 5px;
  width: 40px;
  display: inline-block;
}

/* Facebook */
.facebook {
  background: #3B5998;
  color: white;
  font-size: 2px;
  border-radius: 0%;
}

.twitter {
  background: #dd4b39;
  color: white;
  background: #3B5998;
  border-radius: 0%;
}

/* Style all font awesome icons */
.fa {
    margin-top: 10px;
    padding: 10px;
    font-size: 2px;
    width: 40px;
    text-align: center;
    text-decoration: none;
    border-radius: 10%;
    position: relative;


}
</style>
