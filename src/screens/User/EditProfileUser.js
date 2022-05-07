import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-root-toast";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../../components/TextInput";
import { theme } from "../../core/theme";
import { phoneValidator } from "../../helpers/emailValidator";
import { nameValidator } from "../../helpers/nameValidator";
import { updateUser } from "../../redux/authSlice";
import useLocationForm from "../../hook/useLocationForm";
import { addAddress, updateAddress } from "../../redux/addressSlice";

export default function EditProfileUser() {
  const { user, token } = useSelector((state) => state.auth);
  const { address, messageError } = useSelector((state) => state.address);
  const [addressUser, setAddressUser] = useState(
    `${address?.street}, ${address?.wards}, ${address?.district}, ${address?.city}`
  );

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState({ value: user?.email, error: "" });
  const [userName, setUserName] = useState({
    value: user?.userName,
    error: "",
  });
  const [phone, setPhone] = useState({
    value: user?.phone,
    error: "",
  });

  const [itemSelected, setItemSelected] = useState(user?.gender);

  const [editAble, setEditAble] = useState(false);

  const [street, setStreet] = useState(address ? address.street : "");

  const { state, onCitySelect, onDistrictSelect, onWardSelect, onSubmit } =
    useLocationForm(false);

  const {
    cityOptions,
    districtOptions,
    wardOptions,
    selectedCity,
    selectedDistrict,
    selectedWard,
  } = state;

  const handleEdit = () => {
    setEditAble(true);
  };

  const handleSave = () => {
    const phoneNumberError = phoneValidator(phone.value);
    const nameError = nameValidator(userName.value);

    if (phoneNumberError || nameError) {
      setUserName({ ...userName, error: nameError });
      setPhone({ ...phone, error: phoneNumberError });
      return;
    }

    if (!street || !selectedCity || !selectedDistrict || !selectedWard) {
      Toast.show("Vui lòng nhập đầy đủ địa chỉ", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        containerStyle: {
          backgroundColor: "#C4C4C4",
          borderRadius: 200,
          marginBottom: 300,
          paddingHorizontal: 20,
          shadowColor: "#e6e6e6",
          shadowOpacity: 0.5,
        },
        textStyle: { color: "#000", fontWeight: "bold" },
      });
      return;
    }

    const data = {
      email: email.value,
      userName: userName.value,
      gender: itemSelected,
      phone: phone.value,
    };

    dispatch(updateUser(data));

    if (address) {
      const dtAddress = {
        id: address.id,
        city: selectedCity.label,
        district: selectedDistrict.label,
        wards: selectedWard.label,
        street: street,
        user: user,
      };

      dispatch(updateAddress(dtAddress));
    } else {
      const dtAddress = {
        city: selectedCity.label,
        district: selectedDistrict.label,
        wards: selectedWard.label,
        street: street,
        user: user,
      };
      dispatch(addAddress(dtAddress));
    }

    Toast.show("Cập nhật thành công", {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      containerStyle: {
        backgroundColor: "#C4C4C4",
        borderRadius: 200,
        marginBottom: 300,
        paddingHorizontal: 20,
        shadowColor: "#e6e6e6",
        shadowOpacity: 0.5,
      },
      textStyle: { color: "#000", fontWeight: "bold" },
    });

    setEditAble(false);
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.view}>
        <Text style={{ marginLeft: 10 }}>email :</Text>
        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: "" })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          editable={false}
          style={[styles.textInput, { marginLeft: 54 }]}
        />
      </View>

      <View style={styles.view}>
        <Text style={{ marginLeft: 10 }}>Họ và tên :</Text>
        <TextInput
          label="Họ và tên"
          returnKeyType="next"
          value={userName.value}
          onChangeText={(text) => setUserName({ value: text, error: "" })}
          error={!!userName.error}
          errorText={userName.error}
          editable={editAble}
          style={[styles.textInput, { marginLeft: 30 }]}
        />
      </View>

      <View style={styles.view}>
        <Text style={{ marginLeft: 10 }}>Giới tính:</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={itemSelected}
            onValueChange={(itemValue, itemIndex) => setItemSelected(itemValue)}
          >
            <Picker.Item
              style={styles.textItem}
              label="Giới Tính"
              value="gioiTinh"
            />

            <Picker.Item style={styles.textItem} label="Nam" value={true} />
            <Picker.Item style={styles.textItem} label="Nữ" value={false} />
          </Picker>
        </View>
      </View>

      <View style={styles.view}>
        <Text style={{ marginLeft: 10 }}>Số điện thoại:</Text>
        <TextInput
          label="Số điện thoại"
          returnKeyType="next"
          value={phone.value}
          onChangeText={(text) => setPhone({ value: text, error: "" })}
          error={!!phone.error}
          errorText={phone.error}
          autoCapitalize="none"
          autoCompleteType="tel"
          keyboardType="phone-pad"
          editable={editAble}
          style={[styles.textInput, { marginLeft: 10 }]}
        />
      </View>

      {!editAble ? (
        <View style={styles.view}>
          <Text style={{ marginLeft: 10 }}>Địa chỉ:</Text>
          <Text style={styles.textInputAddress}>{addressUser}</Text>
        </View>
      ) : (
        <View>
          <View style={styles.view}>
            <Text style={{ marginLeft: 10 }}>Số nhà:</Text>
            <TextInput
              label="Số nhà"
              returnKeyType="next"
              value={street}
              onChangeText={(text) => setStreet(text)}
              editable={editAble}
              style={[styles.textInput, { marginLeft: 50 }]}
            />
          </View>

          <View>
            <View style={styles.viewAddress}>
              <Text style={{ marginLeft: 10 }}>Tỉnh/Thành phố:</Text>
              <View style={styles.pickerAddress}>
                <Picker
                  selectedValue={selectedCity?.value}
                  onValueChange={(itemValue, itemIndex, itemLable) => {
                    onCitySelect(cityOptions[itemIndex - 1]);
                    console.log(selectedCity);
                  }}
                >
                  <Picker.Item
                    style={styles.textItem}
                    label="Thành phố"
                    value="thanhpho"
                  />
                  {cityOptions.map((city, index) => (
                    <Picker.Item
                      style={styles.textItem}
                      label={city.label}
                      value={city.value}
                      key={`cityId_${selectedCity?.value}`}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.viewAddress}>
              <Text style={{ marginLeft: 10 }}>Quận/Huyện:</Text>
              <View style={styles.pickerAddress}>
                <Picker
                  selectedValue={selectedDistrict?.value}
                  onValueChange={(itemValue, itemIndex) => {
                    onDistrictSelect(districtOptions[itemIndex - 1]);
                  }}
                >
                  <Picker.Item
                    style={styles.textItem}
                    label="Quận huyện"
                    value="quan"
                  />
                  {districtOptions.map((district, index) => (
                    <Picker.Item
                      style={styles.textItem}
                      label={district.label}
                      value={district.value}
                      key={index}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={styles.viewAddress}>
              <Text style={{ marginLeft: 10 }}>Phường/Xã:</Text>
              <View style={styles.pickerAddress}>
                <Picker
                  selectedValue={selectedWard?.value}
                  onValueChange={(itemValue, itemIndex) => {
                    onWardSelect(wardOptions[itemIndex - 1]);
                  }}
                >
                  <Picker.Item
                    style={styles.textItem}
                    label="Phường"
                    value="phuong"
                  />
                  {wardOptions.map((ward, index) => (
                    <Picker.Item
                      style={styles.textItem}
                      label={ward.label}
                      value={ward.value}
                      key={index}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
        </View>
      )}

      {editAble == false ? (
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity style={styles.btnEdit} onPress={() => handleEdit()}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
              CẬP NHẬT THÔNG TIN
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={styles.bthSave} onPress={() => handleSave()}>
            <Text style={{ fontSize: 14, fontWeight: "bold", color: "#000" }}>
              CẬP NHẬT
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnBack}
            onPress={() => setEditAble(false)}
          >
            <Text style={{ fontSize: 14, fontWeight: "bold", color: "#000" }}>
              QUAY LẠI
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  view: {
    flexDirection: "row",
    alignItems: "center",
  },
  textItem: {
    fontSize: 14,
  },
  btnEdit: {
    width: 300,
    borderRadius: 20,
    backgroundColor: "#F08F5F",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  bthSave: {
    width: 100,
    borderRadius: 20,
    backgroundColor: "cyan",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    marginTop: 10,
  },
  btnBack: {
    width: 100,
    borderRadius: 20,
    backgroundColor: "#F08F5F",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    marginTop: 10,
  },
  picker: {
    marginVertical: 12,
    width: "37%",
    backgroundColor: theme.colors.surface,
    marginLeft: 40,
    borderRadius: 5,
    justifyContent: "center",
    marginBottom: 10,
    borderColor: "#000",
  },
  textInput: {
    width: 250,
  },
  textInputAddress: {
    marginLeft: 10,
    fontSize: 13,
  },
  pickerAddress: {
    marginVertical: 12,
    width: "60%",
    backgroundColor: theme.colors.surface,
    marginLeft: 5,
    borderRadius: 5,
    justifyContent: "center",
    marginBottom: 10,
    borderColor: "#000",
  },
  viewAddress: {
    flexDirection: "row",
    alignItems: "center",
  },
});
