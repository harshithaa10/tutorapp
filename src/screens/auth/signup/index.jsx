import * as React from 'react';
import {TextInput} from 'react-native-paper';

const signup = () => {
  return (
    <TextInput
      label="Password"
      secureTextEntry
      right={<TextInput.Icon name="eye" />}
    />
  );
};

export default signup;
