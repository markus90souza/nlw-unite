import  { FC } from 'react';
import { Text, View } from 'react-native';

type TicketHeaderProps = { title: string } 

export const TicketHeader: FC<TicketHeaderProps> = ( { title }) => {
  return (
  <View className='w-full pb-4 px-8 bg-black/20 border-b border-white/10 h-28 flex-row items-end '>
    <Text className='text-lg font-medium flex-1 text-white text-center'>{title}</Text>
  </View>
  )
}

