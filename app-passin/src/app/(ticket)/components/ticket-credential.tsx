import { QRCode } from '@/components';
import { colors } from '@/styles/colors';
import { Feather } from '@expo/vector-icons';
import { FC } from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';



type TicketCredentialProps = {
  avatarUrl?: string
  onChangeAvatar?: () => void
  onExpandedQRCode?: () => void
}


export const TicketCredential: FC<TicketCredentialProps> = ({ avatarUrl, onChangeAvatar, onExpandedQRCode}) => {
  return (
    <View className='w-full self-stretch items-center'>
      <Image 
        source={require('@/assets/ticket/band.png')} 
        className='w-24 h-52 z-10'
      />

      <View className='bg-black/20 mx-3 rounded-2xl -mt-5 self-stretch items-center pb-6 border border-white/10'>
        <ImageBackground
          source={require('@/assets/ticket/header.png')}
          className='overflow-hidden h-40 items-center self-stretch px-6 py-8 border-b border-white/10'
        >

          <View className='w-full items-center justify-between flex-row'>
            <Text className='text-zinc-50 text-sm font-bold'>
              NLW Unite
            </Text>

            <Text className='text-zinc-50 text-sm font-bold'>
              {'@121212'}
            </Text>
          </View>

          <View className='w-40 h-40 rounded-full bg-black' />
        </ImageBackground>

        {
          avatarUrl ? ( 
            <TouchableOpacity
              activeOpacity={0.9} 
              onPress={onChangeAvatar}
            >
            <Image className='w-36 h-36 rounded-full -mt-24' source={{ uri: avatarUrl}} />
          
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className='w-36 h-36 -mt-24 rounded-full bg-slate-800 items-center justify-center' 
              activeOpacity={0.9} 
              onPress={onChangeAvatar}
            >
              <Feather name='camera' size={32} color={colors.green['400']} />
            </TouchableOpacity>
          )
        }

      
      
        <View className='w-full items-center my-4'>
          <Text className='text-zinc-50 text-2xl font-bold'>
            Marcos de Souza
          </Text>

          <Text className='text-zinc-300 text-base font-regular'>
            {'m@gmail.com'}
          </Text>
        </View>
       

       <QRCode
          value='Teste' 
          size={120}
       />
        <TouchableOpacity activeOpacity={0.7} className='mt-6' onPress={onExpandedQRCode}>
          <Text className='text-sm font-bold text-orange-500'>
            Ampliar QRCode
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

