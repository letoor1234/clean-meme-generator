import CONNECTION from '../const/connection.js'

const initialState = {
  memes: []
}

function rootReducer(state=initialState, action){
  if(action.type === CONNECTION){
    return Object.assign({}, state, {
      memes: state.memes.concat(action.payload)
    })
  }
  return state
}

export default rootReducer
