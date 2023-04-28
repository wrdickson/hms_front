<template>
  Period Sales
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
  <el-button @click="clearReport" type="primary">Clear Report</el-button>
  <el-button type="primary" @click="runReport">Run Report</el-button>
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
