import { FC, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert, Modal } from 'react-native';
import { TicketHeader } from './components/ticket-header';
import { TicketCredential } from './components/ticket-credential';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '@/styles/colors';
import { Button, QRCode } from '@/components';

import * as ImagePicker from 'expo-image-picker'

const Ticket: FC = () => {

  const [avatarUrl, setAvatarUrl] = useState("")
  const [expandedQRCode, setExpandedQRCode] = useState(false)

  const handleSelectAvatarImage = async () => {
    try {

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect:[4,4]
    })

    if(result.assets){
      console.log(result.assets)
      setAvatarUrl(result.assets[0].uri)
    }
      
    } catch (error) {
      console.log(error)
      Alert.alert('Foto', 'Não foi possivel selecionar a imagem')
    }
  }

  const toggleExpandedQRCode = () => {
    setExpandedQRCode( state => !state)
  }

  return (
  <View className='flex-1 bg-green-500' >
    <TicketHeader title='Minha Crendencia' />
    <ScrollView 
      showsVerticalScrollIndicator={false}
      className='-mt-28 -z-10' 
      contentContainerClassName='px-8 pb-4'
    >

      <TicketCredential
        avatarUrl={avatarUrl}
        onChangeAvatar={handleSelectAvatarImage}
        onExpandedQRCode={toggleExpandedQRCode}
      />

      <FontAwesome 
        name='angle-double-down' 
        size={24} color={colors.green['200']} 
        className='self-center my-6'
      />

      <View className='w-full mt-4 mb-10 gap-6'>
        <View className='w-full gap-1'>
          <Text className='font-bold text-white text-2xl '>Compartilhar credencial</Text>
          <Text className='text-white font-regular text-base'>
            Mostre ao mundo que você vai participar do Unite Summit!
          </Text>
        </View>
        <Button title='Compartilhar'/> 
      </View>

      <TouchableOpacity activeOpacity={0.7}> 
        <Text className='text-white text-center font-bold text-base'>Remover Ingresso</Text>
      </TouchableOpacity>

    </ScrollView>

    <Modal visible={expandedQRCode} statusBarTranslucent>

      <View className='flex-1 bg-green-500 items-center justify-center'>
        <TouchableOpacity activeOpacity={0.7} onPress={toggleExpandedQRCode}>
          <QRCode value='teste' size={300} />
          <Text className='text-center mt-10 text-sm font-bold text-orange-500'>
            Fechar
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  </View>
  )
}

export default Ticket;