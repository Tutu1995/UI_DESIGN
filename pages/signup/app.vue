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
                    <div>
                        <!-- <div class="field">
                            <div class="control">
                                <input v-model="name" class="input is-large" type="name" placeholder="Your Name">
                            </div>
                        </div> -->

                        <div class="field">
                          <div class="wrap-input100 validate-input" data-validate="Name is required">
                            <div class="control has-icons-left has-icons-right">
                                <input v-model="name" class="input is-large" type="name" placeholder="Your Name"
                                autofocus=""
                                @focus="nameEntering = true"
                                @blur="nameEntering = false"
                                :class="{'is-danger' : !name.trim().length > 0 && !nameEntering}">

                                  <!-- <input class="input is-success" type="text" placeholder="Text input" value="bulma"> -->
                                  <span class="icon is-small is-left">
                                    <i class="fas fa-user"></i>
                                  </span>
                                  <span class="icon is-small is-right" style="color:green;" v-if="name.trim().length > 0 ">
                                    <i class="fas fa-check-circle"></i>
                                  </span>
                                  <span class="icon is-small is-right" style="color:red;" v-if="!name.trim().length > 0 && !nameEntering">
                                    <i class="fas fa-times-circle"></i>
                                  </span>

                                </div>
                                <p class="help is-danger" style="text-align:left;" v-if="!name.trim().length > 0 && !nameEntering">Name is required</p>

                              </div>
                            <!-- <p class="help is-success">This username is available</p> -->
                            <!-- <div class="validationIcons">
                              <i class="input_error_icon">
                                <svg viewBox="0 0 20 20">
                                  <path d="M10,0.982c4.973,0,9.018,4.046,9.018,9.018S14.973,19.018,10,19.018S0.982,14.973,0.982,10 S5.027,0.982,10,0.982 M10,0C4.477,0,0,4.477,0,10c0,5.523,4.477,10,10,10s10-4.477,10-10C20,4.477,15.523,0,10,0L10,0z M9,5.703 V5.441h2.5v0.262l-0.66,5.779H9.66L9,5.703z M9.44,12.951h1.621v1.491H9.44V12.951z">

                                  </path>
                                </svg>
                              </i>
                              <i class="input_valid_icon">
                                <svg viewBox="0 0 23 23">
                                  <path d="M11.5,23C5.2,23,0,17.8,0,11.5S5.2,0,11.5,0S23,5.2,23,11.5S17.8,23,11.5,23z M11.5,1C5.7,1,1,5.7,1,11.5S5.7,22,11.5,22 S22,17.3,22,11.5S17.3,1,11.5,1z M10.4,15.2l6.7-7c0.2-0.2,0.2-0.5,0-0.7c-0.2-0.2-0.5-0.2-0.7,0L10,14.2L7,11 c-0.2-0.2-0.5-0.2-0.7,0c-0.2,0.2-0.2,0.5,0,0.7l3.4,3.5c0.1,0.1,0.2,0.1,0.3,0.1S10.3,15.3,10.4,15.2z">

                                  </path>
                                </svg>
                              </i>
                            </div> -->

                        </div>


                        <div class="field">

                            <div class="control has-icons-left has-icons-right" data-validate = "Valid email is required: ex@abc.xyz">
                                <input v-model="email" class="input is-large" type="email"
                                       placeholder="Your Email"
                                       autofocus=""
                                       :class="{'is-danger' : email.trim().length > 0 && !emailEntering && !validEmail}"
                                  @focus="emailEntering = true"
                                  @blur="emailEntering = false">
                                <span class="icon is-small is-left">
                                  <i class="fas fa-envelope"></i>
                                </span>
                                <span class="icon is-small is-right" style="color:green;" v-if="email.trim().length > 0 && !emailEntering && validEmail">
                                  <i class="fas fa-check-circle"></i>
                                </span>
                                <span class="icon is-small is-right" style="color:red;" v-if="email.trim().length > 0 && !emailEntering && !validEmail">
                                  <i class="fas fa-times-circle"></i>
                                </span>
                            </div>

                              <p class="help is-danger" style="text-align:left;" v-if="email.trim().length > 0 && !emailEntering && !validEmail">Not a valid email</p>
                        </div>

                        <!-- <div class="field"> -->
  <!-- <label class="label">Email</label>
  <div class="control has-icons-left has-icons-right">
    <input class="input is-danger" type="email" placeholder="Email input" value="hello@">
    <span class="icon is-small is-left">
      <i class="fas fa-envelope"></i>
    </span>
    <span class="icon is-small is-right">
      <i class="fas fa-exclamation-triangle"></i>
    </span>
  </div>
  <p class="help is-danger">This email is invalid</p>
