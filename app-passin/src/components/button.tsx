import React, { FC } from 'react';
import { TouchableOpacity, TouchableOpacityProps, Text, ActivityIndicator } from 'react-native';

type ButtonProps = TouchableOpacityProps & {
  title: string
  isLoading?: boolean
}

export const Button: FC<ButtonProps> = ({ title, isLoading = false, ...rest}) => {
  return (
  <TouchableOpacity 
  disabled={isLoading}
  className='w-full h-14 rounded-lg justify-center items-center bg-orange-500' {...rest}>
   {
    isLoading ? <ActivityIndicator className='text-green-500' /> :  <Text className='uppercase font-bold text-base text-green-500'>
    {title}
  </Text>
   }
    </TouchableOpacity>
    );
}

