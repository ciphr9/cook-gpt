import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Surface } from "react-native-paper";
import TitleBar from "./TitleBar";
import { IScreenProps } from "../typings/screen";

const Screen = ({ titleBarOptions, children }: IScreenProps) => {
  return (
    <Surface style={styles.surface}>
      <TitleBar {...titleBarOptions} />
      <ScrollView>{children}</ScrollView>
    </Surface>
  );
};

const styles = StyleSheet.create({
  surface: { height: "100%" },
});

export default Screen;