</div> -->


                        <div id="app" class="field">
                            <div class="control has-icons-left has-icons-right" data-validate = "Password is required">

                                <input v-model="password1" class="input is-large" type="password" placeholder="Your Password"
                                @input="password_check"
                                autofocus=""
                                :class="{'is-danger' :password1.trim().length > 0 && !passwordEntering && !passwordValid}"
                                 @focus="passwordEntering = true"
                                 @blur="passwordEntering = false">
                                <span class="icon is-small is-left">
                                  <i class="fas fa-lock"></i>
                                </span>
                                <!-- <span class="icon is-small is-right" style="color:green;" v-if="password1.trim().length > 0 && !passwordEntering && passwordValid">
                                  <i class="fas fa-check-circle"></i>
                                </span>
                                <span class="icon is-small is-right" style="color:red;" v-if="password1.trim().length > 0 && !passwordEntering && !passwordValid && strongPasswd">
                                  <i class="fas fa-times-circle"></i>
                                </span> -->
                                <div v-if="passwordEntering || password1.length >0">
                                    <p class="frmValidation" :class="{'frmValidation--passed' : password1.length > 7}">
                                      <span v-show="password1.length > 7"><i class="frmIcon fas fa-check"></i></span>
                                      <span v-show="password1.length <= 7"><i  class="frmIcon fas fa-times" ></i></span>
                                      Longer than 7 characters
                                    </p>

                                    <p class="frmValidation" :class="{'frmValidation--passed' : has_uppercase }">
                                      <span v-show="has_uppercase"><i class="frmIcon fas fa-check"></i></span>
                                      <span v-show="!has_uppercase"><i  class="frmIcon fas fa-times" ></i></span>
                                      Has a uppercase letter
                                    </p>

                                    <p class="frmValidation" :class="{'frmValidation--passed' : has_lowercase }">
                                      <span v-show="has_lowercase"><i class="frmIcon fas fa-check"></i></span>
                                      <span v-show="!has_lowercase"><i  class="frmIcon fas fa-times" ></i></span>
                                      Has a lowercase letter
                                    </p>

                                    <p class="frmValidation" :class="{'frmValidation--passed' : has_number }">
                                      <span v-show="has_number"><i class="frmIcon fas fa-check"></i></span>
                                      <span v-show="!has_number"><i  class="frmIcon fas fa-times" ></i></span>
                                      Has a number
                                    </p>

                                    <p class="frmValidation" :class="{'frmValidation--passed' : has_special }">
                                      <span v-show="has_special"><i class="frmIcon fas fa-check"></i></span>
                                      <span v-show="!has_special"><i  class="frmIcon fas fa-times" ></i></span>
                                       Has a special character
                                     </p>
                               </div>



                                 <span class="icon is-small is-right" style="color:green;" v-show="password1.trim().length > 0  && has_number && has_special && has_lowercase && has_uppercase">
                                   <i class="fas fa-check-circle"></i>

                                 </span>
                                 <span class="icon is-small is-right" style="color:red;" v-if="password1.trim().length > 0 && !password1Entering && (!has_special || !has_lowercase || !has_uppercase || !has_number)">
                                   <i class="fas fa-times-circle"></i>
                                 </span>





                              <!-- <div v-if="passwordEntering">

                                <ul style="text-align:left;">
                                  <div>
                                    <li>
                                      <span v-if=""> <i class="has-text-info fas fa-info-circle is-large"></i> Use 8 or more characters</span>
                                    </li>
                                    <li>
                                      <span v-if="PasswdLength"> <i class="has-text-success fas fa-check-square is-large"></i> Use 8 or more characters</span>
                                    </li>
                                  </div>
                                  <li >
                                    <span> <i class="has-text-info fas fa-info-circle is-large"></i> At least 1 lowercase, uppercase, numeric &amp; special character</span>
                                </li>
                                </ul>
                              </div> -->



                            </div>
                            <p class="help is-danger" style="text-align:left;" v-if="password1.trim().length > 0 && !passwordEntering && !passwordValid && strongPasswd">

                            </p>
                        </div>


                        <!-- <p class="notification is-danger" v-show="!strongPasswd">
                          <ul style="text-align:left;">
                              <li>New password does not meet the requirements.</li>
                              <li>Min. 8 characters &amp; max. 25 characters</li>
                              <li>Atleast 1 lowercase, uppercase, numeric &amp; special character</li>
                          </ul>
                        </p> -->



                        <!-- <div class="field">
                          <label class="label">Username</label>
                          <div class="control has-icons-left has-icons-right">
                            <input class="input is-success" type="text" placeholder="Text input" value="bulma">
                            <span class="icon is-small is-left">
                              <i class="fas fa-user"></i>
                            </span>
                            <span class="icon is-small is-right">
                              <i class="fas fa-check"></i>
                            </span>
                          </div>
                          <p class="help is-success">This username is available</p>
                        </div> -->



                       <!-- <p v-if="inputPasswords" class="message is-small">
                         <ul>
                             <li>Min. 8 characters &amp; max. 25 characters</li>
                             <li>Atleast 1 lowercase, uppercase, numeric &amp; special character</li>
                         </ul>
                       </p> -->


                        <div class="field">
                            <div class="control has-icons-left has-icons-right" data-validate = "Repeat Password is required">
                                <input v-model="password2"
                                  @input="checkPasswords()" class="input is-large" type="password"
                                  @focus="passwordEntering = true"
                                  @blur="passwordEntering = false"
                                placeholder="Retype Password" :class ="{'is-danger' : !passwordValid}">
                                <span class="icon is-small is-left">
                                  <i class="fas fa-lock"></i>
                                </span>

                            <!-- <p class="help is-danger" style="text-align:left;" v-if="!passwordValid">Passwords don't match</p> -->
                            <span class="icon is-small is-right" style="color:green;" v-show="password2.trim().length > 0  && passwordValid">
                              <i class="fas fa-check-circle"></i>
                            </span>
                            <span class="icon is-small is-right" style="color:red;" v-show="password2.trim().length > 0 && passwordEntering && !passwordValid">
                              <i class="fas fa-times-circle"></i>
                            </span>
                            </div>

                        </div>

                          <button class="button is-block is-info is-large is-fullwidth"
                                  @click="register()">Sign Up</button>
                          <p v-if="!passwordValid">Passwords don't match</p>
                      </div>
                          <figure class="icons">
                            <a href="https://facebook.com">
                              <img src="assets/img/socmedia/facebook.png" class="facebook" >
                            </a>
                          </figure>

                          <figure class="icons">
                              <img src="assets/img/socmedia/twitter.png" class="twitter">
                          </figure>

                </div>
                <p class="has-text-grey">
                    <a href="login.html">Login</a> &nbsp;·&nbsp;
                    <a href="contactus.html">Need Help?</a>
                </p>
            </div>
          </div>
        </div>
    </div>
