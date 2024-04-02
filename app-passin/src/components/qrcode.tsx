import { colors } from '@/styles/colors';
import React, { FC } from 'react';
import { View } from 'react-native';
import RNQRCode, { QRCodeProps as RNQRCodeProps } from 'react-native-qrcode-svg'


type QRCodeProps = RNQRCodeProps  

export const QRCode: FC<QRCodeProps> = (props) => {
  return <RNQRCode 
            color={colors.white}
            backgroundColor='transparent'
            {...props}
          />;
}

