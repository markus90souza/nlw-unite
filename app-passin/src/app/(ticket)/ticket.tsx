import { useState } from "react"
import {
  Text,
  View,
  Alert,
  Modal,
  Share,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import { MotiView } from "moti"
import { FontAwesome } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import { Redirect } from "expo-router"

import { useBadgeStore } from "@/store/use-credential-store"

import { colors } from "@/styles/colors"

import { TicketCredential } from "./components/ticket-credential"
import { Button } from "@/components/button"
import { QRCode } from "@/components/qrcode"
import { TicketHeader } from "./components/ticket-header"

export default function Ticket() {
  const [expandQRCode, setExpandQRCode] = useState(false)

  const badgeStore = useBadgeStore()

  async function handleShare() {
    try {
      if (badgeStore.data?.checkInUrl) {
        await Share.share({
          message: badgeStore.data.checkInUrl,
        })
      }
    } catch (error) {
      console.log(error)
      Alert.alert("Compartilhar", "Não foi possível compartilhar.")
    }
  }

  async function handleSelectImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
      })

      if (result.assets) {
        badgeStore.updateAvatar(result.assets[0].uri)
      }
    } catch (error) {
      console.log(error)
      Alert.alert("Foto", "Não foi possível selecionar a imagem.")
    }
  }

  if (!badgeStore.data?.checkInUrl) {
    return <Redirect href="/" />
  }

  return (
    <View className="flex-1 bg-green-500">
      <StatusBar barStyle="light-content" />
      <TicketHeader title="Minha Credencial" />

      <ScrollView
        className="-mt-28 -z-10"
        contentContainerClassName="px-8 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <TicketCredential
          data={badgeStore.data}
          onChangeAvatar={handleSelectImage}
          onExpandedQRCode={() => setExpandQRCode(true)}
        />

        <MotiView
          from={{
            translateY: 0,
          }}
          animate={{
            translateY: 10,
          }}
          transition={{
            loop: true,
            type: "timing",
            duration: 700,
          }}
        >
          <FontAwesome
            name="angle-double-down"
            color={colors.gray[300]}
            size={24}
            className="self-center my-6"
          />
        </MotiView>

        <Text className="text-white font-bold text-2xl mt-4">
          Compartilhar credencial
        </Text>

        <Text className="text-white font-regular text-base mt-1 mb-6">
          Mostre ao mundo que você vai participar do evento{" "}
          {badgeStore.data.eventTitle}!
        </Text>

        <Button title="Compartilhar" onPress={handleShare} />

        <TouchableOpacity
          className="mt-10"
          activeOpacity={0.7}
          onPress={() => badgeStore.remove()}
        >
          <Text className="text-base text-white font-bold text-center">
            Remover Ingresso
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={expandQRCode} statusBarTranslucent>
        <View className="flex-1 bg-green-500 items-center justify-center">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setExpandQRCode(false)}
          >
            <QRCode value="teste" size={300} />
            <Text className="font-body text-orange-500 text-sm mt-10 text-center">
              Fechar QRCode
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}