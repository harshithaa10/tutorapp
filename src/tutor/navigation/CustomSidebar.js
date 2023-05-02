import React from 'react';
import {SafeAreaView, View, StyleSheet, Image, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {loginSelector} from '../../../src/store/login-slice';

const CustomSidebar = props => {

  const IMAGE_PATH = './../../assets/images/logo.png';
  const {name} = useSelector(loginSelector);

  return (
    <SafeAreaView style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: 'rgb(66, 66, 74)'}}>
        <View style={{marginBottom: 20}}>
          <Image
            source={require(IMAGE_PATH)}
            style={styles.sideMenuProfileIcon}
          />
          <Text style={styles.profileText}>Admin | {name}</Text>
        </View>
        <View style={styles.menuList}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'contain',
    width: '95%',
    height: 60,
    marginTop: 10,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileText: {
    color: 'white',
    textAlign: 'center',
  },
  menuList: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
});

export default CustomSidebar;
