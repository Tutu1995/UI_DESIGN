<template>
<section class="hero is-success is-fullheight">
    <div class="hero-body">
        <div class="container has-text-centered">
            <div class="column is-4 is-offset-4">
                <h3 class="title has-text-grey"><b>Forgot Password?</b></h3>
                <p class="subtitle has-text-grey">Please reset your password here.</p>
                <div class="box">
                    <figure class="avatar">
                        <img src="assets/img/btlogo.png">
                    </figure>
                        <div class="field">
                            <div class="control">
                                <input v-model="email" class="input is-large" type="email" placeholder="Your Email" autofocus="">
                            </div>
                        </div>


                        <!-- <div class="field">
                            <label class="checkbox">
                              <input type="checkbox">
                              Remember me
                            </label>
                        </div> -->
                        <button class="button is-block is-info is-large is-fullwidth" @click="forgotPasswd()">Send Me Email</button>
                </div>
                <p class="has-text-grey">
                    <a href="login.html">Login</a> &nbsp;·&nbsp;
                    <a href="contactus.html">Need Help?</a>
                </p>
            </div>
        </div>
    </div>
</section>
</template>

<script>

import i18n from 'assets/lang/lang.js'
import axios from 'axios'
import { API_ENDPOINT } from "components/consts.js";

export default {

  mounted() {

  },
  watch:{
  },
  data() {
    return {
      email : ''
    }
  },
  computed: {

  },
  methods: {
      switchLang (lang) {
        i18n.locale = lang
      },

      // Run Forgot Password
      async forgotPasswd() {
        // Email input empty
        if(!this.email) { return; }

        var data = {
          'email' : this.email
        };
        axios.post(this.getAPIEndPoint() + 'user/forgot', data)
        .then((response) => {
          console.log(response.data);
        })
      },
      
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

@media only screen and (min-width: 769px) {
    .column{
      position: relative;
      min-width: 300px;
      /** For grow & shrink as per screen size change values as per your requirements**/
      height: 100%;
    }
}

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
  margin-top: 30px;
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
