import { Button, Input } from '@/components';
import { api } from '@/services/api';


import { colors } from '@/styles/colors';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { isAxiosError } from 'axios';
import { Link, router } from 'expo-router';
import { FC, useState } from 'react';
import { View, Image, Alert  } from 'react-native';


const EVENT_ID = 'clukjypej0005n9niyloax7b6'

const Register: FC = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {

    try {
      if(!name.trim() || !email.trim()){
        return Alert.alert('Ingresso', 'Preencha todos os campos')
      }

      setLoading(true)

     const { data: { attendeeId } } =  await api.post(`/events/${EVENT_ID}/attendees`, {
        name, email
     })


  
      if(attendeeId){
        Alert.alert('Inscrição', 'Realizada com sucesso', [
          { 
            text: 'OK',
            onPress: () => router.push('/ticket') 
          }
        ])
      }


    
      
      
      
    } catch (error) {

      setLoading(false)

      if(isAxiosError(error)){
        if(error.response?.data){
          Alert.alert('Erro', String(error.response.data.message) )
        }
      }
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
        <FontAwesome5 name='user-circle' size={20} color={colors.green['200']} />
        <Input.Field placeholder='Nome completo' onChangeText={setName} />
      </Input>

      <Input>
        <MaterialIcons name='alternate-email' size={20} color={colors.green['200']} />
        <Input.Field placeholder='seu@email.com' 
        keyboardType='email-address' onChangeText={setEmail} />
      </Input>

      <Button activeOpacity={0.7} 
        title='REALIZAR INSCRIçÃO'
        onPress={handleRegister}
        isLoading={loading}
      /> 

      <Link href={"/"} className='text-center mt-8 text-gray-100 text-base font-bold'>
        Já possui ingresso?
      </Link>
    </View>
  </View>
  );
}

export default Register;