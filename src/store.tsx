import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch, useSelector } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';
import newsReducer  from './reducers/NewsSlice';

export const store = configureStore({
    reducer: {
      news: newsReducer,
    },
  })

  export const useAppDispatch = () => useDispatch<AppDispatch>();
  export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch; 
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);