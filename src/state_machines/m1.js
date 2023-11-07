import { useMachine } from '@xstate/vue';
import { createMachine } from 'xstate';


const toggleMachine = createMachine({
 /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgKwBdcA3MAYgGUBBAGQFEAVATQAU2BxAEoB5AKo8GbdgGEOAbQAMAXUSgADgHtYuKhvyqQAD0QBGACwBOADQgAnogAcJkgFYAvm5toseQqVjoADZgHLZqYPwAThoArmoMYMGYFJCMrJy8bJIy8soGmtq6+khGiC4WCiRmAEwmDmYNDtU1JtZ2js7uniDeOATEJAHBoeEJSSkQaTKCbEwcbAAiiiolBTq4egbGCBYAzA4kFrX1jc21bfYITq4e3fgaEHAGvb7E+VrrmyXbALQAbDZLv8PF4MH0-GR8JQaGB3oUNsVQNsaoDHNUQT0wa9-EEQmEItE4mMwMlIHDPojSghdgB2A4KMx-BzlGlmEy1BQWMyoq7o7ovfo44b44mkiDkopbRA0v4WEgmGl1BpmJotC5ojECiFDMDSSJgdATCUIqUIEycmkkP7NCyylVnVo8pq3NxAA */
 id: retailSale,
 initial: 'inactive',
 states: {
  inactive: {
    on: {
      SALETYPEGROUPSELECT: {
        target: 'saleTypeGroupSelected'
      }
    }
  },
  saleTypeGroupSelected: {
    on: {
      SALETYPESELECT: {
        target: 'saleTypeSelected'
      } 
    }
  },
  saleTypeSelected: {
    on: {
      SALECREATED: {
        target: 'saleCreated'
      }
    }
  },
  saleCreated: {

  }


 }
});