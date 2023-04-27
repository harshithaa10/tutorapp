import React from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Image,
    Text,
} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';

const CustomSidebar = (props) => {
    const BASE_PATH =
        '../../assets/images/logo.png';

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ marginTop: 40, }}>
                <Image
                    source={{ uri: BASE_PATH }}
                    style={styles.sideMenuProfileIcon}
                />
            </View>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props}  />
                <DrawerItem
                    label="Dashboard"
                />
                <View style={styles.customItem}>
                    <Text>
                        Classes
                    </Text>
                </View>
            </DrawerContentScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sideMenuProfileIcon: {
        resizeMode: 'contain',
        width: '95%',
        height: 60,
    },
    customItem: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default CustomSidebar;