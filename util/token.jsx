import AsyncStorage from "@react-native-async-storage/async-storage";

const getLocal = async () =>{
  try{
    const token = await AsyncStorage.getItem("token")
    return token
  }catch(e){

  }
}

const storeLocal = async (token)=>{
  try {
    await AsyncStorage.setItem("token",token)
  } catch (e) {
    
  }
}

const removeLocal = async ( ) =>{
  try {
    await AsyncStorage.removeItem("token")
  } catch (e) {
    console.log(e); 
  }
}


export const Token ={
  getLocal,
  storeLocal,
  removeLocal
}