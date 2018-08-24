<template>
<section class="hero is-success is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-grey"><b>Reset Password</b></h3>
                    <div class="box">
                        <figure class="avatar">
                            <img src="/assets/img/btlogo.png">
                        </figure>
                          <div class="field">
                            <div class="control">
                              <input class="input is-large" type="password" placeholder="New Password" @focus="passwd1Valid = true; passwdMatch=true;" @blur="verifyPasswd1()" :class="{'is-danger' : !passwd1Valid || !passwdMatch}" v-model="passwd1">
                              <p class='help is-danger' v-show="!this.passwd1Valid">Password does not meet the requirements.</p>
                              <input class="input is-large" type="password" placeholder="Re-type Password" @blur="checkPasswdMatch()" v-model="passwd2" :class="{'is-danger' : !passwdMatch}" @focus="passwdMatch = true" style="margin-top:10px;">
                              <p class="help is-danger" v-show="!this.passwdMatch" >Passwords do not match.</p>
                            </div>
                          </div>
                          <button class="button is-block is-info is-large is-fullwidth" @click="resetPasswd()">Reset</button>
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
import { API_ENDPOINT, passwdRegEx} from "components/consts.js";
export default {

  mounted() {

  },

  created() {
    this.resetToken = this.getParams();
  },
  
  data() {
    return {
      passwd1 : '',
      passwd2 : '',
      passwdEmpty : false,
      passwdMatch : true,
      passwd1Valid : true,
      resetToken: ''
    }
  },
  computed: {

  },
  methods: {
      switchLang (lang) {
        i18n.locale = lang
      },

      // Run Reset Password
      async resetPasswd() {
        // both passwords should match and apply password rules
        this.checkPasswdEmpty();
        if(this.passwdEmpty) { return; }
        this.verifyPasswd1();
        if(!this.passwd1Valid) { return; }
        this.checkPasswdMatch();
        if(!this.passwdMatch) { return; }
        
        var data = {
          'password' : this.passwd1,
          'confirm_password' : this.passwd2,
          'token': this.resetToken
        };

        //Parse and get the token from url
        axios.post(this.getAPIEndPoint() + 'user/reset', data)
        .then((response) => {
          console.log(response.data);
        })
      },

      checkPasswdEmpty() {
        if(!(this.passwd1 || this.passwd2)) {
          this.passwdsEmpty = true;
        } else {
          this.passwdEmpty = false;
        }
      },

      checkPasswdMatch() {
        if(!this.passwd2) {
          this.passwdMatch = true;
          return;
        }

        if(this.passwd1 != this.passwd2) {
          this.passwdMatch = false;
        } else {
          this.passwdMatch = true;
        }
      },

      verifyPasswd1() {
        if(this.passwd1) {
          this.passwd1Valid = passwdRegEx.test(this.passwd1);
        }
        this.checkPasswdMatch();
      },
      
      getAPIEndPoint(){
        if (window.location.hostname == "127.0.0.1" || window.location.hostname == "localhost" ) {
          // return "http://blockterms.local:8000/api/v1.0/"
          return "http://192.168.99.100:2222/api/v1.0/"
        }
        return API_ENDPOINT
      },

      // getRedirectUrl(){
      //    if (window.location.hostname == "127.0.0.1" || window.location.hostname == "localhost" ) {
      //      // return "http://blockterms.local:8000/myproduct.html"
      //      return "http://127.0.0.1:8010/myproduct.html"
      //    }
      //    return "/myproduct.html"
      // },

      getParams() {
        var url = new URL(window.location.href);
        return url.searchParams.get("token");
      }
  },



}

</script>

<style lang="css">

@media only screen and (min-width: 769px) {
    .column{
      position: relative;
      min-width: 300px;
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
  margin-bottom: 5px;
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
