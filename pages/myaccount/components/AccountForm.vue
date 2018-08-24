<template>
    <div class="container">
        <div class="columns" style="margin-top:10px;margin-bottom:10px;">
        <SideMenu :myAccount="true"></SideMenu>
        <div class="column" style="max-width: 1024px;margin-left:10px;margin-right:10px;">
            <div class="card">
                <div class="card-content">
                    <div v-if="loading" style="text-align:center;padding:20px;">
                        <span class="icon is-center prod-loading" >
                            <i class="fa fa-spinner fa-pulse fa-1x fa-fw is-text"></i>
                        </span>
                    </div>
                    <div v-else>
                        <div class="field ">
                            <div class="control" v-if="editName">
                                <div class="level account-input">
                                    <div class="level-item">
                                        <div  class="control">
                                            <input class="input" type="text" placeholder="Name" v-model="name" :class="{'is-danger' : nameEmpty}" @blur="nameEmpty = (name == '')" @focus="nameEmpty = false" @keyup.enter="saveName()">
                                        </div>
                                    </div>
                                    <div class="level-item">
                                        <a class="button is-small" @click="saveName()">
                                            <i class="fas fa-check"></i>
                                        </a>
                                        <a class="button is-small" @click="revert('name')">
                                            <i class="fas fa-times"></i>
                                        </a>
                                    </div>
                                </div>
                                <p class="help is-danger" v-show="nameEmpty">Name is required</p>
                            </div>
                            <div v-else class="control">
                                <p class="data-saved">{{this.name}}</p>
                                <a class="button is-small edit" @click="editName = true">
                                    <i class="fas fa-edit" v-show="!editName"></i>
                                </a>
                            </div>
                        </div>

                        <div class="field">
                            <div v-if="!editEmail" class="control">
                                <p class="data-saved">{{this.email}}</p>
                                <a class="button is-small edit" @click="editEmail = true">
                                    <i class="fas fa-edit" v-show="!editEmail"></i>
                                </a>
                            </div>
                            <div class="control" v-else-if="editEmail">
                                <div class="level account-input">
                                    <div class="level-item" style="margin-right:5px;">
                                        <div  class="control">
                                            <input v-if="editEmail" class="input account-input" type="text" placeholder="Email" v-model="email" :class="{'is-danger' : !emailValid}" @blur="validateEmail()" @focus="emailValid = true" @keyup.enter="saveEmail()">
                                        </div>
                                    </div>
                                    <div class="level-item">
                                        <a class="button is-small" @click="saveEmail()">
                                            <i class="fas fa-check"></i>
                                        </a>
                                        <a class="button is-small" @click="revert('email')">
                                            <i class="fas fa-times"></i>
                                        </a>
                                    </div>
                                </div>
                                <p class="help is-danger" v-show="!emailValid">Invalid Email.</p>
                            </div>
                        </div>
                        <div class="field">
                            <a v-show="!changePasswd" style="display:block;margin-bottom:10px;" @click="changePasswd = true;">Change Password</a>
                            <div class="control" v-if="changePasswd">
                                <div class="level account-input" >
                                    <div class="level-item">
                                        <input  v-model="currPasswd" class="input account-input passwd-field" type="password" placeholder="Current Password">
                                        <input v-model="newPasswd" class="input account-input passwd-field" type="password" placeholder="New Password" :class="{'is-danger' : !passwdMatch || !strongPasswd}" @focus="{passwdMatch = true; strongPasswd = true}" @blur="checkStrongPasswd()">
                                        <input v-model="newPasswd2" class="input account-input passwd-field" type="password" placeholder="Confirm New Password" @blur="{passwdMatch = (newPasswd == newPasswd2) }" :class="{'is-danger' : !passwdMatch}" @focus="{passwdMatch = true}" @keyup.enter="savePasswd()">
                                        <a class="button is-small" @click="savePasswd()">
                                            <i class="fas fa-check"></i>
                                        </a>
                                        <a class="button is-small" @click="revert('passwd')">
                                            <i class="fas fa-times"></i>
                                        </a>
                                    </div>
                                    <div class="level-item">
                                        <article class="message is-small">
                                            <div class="message-body">
                                                <ul>
                                                    <li>Min. 8 characters &amp; max. 25 characters</li>
                                                    <li>Atleast 1 lowercase, uppercase, numeric &amp; special character</li>
                                                </ul>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                                <p class="help is-danger" v-show="!passwdMatch">Passwords do not match.</p>
                                <p class="help is-danger" v-show="!strongPasswd">New password does not meet the requirements.</p>
                                <p class="help is-danger" v-show="passwdEmpty">Password field(s) cannot be empty.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>

