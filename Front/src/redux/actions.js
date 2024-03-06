export const getUserData = async (uid) => {
    try{
        const url = `http://localhost:5000/user_details?uid=${uid}`;
        const response = await fetch(url);
        const data = await response.json();
        return async (dispatch) => {
            dispatch({ type: "GET_USER_DATA", payload: data.user });
        };
    }catch(error){
        console.error(error);
    }}