</section>
</template>



<script src="http://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.js"></script>


<script>

import i18n from 'assets/lang/lang.js'
import {mailRegEx, passwdRegEx, API_ENDPOINT} from 'components/consts'

import axios from 'axios'
export default {

  mounted() {

  },

  watch:{
  },

  data() {
    return {
      name: '',
      password1: '',
      password2: '',
      email: '',
      passwordValid : true,
      strongPasswd: true,
      emailValid: true,
      emailEntering: false,
      nameEntering: false,
      passwordEntering: false,
      PasswdLength: false,
      has_number:    false,
      has_lowercase: false,
      has_uppercase: false,
      has_special:   false,


    }
  },
  computed: {
    validEmail : function(){
      return mailRegEx.test(this.email);
    }
  },

  methods: {
      checkPasswords() {
        this.passwordValid = (this.password1 ===  this.password2);
      },

      switchLang (lang) {
        i18n.locale = lang
      },

      checkStrongPasswd() {
          if(this.password1) {
              this.strongPasswd = passwdRegEx.test(this.password1);
          }
      },

      validateEmail() {
          this.emailValid = mailRegEx.test(this.email);
          console.log(this.emailValid);
      },

      password_check: function () {
          this.has_number    = /\d/.test(this.password1);
          this.has_lowercase = /[a-z]/.test(this.password1);
          this.has_uppercase = /[A-Z]/.test(this.password1);
          this.has_special   = /[!@#\$%\^\&*\)\(+=._-]/.test(this.password1);
      },

      async register() {
          if(!(this.name && this.email && this.password1 && this.password2)) {
              return;
          }
          this.checkPasswords();
          if(!this.passwordValid) {
              return;
          }

          var data = {
              'name' : this.name,
              'email': this.email,
              'password' : this.password1
          }

          axios.post(this.getAPIEndPoint() + 'user/register', data)
          .then((response) => {
              if(response.data.error) {
                  console.log(response.data.message);
              }
              console.log(response.data);
            // window.location.href = this.getRedirectUrl();
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
           return "http://127.0.0.1:8010/login.html"
         }
         return "/myproduct.html"
      },

  },



}

</script>
<link href="https://use.fontawesome.com/releases/v5.0.1/css/all.css" rel="stylesheet" />
<style lang="css">

@media only screen and (min-width: 769px) {
    .column{
      position: relative;
      min-width: 300px;

      /* For grow & shrink as per screen size change values as per your requirements */
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

.error_container.invisible {

    -webkit-transform: translateX(-30px);
    transform: translateX(-30px);
    opacity: 0;
    animation-delay: 2s;
}

.input_group.input_valid i.input_error_icon {
    z-index: 1;
}
.input_group i svg {
    opacity: 0;
    -webkit-transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    -ms-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    width: 20px;
    height: 20px;
}
/* h1{ font-size: 24px; text-align: center; text-transform: uppercase;} */
.frmField{background-color:white; color:#495057; line-height: 1.25; font-size: 16px; font-family: 'Roboto', sans-serif; border:0; padding: 10px; border:1px solid #dbdbdb;  border-radius: 3px; width:90%;}
/* .frmLabel{display: block; margin-bottom: 10px; font-weight: bold;} */
.frmValidation{font-size: 13px; }
.frmValidation--passed{color:#717b85;}
.frmIcon{color:#EB0029;}
    .frmValidation--passed .frmIcon{color:#0fa140;}

svg:not(:root) {
    overflow: hidden;
}
svg {
    display: block;
}
</style>
