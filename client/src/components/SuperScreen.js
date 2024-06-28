import React, { useEffect ,useContext,useState} from 'react'
import AllListScreen from './AllListScreen';
import HomeScreen from './HomeScreen';
import UserScreen from './UserScreen';
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'

export default function SuperScreen (){
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const[selection,setSelection]= useState("");

    useEffect(() => {
      LoadScreen();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[store.currentScreen]);

    let findOut = async function(){
        let log = await auth.getLoggedIn();
        console.log(log);
        if(log){
          store.setScreen("HomeScreen");
        }else store.setScreen("AllListScreen");
    }

    let LoadScreen=()=>{
      if(store.currentScreen==="HomeScreen"){
          setSelection(<HomeScreen/>);
      }
      else if(store.currentScreen==="AllListScreen"){
          setSelection(<AllListScreen/>);  
      }
      else if(store.currentScreen==="UserScreen"){
          setSelection(<UserScreen/>);
      }
      else{
        findOut();
      }
    }

  return (
    <div>
        {selection}
    </div>
  );
}
