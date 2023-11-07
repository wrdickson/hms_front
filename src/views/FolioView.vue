<template>
  <h1>Folio View</h1>
  <p>{{message}}</p>
  <div>Folio id from route: {{ folioId }}</div>
  <div>foo: {{foo}}</div>
  <div>person: {{ person.firstName }} {{ person.lastName }}</div>
  <div>number of likes: {{ numberOfLikes }}</div>
  <ul>
    <li v-for="like in person.likes">{{like}}</li>
  </ul>
  <input v-model="iLike"/><br>
  <button @click="addLike">add like</button><br>
  <button @click="removeLike">remove like</button>
  <hr>
  <button @click="routerBack">router back</button>
</template>

<script setup>
  import { useRouter, useRoute } from 'vue-router'
  //  use ref for primative data types
  import { ref, watch } from 'vue'
  //  use reactive for arrays and objects
  import { reactive } from 'vue'
  import { computed } from 'vue'
  import { onMounted } from 'vue'
  import  api from '/src/api/api.js'

  //  setup runs every time the component instantializes:
  console.log('setup executes')

  //  a non reactive variable:
  const message = 'hello composition api!'

  //  define reactive primitives
  const foo = ref('bar')
  const iLike = ref('')

  //  define reactive objects & arrays
  const person = reactive({
    firstName: 'Joe',
    lastName: 'Schmoe',
    likes: 
    [
      'chocolate',
      'raspberries',
    ]
  })

  //  a 'method' in options api terms:
  const addLike = () => {
    console.log('addLike()', iLike.value)
    person.likes.push(iLike.value)
    iLike.value = ''
  }

  //  a 'method' in options api terms:
  const removeLike = () => {
    person.likes.pop()
  }

  //  a computed value:
  const numberOfLikes = computed( () => {
    return person.likes.length
  })

  const router = useRouter()
  const route = reactive(useRoute())

  const folioId = ref(route.params.id)


  const loadFolio = () => {
    api.folios.getFolio2(folioId.value).then( (result) => {
      console.log('result', result.data)
    })
  }

  const routerBack = () => {
    router.go(-1)
  }

  //  do something with onMounted
  onMounted( () => {
    console.log('component onMounted() fires')
    loadFolio()

  })

  // watch for a change on folioId
  watch(folioId, (newVal) => {
    console.log('folioId watch triggers')
  })


  

</script>