import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const domainUrl = 'https://sach-tu-tam.herokuapp.com';

export default function DetailScreen({ route, navigation }) {
    const [imgWidth, setImgWidth] = useState(0);
    const [imgHeight, setImgHeight] = useState(0);
    const book = route.params.book;
    //console.log(book);
    const imgUrl = `${domainUrl}/${book.imageurl}`;

    Image.getSize(imgUrl, (width, height) => {
        const screenWidth = Dimensions.get('window').width;
        const scaleFactor = width / screenWidth;
        const imageHeight = height / scaleFactor;
        setImgHeight(imageHeight);
        setImgWidth(screenWidth);
    });

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <ScrollView>
                    <Text>{book.name}</Text>
                    <Image
                        style={{
                            width: imgWidth,
                            height: imgHeight,
                            resizeMode: 'cover',
                        }}
                        source={{
                            uri: imgUrl,
                        }}
                    />

                    <Text>{book.description}</Text>
                </ScrollView>
                <TouchableOpacity style={styles.positionInBottom}>
                    <Text>Mua sách</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        minHeight: Dimensions.get('window').height - 70,
    },

    positionInBottom: {
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        height: 70,
        bottom: 0,
        //left: Dimensions.get('window').width - 70,
        backgroundColor: 'red',
        zIndex: 100,
    },
});
