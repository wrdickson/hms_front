<template>
  FolioSaleDisplay1
  <div v-if="folioDataLoaded" class="folio-display-wrapper">
    <el-table
      header-cell-class-name="fsd-1"
      :data="computedFolioData"
      max-height="1050"
      style="width: 100%"
      row-class-name="c-row"
      :default-expand-all="true"
    >
      <el-table-column type="expand">
        <template #default="props">
          <div style="margin-left: 50px">
            <el-table 
              size="small"
              :border=true
              cell-class-name="fsc-cell"
              width="100%"
              :data="props.row.saleItems">
              <el-table-column label="Title" width="150" prop="title" />
              <el-table-column label="Description" width="150" prop="description"
                show-overflow-tooltip: true
              />
              <el-table-column label="Qty" width="60" prop="sale_quantity" />
              <el-table-column label="Price" width="80" prop="sale_price" />
              <el-table-column label="Subtotal" width="80" prop="sale_subtotal" />
              <el-table-column label="Tax" width="80" prop="sale_tax"/>
              <el-table-column label="Total" width="120" prop="sale_total"/>
            </el-table>
          
          </div>
        </template>
      </el-table-column>


      
      <el-table-column prop="date" label="Date"></el-table-column>
      <el-table-column prop="postedBy" label="Posted By"></el-table-column>
      <el-table-column prop="paymentType" label="Payment Type"></el-table-column>
      <el-table-column prop="paymentTotal" label="Amt Paid" width="120"></el-table-column>

    </el-table>
  </div>
</template>

<script lang = "js">
  import api from '/src/api/api.js'
  import _ from 'lodash'
  import { accountStore } from '/src/stores/account.js'
  export default {
    name: 'FolioSaleDisplay1',
    props: [ 'folioId', 'folioViewerReloadKey'],
    data () {
      return {
        folioDataLoaded: false,
        folioDetailData: []
      }
    },
    computed: {
      computedFolioData () {
        //  create an array that contains one and only one id for each payment
        let uniqArr = []
        _.each(this.folioDetailData,  payment => {
          if(!_.includes(uniqArr, payment.id)){
            uniqArr.push( payment.id )
          }
        })
        let summary = []
        _.each( uniqArr, paymentId => {
          let obj = _.find( this.folioDetailData, o => {
            return paymentId == o.id
          })
          
          summary.push({
            id: obj.id,
            paymentTotal: obj.payment_total,
            date: obj.posted_date,
            postedBy: obj.posted_by,
            paymentType: obj.payment_type,
            saleItems: _.filter(this.folioDetailData, o => {
              return paymentId == o.id
            })
          })
        })
        return summary
        
      },
      token () {
        return accountStore().token
      }
    },
    methods: {
      getFolio1 () {
        api.folios.getFolio1( this.token, this.folioId ).then( response => {
        console.table(response.data.folio_to_array.sale_detail)
        this.folioDetailData = response.data.folio_to_array.sale_detail
        // set as a non reactive property
        this.folioData = response.data.folio_to_array
        this.folioDataLoaded = true
      })
      }
    },
    created () {
      this.getFolio1()
    },
    watch: {
      folioViewerReloadKey ( newVal ) {
        this.folioData = []
        this.folioDataLoaded = false
        this.getFolio1()
      }
    }

  }
</script>

<style>
  .fsd-1 {
  }

  .fsc-cell {
    overflow-x: hidden;
    overflow-y: hidden;
    background-color: rgb(54, 54, 6);
  }
</style>