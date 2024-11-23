import { View, Text, ScrollView, Image, Dimensions } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import * as yup from "yup";
import { useFormik } from "formik";
import CustomButton from "@/components/CustomButton";
import { Link, useRouter } from "expo-router";

import Toast from "react-native-toast-message";
import { loginUser } from "@/lib/api/Auth/Login";
const loginValidate = yup.object().shape({
  email: yup
    .string()
    .email("Lütfen geçerli bir mail adresi giriniz")
    .required("Mail adresi zorunludur"),
  password: yup.string().required("Sifre zorunludur"),
});

const SignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidate,
    onSubmit: (values) => {
      console.log(values);
      setLoading(true);
      loginUser(values.email, values.password)
        .then((response) => {
          console.log("kullanıcı eklendi", response);
          Toast.show({
            type: "success",
            text1: "Başarılı",
            text2: "Giriş Yapıldı",
          });
          router.replace("/home");
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          Toast.show({
            type: "error",
            text1: "Hata",
            text2: "Giriş Yapılamadı",
          });
          console.log("kullanıcı eklenemedi", error);
        });
    },
  });

  return (
    <SafeAreaView className="flex-1 bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 290,
          }}>
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-28 h-28"
          />

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Weebee'ye Giriş Yap
          </Text>

          <FormField
            variant="INPUT"
            title="Email"
            value={form.values.email}
            onBlur={form.handleBlur("email")}
            handleChangeText={form.handleChange("email")}
            otherStyles="mt-7"
            keyboardType="email-address"
            placeholder={"Email adresinizi giriniz"}
            error={form.errors.email}
          />

          <FormField
            title="Şifre"
            variant="PASSWORD"
            value={form.values.password}
            onBlur={form.handleBlur("password")}
            handleChangeText={form.handleChange("password")}
            otherStyles="mt-7"
            keyboardType="default"
            placeholder={"Şifrenizi Giriniz"}
            error={form.errors.password}
          />

          <CustomButton
            title="Giriş Yap"
            handlePress={form.handleSubmit}
            containerStyles="mt-7"
            isLoading={loading}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Hesabın Yok mu?
            </Text>
            <Link
              href={{
                pathname: "/SignUp",
              }}
              className="text-lg font-psemibold text-secondary">
              Kayıt Ol
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
