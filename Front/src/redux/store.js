import { configureStore } from '@reduxjs/toolkit';
import myReducer from './myReducer';

const reducer = {
  // Agrega tus reducers aquí
  myReducer: myReducer,
};

const store = configureStore({
  reducer,
  // Puedes agregar más configuraciones aquí, como middleware, devtools, etc.
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myMiddleware),
    // devTools: process.env.NODE_ENV !== 'production',
    devTools: true,
});

export default store;
