interface FormState {
    moveInAvailableDate: string,
    propertyType: string,
    price: string,
    description: string,
    imageFiles: {},
    validationError: string,
    address: string,
  }
  
  interface FormAction {
    type: string, 
    field?: string,
    value: string
  }
function formReducer(state: FormState, action: FormAction ) {
    switch(action.type){
      case 'submit':
        return state;
      case 'field':
        return {
          ...state,
          [action.field as string]: action.value
        }
      default: return state;
    }
  }
  
  const initialState = {
    moveInAvailableDate: '',
    propertyType: '',
    price: '',
    description: '',
    imageFiles: {},
    validationError: '',
    address: '',
  }

  export { formReducer, initialState};