<template>
  <h1>Period Sales</h1>
  <div>
    Start:
    <el-date-picker
      v-model="startTime"
      type="datetime"
    />
    End:
    <el-date-picker
      v-model="endTime"
      type="datetime"
    />
  </div>
  <hr>
  <el-button @click="clearReport" type="primary">Clear Report</el-button>
  <el-button type="primary" @click="runReport">Run Report</el-button>
  <hr>
  <div v-if="salesReport">
    <el-text size="large">Start: {{salesReport.report_start}}</el-text><br/>
    <el-text size="large">End: {{salesReport.report_end}}</el-text>
  </div>
  <div v-if="formattedSalesReport && formattedTaxReport">
    <hr>
    <h3>Sales By Sale Type: </h3>
    <el-table
      size="small"
      :data="formattedSalesReport">
      <el-table-column width="220" prop="title" label="Sale Type"/>
      <el-table-column width="100" prop="subtotal" label="Subtotal"/>
      <el-table-column width="100" prop="tax" label="Tax"/>
      <el-table-column width="100" prop="total" label="Total"/>
    </el-table>
    <hr>
    <h3>Taxes By Tax Type: </h3>
    <el-table
      size="small"
      :data="formattedTaxReport">
      <el-table-column width="220" prop="title" label="Tax Type"/>
      <el-table-column width="100" prop="total" label="Total"/>
    </el-table>
  </div>
</template>

<script lang = "js">
  import dayjs from 'dayjs'
  import api from '/src/api/api.js'
  import _ from 'lodash'
  import jsPDF from 'jspdf'
  import autoTable from 'jspdf-autotable'
  import { accountStore } from '/src/stores/account.js'
  import { optionsStore } from '/src/stores/options.js'
  export default {
    name: 'PeriodSales',
    data () {
      return {
        endTime: dayjs().format('YYYY MM DD') + ' 23:59:59',
        reportGeneratedTime: null,
        startTime: dayjs().format('YYYY MM DD'),
        salesReport: null
      }
    },
    computed: {
        account() {
          return accountStore().account;
        },
        endTimeF () {
          return dayjs(this.endTime).format("YYYY-MM-DD HH:mm:ss")
        },
        startTimeF () {
          return dayjs(this.startTime).format("YYYY-MM-DD HH:mm:ss")
        },
        siteName () {
          return optionsStore().autoloadOptions.site_name.option_value
        },
        token() {
            return accountStore().token;
        },
        formattedSalesReport () {
          let fsReport = []
          if(this.salesReport) {
            _.each(this.salesReport.all_included_sale_types, saleTypeId =>{
              let iObj = {
                title: '',
                subtotal: '',
                tax: '',
                total: ''
              }
              let iSaleType = _.find(this.salesReport.all_sale_types, o => {
                return o.id == saleTypeId
              })
              iObj.title = iSaleType.title
              iObj.subtotal = parseFloat(this.salesReport.sale_subtotal_by_sale_type[saleTypeId]).toFixed(2)
              iObj.tax = parseFloat(this.salesReport.sale_tax_total_by_sale_type[saleTypeId]).toFixed(2)
              iObj.total = parseFloat(this.salesReport.sale_total_by_sale_type[saleTypeId]).toFixed(2)
              fsReport.push(iObj)
            })
            return fsReport
          }
        },
        formattedTaxReport () {
          let ftReport = []
          _.each(this.salesReport.all_included_tax_types, taxTypeId => {
            let iObj = {
              title: '',
              total: ''
            }
            let iTaxType = _.find(this.salesReport.all_tax_types, o => {
              return o.id == taxTypeId
            })
            iObj.id = iTaxType.id
            iObj.title = iTaxType.tax_title
            iObj.total = parseFloat(this.salesReport.tax_totals_by_tax_type[taxTypeId]).toFixed(2)
            ftReport.push(iObj)
          })
          return ftReport
        }
    },
    methods: {
      clearReport () {
        this.salesReport = null
        this.reportGeneratedTime = null
        this.startTime = dayjs().format('YYYY MM DD')
        this.endTime = dayjs().format('YYYY MM DD') + ' 23:59:59'
      },
      runReport () {
        this.salesReport = null
        this.reportGeneratedTime = dayjs().format("YYYY-MM-DD HH-mm-ss")
        api.reports.runSalesReport(this.startTimeF, this.endTimeF, this.token).then( response => {
          console.table(response.data.sales_report.all_period_sales)
          this.salesReport = response.data.sales_report
        })
      }
    }
  }
</script>
