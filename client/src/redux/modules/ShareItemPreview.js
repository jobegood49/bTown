const RESET_IMAGE = 'RESET_IMAGE'
const UPDATE_NEW_ITEM = 'UPDATE_NEW_ITEM'
const RESET_NEW_ITEM = 'RESET_NEW_ITEM'

export const resetImage = () => ({
  type: RESET_IMAGE
})
export const updateNewItem = item => ({
  type: UPDATE_NEW_ITEM,
  payload: item
})
export const resetNewItem = () => ({
  type: RESET_NEW_ITEM
})

const initialState = {
  title: 'Name your item',
  description: 'Describe your item',
  tags: [],
  imageurl:
    'https://dummyimage.com/350x250/c4c4c4/212121&text=Please+select+an+image',
  created: new Date(),
  itemowner: {
    fullname:'toto',
    email:'toto'
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_IMAGE: {
      return { ...state, imageurl: initialState.imageurl }
    }
    case UPDATE_NEW_ITEM: {
      return {
        ...state,
        ...action.payload
      }
    }
    case RESET_NEW_ITEM: {
      return {
          //How come this one doesn't need states???
        // ...state,
        ...initialState
      }
    }
    default:
      return state
  }
}