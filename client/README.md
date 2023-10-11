#how to use Redux

1-create a type in redux/actions/types file
`export const FETCH_SINGLE_POST = "FETCH_SINGLE_POST";`

2-create an action redux-thunk func in redux/actions/postActions.js file

```
export const fetchSinglePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchSinglePost(id);
    console.log("🚀 ~ file: postActions.js:52 ~ fetchSinglePost ~ data:", data);

    dispatch({
      type: types.FETCH_SINGLE_POST,
      payload: data,
    });
  } catch (error) {
    console.log("fetchSinglePost func error.message", error.message);
  }
};
```

3-create a helper fun for fetching process in api/index.js

`` export const fetchSinglePost = async (id) => await axios.get(`${apiEndpoint}${id}`); ``

import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
name: 'counter',
initialState: {
value: 0,
},
reducers: {
increment: (state) => {
// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes
state.value += 1
},
decrement: (state) => {
state.value -= 1
},
incrementByAmount: (state, action) => {
state.value += action.payload
},
},
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount) => (dispatch) => {
setTimeout(() => {
dispatch(incrementByAmount(amount))
}, 1000)
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.counter.value

export default counterSlice.reducer ```

`````

## ADD .env


1.1 Create Root/.env

``#.env file
REACT*APP_SECRET_NAME=secretvaluehere123``
Important notes: it must start with REACT_APP*.

1.2 Access the ENV variable

# App.js file or the file you need to access ENV

````<p>print env secret to HTML</p>
<pre>{process.env.REACT_APP_SECRET_NAME}</pre>````

handleFetchData() { // access in API call
fetch(`https://awesome.api.io?api-key=${process.env.REACT_APP_SECRET_NAME}`)
.then((res) => res.json())
.then((data) => console.log(data))
}

`````
