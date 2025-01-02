import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown as _Dropdown } from "react-native-element-dropdown";
import Ionicons from "@expo/vector-icons/Ionicons";

const Dropdown = ({ data, onChange, disable, value }) => {
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          {!disable && !isFocus ? "Select Recipient" : ""}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <_Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: "blue" },
          disable && styles.disable,
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        disable={disable}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select Recipient" : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          // setValue(item.value);
          setIsFocus(false);
          onChange(item.value);
        }}
        renderLeftIcon={() => (
          <Ionicons
            name="receipt-outline"
            size={24}
            style={styles.icon}
            color={isFocus ? "blue" : "black"}
          />
        )}
      />
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  disable: {
    opacity: 0.5,
    // backgroundColor: "gray",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 16,
  },
  label: {
    position: "absolute",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
