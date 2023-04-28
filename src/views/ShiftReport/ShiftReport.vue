<template>
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
  <hr/>
  <div v-if="shiftReport">
    <div>Account:  {{shiftReport.account.username}}</div>
    <div>Start Time: {{shiftReport.report_start}}</div>
    <div>EndTime: {{shiftReport.report_end}}</div>
    <div v-for="report in shiftReport.report_by_payment_type">
      <hr/>
      <div>Payment Type: {{report.payment_type_title}}</div>
      <div>Total: {{report.total.toFixed(2)}}</div>
      <el-collapse>
        <el-collapse-item title="Detail">
          <el-table
            size="small"
            :data="report.payments">
            <el-table-column prop="datetime_posted" width="150" label="Posted Datetime"/>
            <el-table-column prop="payment_title" width="100" label="Type"/>
            <el-table-column prop="total" width="120" label="Total"/>
            <el-table-column prop="last_name" width="150" label="Last Name"/>
            <el-table-column prop="first_name" width="150" label="First Name"/>
            <el-table-column prop="folio" width="120" label="Folio"/>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </div>
    <el-button type="primary" @click="generatePdf">Generate Pdf</el-button>
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
  import { rateProps } from 'element-plus'
  export default {
    name: 'ShiftReport',
    data () {
      return {
        endTime: dayjs().format('YYYY MM DD') + ' 23:59:59',
        reportGeneratedTime: null,
        startTime: dayjs().format('YYYY MM DD'),
        shiftReport: null
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
        this.shiftReport = null
        this.reportGeneratedTime = null
        this.startTime = dayjs().format('YYYY MM DD')
        this.endTime = dayjs().format('YYYY MM DD') + ' 23:59:59'
      },
      generatePdf () {
        const doc = new jsPDF()
        doc.setFontSize(12);
        let yPos = 20
        doc.text(this.siteName + " Shift Report - Detail", 20, yPos)
        yPos += 5
        doc.setFontSize(10)
        doc.text("Account: " + this.account.username, 20, yPos)
        yPos += 5
        doc.text("Filter Start: " + this.startTimeF, 20, yPos )
        yPos += 5
        doc.text("Filter End: " + this.endTimeF, 20, yPos )
        yPos += 5
        doc.text("Generated: " + this.reportGeneratedTime, 20, yPos )
        yPos += 5
        doc.line(20, yPos, 180, yPos)
        yPos += 5
        this.shiftReport.report_by_payment_type.forEach( pymtTypeReport => {
          doc.setFontSize(11)
          doc.text( pymtTypeReport.payment_type_title, 20, yPos )
          doc.setFontSize(10)
          yPos += 4
          doc.text( "Total: " + pymtTypeReport.total, 20, yPos )
          yPos += 2
          let tBody = []
          pymtTypeReport.payments.forEach( payment => {
            let tRow = [ payment.datetime_posted, payment.payment_title, payment.total, payment.folio, payment.last_name, payment.first_name ]
            tBody.push(tRow)
          })
          autoTable( doc, {
            head: [['Posted', 'Type', 'Amount', 'Folio', 'Last Name', 'First Name']],
            body: tBody,
            theme: 'striped',
            cellWidth: 50,
            tableWidth: 120,
            margin: { left:21, top: 0, bottom: 0 },
            styles: { cellPadding: 1, fontSize: 8 },
            headStyles: {
              fillColor: [80, 80, 80],
              fontSize: 8,
            },
            startY: yPos,
            startX: 30
          })
          yPos = doc.lastAutoTable.finalY + 1
          doc.line(20, yPos, 180, yPos)
          yPos += 5
        })
        doc.text("**** Report End ****", 70, yPos )
        doc.save('Shift Report ' + this.reportGeneratedTime)
      },
      runReport () {
        this.shiftReport = null
        this.reportGeneratedTime = dayjs().format("YYYY-MM-DD HH-mm-ss")
        api.reports.runShiftReport(this.startTimeF, this.endTimeF, this.token).then( response => {
          this.shiftReport = response.data.shift_report
        })
      }
    }
  }
  </script>