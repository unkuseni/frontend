import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { checkTokenValidity } from '../store/slices/authSlice';


export const useTokenValidity = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, loading, error, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(checkTokenValidity());
  }, [dispatch]);

  const recheckValidity = () => {
    dispatch(checkTokenValidity());
  };

  return { isAuthenticated, loading, error, user, recheckValidity };
};
