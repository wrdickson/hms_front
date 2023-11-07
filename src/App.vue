<template>
  <!-- IMPORTANT!!!!
    DO NOT LOAD UNTIL WE HAVE A TOKEN !!!!!
    Token is null when pinia instantiates, will be set to 0 when account (user) is set
    after checking if we have a user/token in localStorage, and verifying that.
    It's an async operation, so we have to wait . . . 
  -->
  <div v-if="debugInit">
    <h4>Console:</h4>
    <div>token:{{token}}</div>
    <div>account:{{JSON.stringify(account)}}</div>
    <div>dataLoaded:{{dataLoaded}}</div>
    <div>rootSpaces:{{rootSpaces}}</div>
    <div>saleTypes:{{saleTypes}}</div>
    <div>saleTypeGroups:{{saleTypeGroups}}</div>
    <div>spaceTypes:{{spaceTypes}}</div>
    <div>taxTypes:{{taxTypes}}</div>
    <div>allPaymentTypes:{{allPaymentTypes}}</div>


    <div>authCompleted:{{authCompleted}}</div>
  </div>
  <div v-if="dataLoaded" >
    <el-drawer
      v-model="drawerVisible"
      size="180px"
      direction="ltr"
      :with-header="false"
      :show-close="false"
      >
      <MainMenu @mainMenu-select="hideDrawer"/>
    </el-drawer>
    <el-container>
      <el-aside width="180px" class="hidden-md-and-down navAside" style="overflow: visible !important;">
        <MainMenu/>
      </el-aside>
      <el-container>
        <el-header class="navHeader" height="40px">
            <el-menu
              mode="horizontal"
              :ellipsis="true"
            >
              <span class="hidden-lg-and-up"><el-button type="primary" link @click="drawerVisible = true"><font-awesome-icon icon="fa-solid fa-bars" size="2x" /></el-button></span>
              <el-menu-item class="navbarBrand" index="1" style="border-bottom: 0px;">{{siteName}}</el-menu-item>
              <div class="flex-grow"/>
              <userMenu :account="account"/>
              <localeSwitch/>
            </el-menu>
        </el-header>
        <el-main style="margin-top: 0px !important;">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { optionsStore } from './stores/options.js'
import { accountStore } from './stores/account.js'
import { saleTypesStore } from './stores/saleTypes.js'
import { saleTypeGroupsStore } from './stores/saleTypeGroups.js'
import { taxTypesStore } from './stores/taxTypes.js'
import { rootSpacesStore } from './stores/rootSpaces.js'
import { paymentTypesStore } from './stores/paymentTypes.js'
import { spaceTypesStore } from './stores/spaceTypes.js'
import { localeStore } from './stores/locale.js'
import api from './api/api.js'
import MainMenu from './components/mainMenu.vue'
import userMenu from './components/userMenu.vue'
import localeSwitch from './components/localeSwitch.vue'
import _ from 'lodash'
export default {
  components: {
    MainMenu, userMenu, localeSwitch
  },
  data () {
    return {

      debugInit: false,

      drawerVisible: false,
      //  we don't want the app to start until we have completed
      //  the auth process, the v-if in the wrapper div above
      //  will accomplish this
      authCompleted: 0,
      rootSpaces: null,
      saleTypes: null,
      saleTypeGroups: null,
      spaceTypes: null,
      taxTypes: null,
      allPaymentTypes: null,
      autoloadOptions: null
    }
  },
  computed: {
    account() {
      return accountStore().account
    },
    dataLoaded() {
      if( this.authCompleted && this.rootSpaces && this.saleTypes && this.saleTypeGroups && this.spaceTypes && this.taxTypes && this.allPaymentTypes && this.autoloadOptions ) {
        return true
      } else {
        return false
      }
    },
    siteName () {
      return optionsStore().autoloadOptions.site_name.option_value
    },
    token() {
      return accountStore().token
    }
  },
  methods: {
    hideDrawer () {
      this.drawerVisible = false
    },
    loadInitialData () {
      //  options
      
      api.options.getAutoloadOptions().then( response => {
        optionsStore().setAutoloadOptions(response.data)
        //set i18n to options default
        localeStore().setComponentLocale(optionsStore().autoloadOptions.default_locale.option_value)
        this.$i18n.locale = optionsStore().autoloadOptions.default_locale.option_value
        this.autoloadOptions = 1
      })
      
      //  rootSpaces
      api.rootSpaces.getRootSpaces( this.token ).then( response => {
          rootSpacesStore().setRootSpaces( response.data.root_spaces_children_parents )
          this.rootSpaces = 1
      })

      //  saleTypes
      api.saleTypes.getSaleTypes( this.token ).then( response => {
        //  set the store
        saleTypesStore().setSaleTypes(response.data.all_sale_types)
        this.saleTypes = 1
      })

      //  sale type groups
      api.saleTypeGroups.getSaleTypeGroups( this.token ).then( response => {
        saleTypeGroupsStore().setSaleTypeGroups( response.data.all_sale_type_groups )
        this.saleTypeGroups = 1
      })

      //  space types
      api.spaceTypes.getSpaceTypes().then ( response => {
        spaceTypesStore().setSpaceTypes( response.data.space_types )
        this.spaceTypes = 1
      })

      // tax types
      api.taxTypes.getTaxTypes( this.token ).then( response => {
        //  set the store
        taxTypesStore().setTaxTypes(response.data.all_tax_types)
        this.taxTypes = 1
      })

      // payment types
      api.paymentTypes.getAllPaymentTypes( this.token ).then ( response => {
        paymentTypesStore().setActivePaymentTypes( response.data.active_payment_types )
        paymentTypesStore().setAllPaymentTypes( response.data.all_payment_types )
        this.allPaymentTypes = 1
      })
    },
    showDrawer () {
      this.drawerVisible = true
    }
  },
  mounted() {
    //  check for a user in localstorage
    const account = JSON.parse(localStorage.getItem('account'))
    const token = localStorage.getItem('token')
    
    if (account && token ) {
      console.log('account:', account)
      console.log('token:', token)
      api.account.authorizeToken( token ).then( (response) => {
        if(response.data.decoded.account){
          accountStore().setAccount( response.data.decoded.account )
          accountStore().setToken( token )
          this.authCompleted = true
          this.loadInitialData()
        }
      }).catch( err => {
        accountStore().setAccountToGuest()
        this.authCompleted = true
        this.loadInitialData()
        this.$router.push('/Login')
      })
    } else {
      console.log('else')
      console.log('account:', account)
      console.log('token:', token)
      accountStore().setAccountToGuest()
      this.authCompleted = true
      this.loadInitialData()
      this.$router.push('/Login')
    }
  }
}
</script>

<style>
  body{
    font-family: Tahoma, Verdana, sans-serif;
  }
  
  .flex-grow {
    flex-grow: 1;
  }
  .navbarBrand {
    font-size: 20px;
  }
  .el-main {
    padding-top: 0px !important;
  }
</style>
