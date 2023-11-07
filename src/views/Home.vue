<template>
  <div>Home</div>
  <el-button @click="hello">Hello</el-button>
  <input style="font-size: 1.2em" type="datetime-local" name="date1"/>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
    }
  },
  methods: {
    hello () {
      axios({
        method: 'get',
        url: 'api/foo'
      }).then( response => {
        console.log(response.data)
      })
    }
  }
}
</script>