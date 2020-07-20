const initialstate = {
  currency: 'Euro',
  modifier: 1,
  symbol: '€'
}
const dollar = 1.14;

const currency = (state = initialstate, action) => {
  switch(action.type){
    case 'CHANGE_CURRENCY':
      if(action.currency == 'dollar'){
        return {
          currency: 'Dollar',
          modifier: dollar,
          symbol: '$'
        }
      }else{
        return initialstate
      }
    default:
      return state;
  }
}

export default currency;
