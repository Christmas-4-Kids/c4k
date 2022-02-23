import React from "react"
import { Text } from "react-native"

export const C4kText = (props: any) => {
  const { children, ...rest } = props
  return (
    <Text allowFontScaling={false} {...rest}>
      {children}
    </Text>
  )
}
