import axios from 'axios'

const rootSpaces = {

  createRootSpace: ( token, beds, childOf, displayOrder, people, showChildren, spaceType, title, isActive ) => {
    const promise = axios({
      method: 'post',
      headers: {
        'Jwt': token
      },
      data: {
        beds: beds,
        childOf: childOf,
        displayOrder: displayOrder,
        people: people,
        showChildren: showChildren,
        spaceType: spaceType,
        title: title,
        isActive: isActive
      },
      url: 'api/root-spaces-create'
    })
    return promise
  },

  deleteRootSpace: ( token, rootSpaceId ) => {
    const promise = axios({
      method: 'post',
      headers: {
        Jwt: token
      },
      data: {
        root_space_id: rootSpaceId
      },
      url: 'api/root-spaces-delete'
    })
    return promise
  },

  getRootSpaces: ( token ) => {
    const promise = axios({
      method: 'post',
      headers: {
        'Jwt': token
      },
      url: 'api/root-spaces'
    })
    return promise
  },

  updateRootSpace( token, updateSpace ) {
    //  childOf and showChildren are strings, convert to int
    updateSpace.isActive = parseInt(updateSpace.isActive)
    updateSpace.showChildren = parseInt(updateSpace.showChildren)
    const promise = axios({
      method: 'post',
      headers: {
        'Jwt': token
      },
      dataType: 'json',
      data: {
        updateSpace
      },
      url: 'api/root-spaces/update/' + updateSpace.id
    })
    return promise
  }
}

export default rootSpaces