/* eslint-disable react-native/no-color-literals */
import React from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Text,
  Modal,
  View,
  Image,
} from 'react-native';
import {
  Icon,
  ActionSheet,
  Item,
  Label,
} from "native-base";

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';
import Strings from '../constants/Strings';

export default class ImagePickerTaker extends React.Component {
  constructor(props) {
    super(props);

    const images = this.props.images;
    this.state = {
      images,
      modalVisible: false,
    }
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  async getPermissionAsync() {
    if (Constants.platform.ios) {
      const { status_camera } = await Permissions.askAsync(Permissions.CAMERA);
      const { status_camera_roll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status_camera_roll !== 'granted' || status_camera !== 'granted') {
        // console.warn('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  async _pickImage() {
    Keyboard.dismiss();
    ActionSheet.show(
      {
        options: Strings.newItem.actionButtons,
        cancelButtonIndex: Strings.newItem.cancelIndex,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          this.takeImage();
        } else if (buttonIndex === 1) {
          this.pickFromLibrary();
        }
      },
    );
  };

  async takeImage() {
    Keyboard.dismiss();
    let result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      this.state.images.push(result.uri);
      this.forceUpdate();
      this.props.onPicked(this.state.images);
    }
  };

  async pickFromLibrary() {
    Keyboard.dismiss();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      quality: 0.5,
      // aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.state.images.push(result.uri);
      this.forceUpdate();
      console.warn(result.uri);
      console.warn(JSON.stringify('images are: ' + this.state.images));
      this.props.onPicked(this.state.images);
    }
  };

  removeImage(key) {
    const { images } = this.state;
    Alert.alert(
      'Confirm',
      'Are you sure you want to remove selected photo?',
      [
        {
          text: 'Cancel',
          onPress: () => { },
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            images.splice(key, 1);
            this.forceUpdate();
            this.props.onPicked(this.state.images);
          },
        },
      ],
      { cancelable: false },
    );
  }

  render() {
    let {
      images,
    } = this.state;

    return (
      <View>
        <Item
          last
          style={styles.customItem}
        >
          <Label style={[styles.formLabel, { color: images.length > 0 ? '#000' : Colors.lightgrey }]}>Images</Label>
          <View style={styles.flexRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.iconTO}
              onPress={() => { this.pickFromLibrary() }}>
              <Icon type="Feather" style={styles.icon} name="image" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.iconTOEnd}
              onPress={() => { this.takeImage() }}>
              <Icon type="Feather" style={styles.icon} name="camera" />
            </TouchableOpacity>
          </View>
        </Item>
        <View style={styles.imagesConteiner}>
          {images.map((photo, key) => (
            <TouchableOpacity
              key={key}
              onPress={() => {
                this.setState([{
                  modalVisible: true
                }])
              }}
              activeOpacity={0.9}
              style={styles.imageView}
            >
              <Image style={styles.image} source={{ uri: this.props.isEdit ? 'http://crud.farukkaledibi.com/public/uploads/' + photo.file_name : photo }} />
              <TouchableOpacity
                style={styles.deleteImageView}
                onPress={() => {
                  this.removeImage(key);
                }}
                activeOpacity={0.9}
              >
                <Icon style={styles.deleteImageIcon} type="EvilIcons" name="close" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  }
}

const windowSize = Dimensions.get('window');

const styles = StyleSheet.create({
  customItem: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gum,
    height: 48,
    marginLeft: 0,
    marginRight: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formLabel: {
    fontSize: 15,
    fontFamily: 'montserrat-medium',
    marginLeft: 4,
  },
  iconTO: {
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginRight: 0,
    width: 48,
  },
  iconTOEnd: {
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginRight: 8,
    width: 48,
  },
  icon: {
    color: Colors.mainColor,
    fontSize: 24,
  },
  flexRow: {
    flexDirection: 'row',
  },
  imagesConteiner: {
    backgroundColor: Colors.itemGroupsOutside,
    paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageView: {
    backgroundColor: Colors.itemGroupsOutside,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: windowSize.width - 32,
    height: windowSize.width - 32,
    backgroundColor: Colors.white,
    marginTop: 4,
    marginRight: 10,
    marginBottom: 8,
    borderRadius: 4,
    borderColor: Colors.gum,
    borderWidth: 1,
  },
  deleteImageView: {
    width: windowSize.width / 12,
    height: windowSize.width / 12,
    borderRadius: windowSize.width / 6,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderColor: 'grey',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 12,
    top: 16,
  },
  deleteImageIcon: {
    fontSize: 22,
    color: Colors.white,
  },
});



