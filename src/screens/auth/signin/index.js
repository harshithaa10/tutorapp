import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import TextInput from '../../../components/partial/AppInput';
import Button from '../../../components/partial/AppButton';
import {theme} from '../../../utils/data/theme';
import {emailValidator, passwordValidator} from '../../../helpers/validator';
import {login} from '../../../services/auth-services';
import {MD2Colors} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {loginHandler} from '../../../store/login-slice';

const Signin = ({navigation}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [values, setValues] = useState({
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
  });

  const loginSubmit = async () => {
    setLoader(true);
    try {
      const result = await login(values.email, values.password);
      if (result.status) {
        dispatch(
          loginHandler({
            token: result.token,
            userRole: result.data.user_role,
            name: result.data.name,
            phone: result.data.phone,
            email: result.data.email,
            isPlanExpired: String(result.plan_expired),
          }),
        );
      }
      setLoader(false);
    } catch (err) {
      setLoader(false);
      // console.warn(JSON.stringify(err));
      Alert.alert('failed to login');
    }
  };
  const onLoginSubmit = async () => {
    const emailError = emailValidator(values.email);
    const passwordError = passwordValidator(values.password);
    if (emailError) {
      setValues({...values, emailError: emailError});
      return;
    }
    if (passwordError) {
      setValues({...values, passwordError: passwordError});
      return;
    }
    await loginSubmit();
  };

  if (loader) {
    return (
      <ActivityIndicator
        style={styles.loader}
        animating={true}
        color={MD2Colors.red800}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.logoImage}
        source={require('../../../assets/images/logo.png')}
      />
      <StatusBar style="auto" />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={values.email}
        onChangeText={value =>
          setValues({...values, email: value, emailError: ''})
        }
        error={!!values.emailError}
        errorText={values.emailError}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={values.password}
        onChangeText={value =>
          setValues({...values, password: value, passwordError: ''})
        }
        error={!!values.passwordError}
        errorText={values.passwordError}
        secureTextEntry={true}
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginSubmit}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  loginText: {
    color: '#fff',
  },
  logoImage: {
    paddingHorizontal: 10,
    height: 110,
    width: '50%',
    justifyContent: 'center',
    resizeMode: 'contain',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 8,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default Signin;
