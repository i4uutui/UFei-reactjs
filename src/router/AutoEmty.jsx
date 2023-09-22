import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getItem } from '../assets/js/storage';

const getToken = () => {
  const token = getItem('token');
  return token;
}

export function AutoPage({children}){
  const router = useNavigate();
  if(getToken()){
    return (
      <>{children}</>
    )
  }else{
    useEffect(() => {
      router('/login');
    })
  }
}

export function AutoLogin({children}){
  const router = useNavigate();
  if(getToken()){
    useEffect(() => {
      router('/');
    })
  }else{
    return (
      <>{children}</>
    )
  }
}