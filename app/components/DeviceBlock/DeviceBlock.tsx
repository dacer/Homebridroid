import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../constant";
import styles from "./DeviceBlock.styles";
import { Device } from "../../ducks/api/api.slice";

function DeviceBlock({
    uniqueId,
    serviceName,
    onClick
}: Device & {onClick?: () => void}) {
  const enabled = true
  return (
    <TouchableOpacity 
      style={enabled? styles.containerEnabled : styles.container}
      onPress={onClick}
    >
      <Text style={styles.name}>{serviceName}</Text>
      {/* <Text style={styles.desc}>{desc}</Text> */}
    </TouchableOpacity>
  );
}

export default DeviceBlock