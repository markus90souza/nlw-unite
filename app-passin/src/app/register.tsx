import { Button, Input } from '@/components';

import { colors } from '@/styles/colors';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { FC } from 'react';
import { View, Image  } from 'react-native';

const Register: FC = () => {
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
        <Input.Field placeholder='Nome completo' />
      </Input>

      <Input>
        <MaterialIcons name='alternate-email' size={20} color={colors.green['200']} />
        <Input.Field placeholder='seu@email.com' keyboardType='email-address' />
      </Input>

      <Button activeOpacity={0.7} title='REALIZAR INSCRIçÃO' /> 

      <Link href={"/"} className='text-center mt-8 text-gray-100 text-base font-bold'>
        Já possui ingresso?
      </Link>
    </View>
  </View>
  );
}

export default Register;