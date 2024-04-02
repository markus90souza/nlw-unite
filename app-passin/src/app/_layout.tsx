import { Slot } from "expo-router";

import "@/styles/globals.css"
import { useFonts } from "expo-font";
import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold} from '@expo-google-fonts/roboto'
import { Loading } from "@/components/loading";
import { StatusBar } from "react-native";

const Layout = () => {
  
  const [fontsLoaded] = useFonts({
    Roboto_400Regular, Roboto_500Medium, Roboto_700Bold
  })

  if(!fontsLoaded){
    return <Loading />
  } 
  
  return (
    <>
      <StatusBar barStyle={'light-content'} translucent backgroundColor={'transparent'} />
      <Slot />
    </>
  )
}

export default Layout
