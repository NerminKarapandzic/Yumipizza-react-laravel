const initialState = {
  snackbarOpen: false,
  snackbarType: "success",
  snackbarMessage: ""
}

const snackbarReducer = (state = initialState, action) => {
  switch(action.type){
    case 'SET_SNACKBAR':
      const snackbarOpen = action.payload.snackbarOpen
      const snackbarType = action.payload.snackbarType
      const snackbarMessage = action.payload.snackbarMessage
      return {
        ...state,
        snackbarOpen,
        snackbarType,
        snackbarMessage
      }
    case 'CLOSE_SNACKBAR':
      return {
        ...state,
        snackbarOpen: false
      }
    default:
      return initialState;
  }
}

export default snackbarReducer;
