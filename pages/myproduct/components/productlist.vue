<template lang="html">
  <div>
          <div class="card">
            <div class="card-content">
                  <div class="level-right">
                    <div class="level-item">
                          <div class="control has-icons-left has-icons-right">
                              <input v-model="searchKey" class="input is-small" type="text" placeholder="">
                              <span class="icon is-left">
                                <i class="fa fa-search"></i>
                              </span>
                          </div>

                      <a style="margin-left:5px;" class="button is-small"><i class="fa fa-search"></i></a>
                    </div>
                  </div>
              </div>
            <div v-show="loading" class="column is-centered">
              <span class="icon is-center prod-loading" >
              <i class="fa fa-spinner fa-pulse fa-1x fa-fw is-text"></i>
              </span>
            </div>
              <div class="card-content">
                <div class="container" v-if="noProducts">
                  <p>No Products Exist</p>
                </div>
                <table v-if=" !noProducts && productList.length>0 && !loading"  class="table">
                  <tbody>
                    <tr v-for="item in filteredList">
                      <td style="border:none;">
                        <a :href="'/productpage.html?id='+ item.key + '&tab=preview'"> {{item.product_name}}</a>
                        <span class="product-meta">
                            <p class="product-meta-text">
                              Updated by {{item.updated_by}} on {{formatTime(item.updated_at)}}
                            </p>
                        </span>
                        <span class="product-meta">
                            <p class="product-meta-text">
                              Created by {{item.created_by}} on {{formatTime(item.created_at)}}
                            </p>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <footer class="card-footer" style="border:none;">
                <nav class="pagination is-rounded is-small is-centered" role="navigation" aria-label="pagination" style="margin-top:10px;margin-bottom:10px;margin:auto;">
                    <ul class="pagination-list">
                        <li v-for="pageNum in numPages"><a :href="'?page=' + pageNum + '&limit=' + pageLimit" class="pagination-link" :class="{'is-current' : (pageNum === currPage)}">{{pageNum}}</a></li>
                    </ul>
                </nav>
              </footer>
          </div>

      </div>




    </div>

  </div>
</template>

<script>

import axios from 'axios'

export default {
  components: {

  },
  props:['API_ENDPOINT'],
  data () {
      return {
          searchKey:'',
          productList: [],
          pageLimit: 10,
          numProds: null,
          numPages: null,
          currPage: null,
          loading: true,
          noProducts : false
      }
  },
  created(){
    this.setPageFromParam();
  },
  computed:{
    filteredList: function () {
      return this.productList.filter(data =>
          data.product_name.toLowerCase().search(this.searchKey.toLowerCase()) != -1)
    },
  },

  methods:{
    
    async get_product_list(pageNum, pageLimit){
      var headers = {
        headers:{
          'Authorization': localStorage.getItem('Authorization'),
          }
      }
      axios.get(this.API_ENDPOINT+'user/products?' + 'pageNum=' + pageNum + '&pageLimit=' + pageLimit , headers)
      .then((response) => {
        if(response.data.error) {
          if(response.data.message == "error_18") {
            this.noProducts = true;
          }
        } else {
          this.productList = response.data.prods;
          this.numProds = response.data.num_prods;
          this.setNumPages();
        }
        this.loading = false;
      });
    },

    viewAll(){
        this.searchKey = ''
    },
    formatTime (utc) {
      var date = new Date(utc * 1000)
      // Hours part from the timestamp

      var numDate = date.getDate()
      var month = date.getMonth()
      var year = date.getFullYear()

      var monthList = ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

      var hours = date.getHours()
      var minutes = '0' + date.getMinutes()
      var ampm = hours >= 12 ? 'PM' : 'AM'
      hours = hours % 12
      hours = hours !== 0 ? hours : 12 // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes
      var formattedTime = monthList[month] + ' ' + numDate + ', ' + year + ', ' + hours + ':' + minutes.substr(-2) + ' ' + ampm
      return formattedTime
    },

    setNumPages() {
      if(this.numProds <= this.pageLimit) {
        this.numPages = 1;
      } else
      this.numPages = Math.floor(this.numProds / this.pageLimit);
      if((this.numProds % this.pageLimit) > 0) {
        this.numPages++;
      }
    },

    setPageFromParam() {
      var pageNum = 1;
      var pageLimit = 10;
      var url = window.location.search;
      var urlParams = new URLSearchParams(url);
      if(urlParams.has('page')) {
        pageNum = urlParams.get('page');
        this.currPage = parseInt(pageNum);
      } else {
        this.currPage = 1;
      }
      if(urlParams.has('limit')) {
        pageLimit = urlParams.get('limit');
        this.pageLimit = parseInt(pageLimit);
      }

      this.get_product_list(pageNum, pageLimit);
    }
  }
}
</script>

<style lang="css">
  .prod-loading {
    margin:auto;
    text-align:center;
    display:block;
    width:100%;
  }

  .pagination.is-small {
    font-size: 0.5rem;
  }

  .product-meta {
    display: block;
    font-size: 7pt;
  }

  .product-meta-text {
    display:inline-block;
    font-size:inherit;
  }

</style>
