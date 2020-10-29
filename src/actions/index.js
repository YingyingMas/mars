
export const DECREMENT = 'DECREMENT';
function decrementActionCreator(val) {
    return {
        type: DECREMENT,
        val
    }
}
export const decrementAction = decrementActionCreator(2);


export const INCREMENT = 'INCREMENT';
function incrementActionCreator(val) {
    return {
        type: INCREMENT,
        val
    }
}
export const incrementAction = incrementActionCreator(2);