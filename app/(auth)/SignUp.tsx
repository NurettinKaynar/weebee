import { View, Text, ScrollView, Image, Dimensions } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import * as yup from "yup";
import { useFormik } from "formik";
import CustomButton from "@/components/CustomButton";
import { Link, useRouter } from "expo-router";
import { createUser } from "@/lib/api/Auth/CreateUser";
import clsx from "clsx";
import Toast from "react-native-toast-message";
const loginValidate = yup.object().shape({
  username: yup.string().required("Kullanıcı adı zorunludur"),
  email: yup
    .string()
    .email("Lütfen geçerli bir mail adresi giriniz")
    .required("Mail adresi zorunludur"),
  password: yup.string().required("Sifre zorunludur"),
});

const SignUp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: loginValidate,
    onSubmit: async (values) => {
      console.log(values);
      setLoading(true);
      const register = await createUser(
        values.email,
        values.password,
        values.username
      );
      console.log("kullanıcı eklendi", register);
      if (register) {
        setLoading(false);
        Toast.show({
          type: "success",
          text1: "Başarılı",
          text2: "Hesabınız eklendi",
          position: "top",
          visibilityTime: 3000,
          autoHide: true,
        });
        router.replace("/home");
      } else {
        setLoading(false);
        console.log("kullanıcı eklenemedi");
        Toast.show({
          type: "error",
          text1: "Hata",
          text2: "Hesabınız eklenemedi",
          position: "top",
          visibilityTime: 3000,
          autoHide: true,
        });
      }
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
            Weebee'ye Kayıt Ol
          </Text>

          <FormField
            variant="INPUT"
            title="Kullanıcı Adı"
            value={form.values.username}
            onBlur={form.handleBlur("username")}
            handleChangeText={form.handleChange("username")}
            otherStyles="mt-7"
            keyboardType="default"
            placeholder={"Kullanıcı adınızı giriniz"}
            error={form.errors.username}
          />
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
            title="Kayıt Ol"
            handlePress={form.handleSubmit}
            containerStyles={clsx("mt-7", {
              "opacity-50": form.touched && !form.isValid,
            })}
            isLoading={loading}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Hesabın Var mı?
            </Text>
            <Link
              href={{
                pathname: "/SignIn",
              }}
              className="text-lg font-psemibold text-secondary">
              Giriş Yap
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
