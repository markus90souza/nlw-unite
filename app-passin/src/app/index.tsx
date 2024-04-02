import { Button, Input } from '@/components';

import { colors } from '@/styles/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { FC, useState } from 'react';
import { View, Image, Alert  } from 'react-native';

const Home: FC = () => {

  const [code, setCode] = useState("")

  const handleAccessCredentials = () => {

    if(!code.trim()){
      return Alert.alert('Ingresso', 'Informe as credenciais do ingresso')
    }
    
  }

  return(
  <View className='flex-1 p-8 justify-center items-center bg-green-500'>
    <Image 
      source={require('@/assets/logo.png')} 
      resizeMode='contain' 
      className='h-16' 
    /> 

    <View className='w-full mt-12 gap-3'>
      <Input>
        <MaterialCommunityIcons name='ticket-confirmation-outline' size={20} color={colors.green['200']} />
        <Input.Field 
          placeholder='Codigo do ingresso' 
          onChangeText={setCode}
        />
      </Input>

      <Button 
        activeOpacity={0.7} 
        title='Acessar credencial' 
        onPress={handleAccessCredentials}
      /> 

      <Link href={"/register"} className='text-center mt-8 text-gray-100 text-base font-bold'>
        Ainda não possui ingresso ?
      </Link>
    </View>
  </View>
  );
}

export default Home;