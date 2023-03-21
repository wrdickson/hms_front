<template>
 
  <el-row>
    <el-col :span="12">
      <el-button @click="showCreateSpace = true, selectedSpace = null" type="primary" size="small">{{$t('message.createSpace')}}</el-button>
      <el-divider/>
      <rootSpaceTree
        v-if="rootSpaces"
        :rootSpaces="rootSpaces"
        @node-selected="nodeSelected"
      ></rootSpaceTree>
    </el-col>
    <el-col :span="12">
      <p style="color: #ff0000;">This is for setup only.  If we are actually editing/ adding/ removing in a situation where we had reservations in db, we would need to recalculate all reservations to reflect changes.  Probably move some to an 'unassigned' category.  Complicated.</p>
      <editRootSpace
        v-if="rootSpaces && spaceTypes && selectedSpace"
        :rootSpaces="rootSpaces"
        :spaceTypes="spaceTypes"
        :selectedSpace="selectedSpace"
        @update-space="updateSpace"
        @emit-close="unselectSpace"
        @delete-space="deleteSpace"
      >
      </editRootSpace>
      <createRootSpace
        v-if="rootSpaces && spaceTypes && showCreateSpace"
        :rootSpaces="rootSpaces"
        :spaceTypes="spaceTypes"
        @emit-close="showCreateSpace = false"
        @create-space="createSpace"
      >
      </createRootSpace>
    </el-col>
  </el-row>
</template>

<script>
import { accountStore } from '/src/stores/account.js'
import { rootSpacesStore } from '/src/stores/rootSpaces.js'
import { resViewStore } from '/src/stores/resView.js'
import _ from 'lodash'
import api from '/src/api/api.js'
import RootSpaceTree from '/src/views/SpaceEdit/rootSpaceTree.vue'
import editRootSpace from '/src/views/SpaceEdit/editRootSpace.vue'
import createRootSpace from '/src/views/SpaceEdit/createRootSpace.vue'
import { ElMessage } from 'element-plus'
import { ElLoading } from 'element-plus'

export default {
    name: 'SpaceEdit',
    components: { editRootSpace, RootSpaceTree, createRootSpace },
    data() {
      return {
        selectedSpace: null,
        showCreateSpace: false,
        rootSpaces: null,
        spaceTypes: null,
        isLoading: false
      };
    },
    computed: {
        $i18ErrorNoAction () { return this.$i18n.t('message.errorNoAction') },
        $i18SpaceCreated () { return this.$i18n.t('message.spaceCreated') },
        $i18SpaceDeleted () { return this.$i18n.t('message.spaceDeleted') },
        token() {
            return accountStore().token;
        },
        account() {
            return accountStore().account;
        }
    },
    created() {
    },
    methods: {
        createSpace( obj ) {
            const beds = obj.beds
            const childOf = obj.childOf
            const displayOrder = obj.displayOrder
            const people = obj.people
            const showChildren = obj.showChildren
            const spaceType = obj.spaceType
            const title = obj.title
            const isActive = obj.isActive
            api.rootSpaces.createRootSpace( this.token, beds, childOf, displayOrder, people, showChildren, spaceType, title, isActive ).then( (response) => {
              if(response.data.create > 0){
              const sorted = _.sortBy(response.data.root_spaces_children_parents, 'displayOrder')
              this.rootSpaces = sorted
              //  update store
              rootSpacesStore().setRootSpaces(sorted)
              //  inform user
              ElMessage({
                type: 'success',
                message: this.$i18SpaceCreated
              })
              } else {
                //error
                ElMessage({
                  type: 'error',
                  mesage: this.$i18ErrorNoAction
                })
              }
            })
        },
        deleteSpace ( space ) {
          console.log('d:', space )
          api.rootSpaces.deleteRootSpace ( this.token, space.id ).then( (response) => {
            if(response.data.delete.execute_delete == true){
            const sorted = _.sortBy(response.data.root_spaces_children_parents, 'display_order')
            this.rootSpaces = sorted
            //  tell resview that root spaces have changed
            resViewStore().setShowHideRootSpaceCopy(null)
            //  update the store
            rootSpacesStore().setRootSpaces(sorted)
            ElMessage({
              type: 'success',
              message: this.$i18SpaceDeleted
            })
            } else {
              ElMessage({
                type: 'error',
                message: this.$i18ErrorNoAction
              })
            }
          })
        },
        nodeSelected ( rootSpace ) {
          this.selectedSpace = rootSpace
        },
        unselectSpace () {
          this.selectedSpace = null
        },
        updateSpace ( uSpace ) {
          //  trigger full-screen loading
          const loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
          })
          
          api.rootSpaces.updateRootSpace( this.token, uSpace ).then( (response) => {
            //  close full-screen loading

            loading.close()


            console.table(response.data)
            const sorted = _.sortBy(response.data.root_spaces_children_parents, 'displayOrder')
            this.rootSpaces = sorted
            //update the store
            //nuke the show/hide copy that is used by resview
            resViewStore().setShowHideRootSpaceCopy(null)
            //  reset the store with updated data
            rootSpacesStore().setRootSpaces(sorted)
            ElMessage({
              type: 'success',
              message: 'space updated'
            })
          }).catch( err => {
            loading.close()
            ElMessage({
              type: 'error',
              message: err
            })
          })
           
        }
    },
    mounted () {
      //  load root spaces
      api.rootSpaces.getRootSpaces( this.token ).then( response => {
        this.rootSpaces = response.data.root_spaces_children_parents
      })

      api.spaceTypes.getSpaceTypes().then( (response) => {
        console.log('st response', response)
        this.spaceTypes = response.data.space_types
      })

    }
}
</script>