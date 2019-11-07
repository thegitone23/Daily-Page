import { 
  UPDATE_EDITOR_TEXT, 
  ADD_EDITOR, 
  HANDLE_NOTE_CLICK,
  GET_DATA,
  DONE_CHANGES

} from './types';
import axios from '../utils/axios';
import AsyncStorage from '@react-native-community/async-storage';
import {debounce} from 'lodash';

//? axios settings

const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('jwtToken')
    if (value !== null) {
      // console.log(value)
      const token = value;
      axios.defaults.headers.common = { 'Authorization': token }
    }
  } catch (e) {
    // error reading value
    throw (e)
  }
}
// const token = getToken();
// console.log(token)
// axios.defaults.headers.common = { 'Authorization': token }
console.log('user actions');
getToken();

export const addEditor =(text)=>async dispatch=>{
  
  const request = await axios.post("/api/note/",{text})
  .then(res=>res.data)
  // console.log(request);
  dispatch({
    type:ADD_EDITOR,
    payload:request
  })
}

export const doneChanges =(noteID,text)=>async dispatch=>{  
  const request = await axios.put("/api/note/",{noteID, text})
  .then(res=>res.data)
  .catch(err=>{console.log(err)})
  // console.log(request);
  dispatch({
    type:DONE_CHANGES,
    payload: request
  })
}


export const getData =()=>async dispatch =>{
  const request = await axios.get("/api/note/")
  .then(res=>res.data)
  .catch(err=>{console.log('something went wrong')})
  // console.log(request);

  dispatch({
    type: GET_DATA,
    payload:request
  })
}

export const updateEditorText =(note)=>{
  // const { _id: noteID, text} = note;
  // const payload={
  //   noteID,
  //   text
  // }
  const text= note;
   return({
    type: UPDATE_EDITOR_TEXT,
    payload:text
  })

}

const  update =  debounce(async(note) => {
  const request =await axios.patch("/api/note/",note)
  console.log("sending data to database");
}, 2000);

export const handleNoteClick = (text, _id)=>{
  const payload = {
    text,
    _id
  }
  return {
    type:HANDLE_NOTE_CLICK,
    payload
  }
}