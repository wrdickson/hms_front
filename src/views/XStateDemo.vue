<template>
  <h1>XStateDemo.vue</h1>
  <a href="mailto:matt@example.com">Matt West</a>
  <section>
    <div>state: {{state.value}}</div>
    <div>{{state.toStrings()}}</div>
    <!--
    <textarea class="tconsole">{{JSON.stringify(state, null, 2)}}</textarea><br/>
    -->
    <button @click="send('TOGGLE')">
      {{
        state.value === 'inactive'
          ? 'Click to activate'
          : 'Active! Click to deactivate'
      }}
    </button>
  </section>
</template>

<script setup>
  import { useMachine } from '@xstate/vue';
  import { createMachine } from 'xstate';

  const toggleMachine = createMachine({
    id: 'toggle',
    initial: 'inactive',
    states: {
      inactive: {
        on: { TOGGLE: 'active' }
      },
      active: {
        on: { TOGGLE: 'inactive' }
      }
    }
  });

  const { state, send } = useMachine(toggleMachine);

</script>

<style scoped>
  .tconsole {
    height: 500px;
    width: 400px;
  }
</style>