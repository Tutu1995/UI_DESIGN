<template>
<section class="hero is-success is-fullheight">
    <div class="hero-body">
        <div class="container has-text-centered">
            <div class="column is-4 is-offset-4">
                <h3 class="title has-text-grey"><b>blockterms</b></h3>
                <p class="subtitle has-text-grey">We always have time for you</p>
                <div class="box">
                    <figure class="avatar">
                        <img src="assets/img/btlogo.png">
                    </figure>

                    <div class="support">
                      <ul>
                        <li>
                          <p class="help"><b>Email Support</b></p>
                        </li>
                        <li>
                          <a href="mailto:support@blockterms.com">support@blockterms.com</a>
                        </li>
                      </ul>
                    </div>



                </div>
                <p class="has-text-grey">
                    <a href="login.html">Login</a> &nbsp;·&nbsp;
                    <a href="signup.html">Sign Up</a>
                </p>
            </div>
        </div>
    </div>
</section>
</template>

<script>

import i18n from 'assets/lang/lang.js'

export default {

  mounted() {

  },
  watch:{
  },
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {
      switchLang (lang) {
        i18n.locale = lang
      },

  },



}

</script>

<style lang="css">

@media only screen and (min-width: 769px) {
    .column{
      position: relative;
      min-width: 300px;
      // For grow & shrink as per screen size change values as per your requirements
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
