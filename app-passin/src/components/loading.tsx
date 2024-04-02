import { FC } from "react";
import { ActivityIndicator } from "react-native";


export const Loading: FC = () => {
  return <ActivityIndicator className="flex-1 text-orange-500 justify-center items-center bg-green-500"/>;
}

