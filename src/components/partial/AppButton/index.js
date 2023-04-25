import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {theme} from '../../../utils/data/theme';

export default function AppButton({mode, style, ...props}) {
  return (
    <Button
      style={[
        styles.button,
        mode === 'outlined' && {backgroundColor: theme.colors.primary},
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
    backgroundColor:theme.colors.primary,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
});
