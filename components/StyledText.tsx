import * as React from "react"
import { C4kText } from "./C4kText"

import { Text, TextProps } from "./Themed"

export function MonoText(props: TextProps) {
  return <C4kText {...props} style={[props.style, { fontFamily: "ZillaSlab-Medium" }]} />
}
