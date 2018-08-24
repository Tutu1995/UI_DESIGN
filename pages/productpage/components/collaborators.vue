
<template lang="html">
<div>
  <div v-if="loadingData" class="level">
    <div class="level-item centered" style="top:200px;max-width: 1000px;height:300px;">
      <i style="top:300px;" class="fa fa-spinner fa-pulse fa-1x fa-fw is-text"></i>
    </div>
  </div>
  <div v-else class="">
    <div class="card">
      <div class="card-content">
        <label class="label">Invite New Collaborator</label>

        <div class="">
          <div class="level" style="margin-bottom:0px;">
            <div class="level-item">
              <input class="input is-small" :class="{'is-danger' : !emailValid}" type="text"
                v-model="currentEmail" placeholder="Email" @blur="validateEmail()"/>
              <div style="margin-left:10px;margin-right:10px;" class="select is-small">
                <select v-model="currentPermission" >
                  <option v-for="option in permissionLevels" :value="option">{{option}}</option>
                </select>
              </div>
              <button v-show="!submittingNew"  @click="add_new_collaborator()"
                class="button is-small" type="button" name="button"><i class="fas fa-plus"></i></button>
                <span v-show="submittingNew" class="" style="width:40px;text-align:center">
                    <i class="fa fa-spinner fa-pulse fa-1x fa-fw is-text is-small"></i>
                </span>
            </div>
          </div>
          <p class="help is-danger" v-show="!emailValid">Invalid Email</p>
        </div>

        <div v-if="serverErrorMessage" class="columns" style="margin-top:1.5rem;">
          <div class="column">
            <article class="message is-success" :class="{'is-danger':serverErrorMessage}">
              <div class="message-body">
                {{serverErrorMessage}}
              </div>
            </article>
          </div>
        </div>


        </div>
    </div>

    <div class="card">
      <div class="card-content" style="overflow-x:auto;">
        <table class="table table-no-border">
          <tr v-for="(item, index) in data">
            <td>{{item.name}}</td>
            <td>{{item.email}}</td>
            <td>
              <div v-if="editingWhich.edit[index]" class="select is-small" :class="{'is-loading':editingWhich.submit[index]}">
                <select v-model="editingTempData[index]" >
                  <option v-for="option in permissionLevels" :value="option">{{option}}</option>
                </select>
              </div>
              <p v-else>{{item.permission}}</p>
            </td>
            <td>
              <div v-show="editingWhich.edit[index] && !editingWhich.submit[index]" class="level" style="margin-bottom:0;">
                <div class="level-item">
                  <button style="margin-right:10px;" class="button is-small" @click="edit_complete_submit(index)"><i class="fas fa-check"></i></button>
                  <button style="margin-right:10px;" class="button is-small" @click="edit_cancel(index)"><i class="fas fa-times"></i></button>
                  <button class="button is-small" @click="remove_user(index)">
                      <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
              <div v-show="!editingWhich.edit[index] && item.permission!='Creator'" class="">
                <button class="button is-text is-small" @click="edit_user(index)">
                    <i class="fas fa-edit"></i></button>
              </div>

            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>

</div>
</template>

<script>

import axios from 'axios'
import {mailRegEx} from 'components/consts'

export default {
  props:['API_ENDPOINT','productID'],
  data () {
    return {
      // eslint-disable-next-line
      permissionLevels: ['View only', 'Can edit', 'Admin'],
      data: null,
      editingWhich: {
        edit: [],
        submit: [],
      },
      editingTempData:[],
      loadingData: true,
      currentEmail: null,
      currentPermission:'Can edit',
      emailValid: true,
      submittingNew: false,
      serverErrorMessage: null,

    }
  },

  mounted () {
    this.initialize_data()
  },
  methods: {
    initialize_data(add_new=false){
      var urlParams = new URLSearchParams(window.location.search)
      let headers = {
                headers: {
                'Authorization': localStorage.getItem("Authorization"),
                }
            }
      axios.get(this.API_ENDPOINT+'product/'+this.productID+'/collaborator', headers)
      .then((response) => {
        this.data = this.sort(response.data)
        this.editingWhich.edit = new Array(this.data.length).fill(false)
        this.editingWhich.submit = new Array(this.data.length).fill(false)
        this.loadingData = false;

        if (add_new){
          this.clear_add_new()
        }


      }).catch(error => {
        console.log(error.response)
      })
    },
    remove_user(index){
      this.$set(this.editingWhich.submit, index, true)
      var headers = {
        headers:{
          'Authorization': localStorage.getItem('Authorization'),
          }
      }
      axios.delete(this.API_ENDPOINT+'product/'+this.productID+'/collaborator/'+
                   this.data[index]['id'], headers)
      .then((response) => {
        if (!response.data.error){
          this.edit_cancel(index)
          this.data.splice(index, 1)
        }
        this.$set(this.editingWhich.submit, index, false)
      }).catch(error => {
        console.log(error.response)
      })
    },
    edit_user(index){
      this.$set(this.editingWhich.edit, index, true)
      this.editingTempData[index] = this.data[index]['permission']
    },
    edit_cancel(index){
      this.$set(this.editingWhich.edit, index, false)
    },
    sort(data){
      return data.sort((a, b) => a.permission > b.permission );
    },
    edit_complete_submit(index){
      if (this.editingTempData[index] == this.data[index].permission){
        this.edit_cancel(index)
      }
      else{
        this.$set(this.editingWhich.submit, index, true)
        var headers = {
          headers:{
            'Authorization': localStorage.getItem('Authorization'),
            }
        }
        var data = {
          collaboratorID: this.data[index]['id'],
          permission: this.editingTempData[index]
        }
        axios.post(this.API_ENDPOINT+'product/'+this.productID+'/collaborator/'+data.collaboratorID, data , headers)
        .then(response => {
          if (!response.data.error){
            this.edit_cancel(index)
            this.data[index]['permission'] = data.permission
          }
          else {

          }
          this.$set(this.editingWhich.submit, index, false)
        }).catch(error => {
          console.log(error.response)
        })
      }
    },
    validateEmail() {
      this.emailValid = mailRegEx.test(this.currentEmail);
    },
    add_new_collaborator(){
      this.serverErrorMessage = null
      if (this.currentEmail && this.emailValid){
        this.submittingNew = true
        var headers = {
          headers:{
            'Authorization': localStorage.getItem('Authorization'),
            }
        }
        var data = {
          email: this.currentEmail,
          permission: this.currentPermission
        }
        axios.post(this.API_ENDPOINT+'product/'+this.productID+'/collaborator', data, headers)
        .then(response => {
          if (!response.data.error){
            this.initialize_data(true)
          }
          else{
            this.serverErrorMessage = response.data.message;
            this.clear_add_new()
          }
        }).catch(error => {
          console.log(error)
        })
      }
      else{
        this.emailValid = false
      }
    },
    clear_add_new(){
      this.submittingNew = false
      this.currentEmail = null
    }
  },
}
</script>

<style media="screen">
  .table-no-border td,th{
    border: none;
  }
</style>
