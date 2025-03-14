//----IMPORTS----


//----Action Types----
const SET_SPOT_DATA = "spot/all"


//----Action Creator----
const getAllSpotsAction = (spots) => {
    console.log(spots)
    return {
        type:SET_SPOT_DATA,
        payload: spots
    }
}
    
    

//----Thunks----

export const getAllSpotsThunk = () => async (dispatch) => {
    try {
        const res = await fetch("/api/spots")

        if(res.ok){
            
            const data = await res.json()
            dispatch(getAllSpotsAction(data))
        }else{
            throw res
        }
        return res
        
    } catch (error) {
        console.log(error)
    }
}

//---- REDUCERS ----

function spotsReducer(state = {}, action){
    let newState = {...state};
    switch(action.type){
        case SET_SPOT_DATA:
            newState= {...state}
            return newState;
        default:
            return newState
    }

}
export default spotsReducer;