import SideMenu from 'components/SideMenu.vue'
import axios from 'axios'
import {mailRegEx, passwdRegEx, API_ENDPOINT} from 'components/consts'

export default {
    components : {
        'SideMenu' : SideMenu
    },

    data() {
        return {
            userId: '',
            name : '',
            email : '',
            loading: true,
            editName: false,
            editEmail: false,
            changePasswd: false,
            currPasswd : '',
            newPasswd: '',
            newPasswd2: '',
            passwdMatch: true,
            nameLoading: false,
            emailLoading: false,
            passwordLoading: false,
            emailValid: true,
            prevEmail: '',
            prevName: '',
            strongPasswd: true,
            nameEmpty: false,
            passwdEmpty: false
        }
    },

    created() {
        this.getData();
    },

    methods: {

        validateEmail() {
            this.emailValid = mailRegEx.test(this.email);
        },

        revert(field) {
            if(field == 'name') {
                this.editName = false;
                this.name = this.prevName;
                this.nameEmpty = false;


            } else if(field == 'email') {
                this.editEmail = false;
                this.email = this.prevEmail;
                this.emailValid = true;
            } else if(field == 'passwd') {
                this.newPasswd = '';
                this.newPasswd2 = '';
                this.currPasswd = '';
                this.passwdMatch = true;
                this.strongPasswd = true;
                this.changePasswd = false;
                this.passwdEmpty = false;
            }
        },

        checkStrongPasswd() {
            if(this.newPasswd) {
                this.strongPasswd = passwdRegEx.test(this.newPasswd);
            }
        },

        async saveName() {
            if(!this.name) {
                return;
            }
            this.nameLoading = true;
            var data = {
                userId:this.userId,
                name:this.name,
            }

            let headers = {
                headers: {
                'Authorization': localStorage.getItem("Authorization"),
                }
            }
            axios.post(this.getAPIEndPoint() + 'user/' + this.userId, data, headers)
            .then((response) => {
                console.log('saved');
            });
            this.prevName = this.name;
            this.editName = false;
            this.nameLoading = false;
        },

        async saveEmail() {
            if(!this.email || !this.emailValid) {
                return;
            }

            this.emailLoading = true;

            var data = {
                userId:this.userId,
                email:this.email,
            }

            let headers = {
                headers: {
                'Authorization': localStorage.getItem("Authorization"),
                }
            }
            axios.post(this.getAPIEndPoint() + 'user/' + this.userId, data, headers)
            .then((response) => {
                console.log('saved');
            });
            this.prevEmail = this.email;
            this.emailLoading = false;
            this.editEmail = false;
            // this.getData();
        },

        async savePasswd() {
            if(!this.currPasswd || !this.newPasswd || !this.newPasswd2) {
                this.passwdEmpty = true;
                return;
            }

            this.passwordLoading = true;
            let headers = {
                headers: {
                'Authorization': localStorage.getItem("Authorization"),
                }
            }
            var data = {
                userId:this.userId,
                email: this.email,
                currPasswd:this.currPasswd,
                newPasswd: this.newPasswd,
                newPasswd2: this.newPasswd2
            }
            axios.post(this.getAPIEndPoint() + 'user/' + this.userId, data, headers)
            .then((response) => {
                console.log(response);
            });
            this.passwordLoading = false;
            this.revert('passwd');
        },

        async getData() {
            this.userId = localStorage.getItem("uid");
            let headers = {
                headers: {
                'Authorization': localStorage.getItem("Authorization"),
                }
            }

            axios.get(this.getAPIEndPoint() + 'user/' + this.userId, headers)
            .then((response) => {
                this.name = response.data.name;
                this.prevName = response.data.name;
                this.email = response.data.email;
                this.prevEmail = response.data.email;
                this.loading = false;
            });
        },

        getAPIEndPoint(){
            if (window.location.hostname == "127.0.0.1" || window.location.hostname == "localhost" ) {
            //   return "http://blockterms.local:8000/api/v1.0/"
               return "http://192.168.99.100:2222/api/v1.0/"
            }
            return API_ENDPOINT
        },
    }
}

</script>

<style>

    .button.is-small, .level-item {
        margin-right: 5px;
    }

    .data-saved {
        display: inline;
    }

    .account-input, .passwd-field, .level.account-input > .level-item  {
        width: 250px;
    }

    .account-input.passwd-field {
        display: block;
        margin-bottom: 10px;
    }

    .button.is-small.edit {
        border: none;
    }
    .level.account-input {
        margin-bottom: 0;
    }
    .level.account-input > .level-item {
        display: block;
    }
</style>
