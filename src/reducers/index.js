
import { INCREMENT, DECREMENT } from '../actions/index';
export default (state = {count: 0}, action) => {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                count: state.count + action.val
            };
        case DECREMENT:
            return {
                ...state,
                count: state.count - action.val
            };
        default:
            return state;
    }
}