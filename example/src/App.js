/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  StatusBar,
  Text,
  Switch,
  View
} from 'react-native';
import {
  ActionSheet,
  Button,
  DatePicker,
  Device,
  Dialog,
  Input,
  KeyboardSpacer,
  Navigation,
  PageControl,
  Permissions,
  Screen,
  ScrollView,
  Segment,
  StaticList,
  TabView,
  TextField,
  TimerText,
  Toast,
} from '@progdesigner/react-native-uikit';
import Moment from 'moment';

let screenSize = Screen.size();
let timestamp = parseInt(Moment.utc().format('x'));

export default class App extends Component<{}> {

  constructor(props) {
    super(props);

    this.state = {
      selectedRadio: '0',
      currentPage: 0,
      tabPage: 0,
      segmentPage: 0,
      isOn:false,
      permissions: {},
    };
  }

  componentWillMount() {
    let checkPermissions = async () => {
      let permissions = await Permissions.checkMultiple([
        'backgroundRefresh',
      	'bluetooth',
      	'camera',
      	'contacts',
      	'event',
      	'location',
      	'microphone',
      	'notification',
      	'photo',
      	'reminder',
      	'speechRecognition',
      ]);

      console.log( "permissions", permissions );

      this.setState({
        permissions: permissions
      });
    };

    checkPermissions();
  }

  render() {

    return (

      <View style={styles.container}>

        <StatusBar backgroundColor='#1a1a1a' barStyle='light-content' translucent={true} />

        <Navigation title={'UIKit'} />

        <ScrollView style={styles.scroll} getTextInputRefs={this.getTextInputRefs.bind(this)} >

          <TabView styles={tabStyles} barWidth={4} barColor={'#C43E3D'} onItemSelected={this.onTabItemSelected.bind(this)}>
            <TabView.Item><Text style={[tabStyles.itemText, this.state.tabPage === 0 && tabStyles.itemTextActived]}>{'Waiting'}</Text></TabView.Item>
            <TabView.Item><Text style={[tabStyles.itemText, this.state.tabPage === 1 && tabStyles.itemTextActived]}>{'History'}</Text></TabView.Item>
          </TabView>
          
          <View style={styles.content}>
              <View style={styles.item}>
                <Input style={styles.textInput} ref={ref => this.textInput=ref} type="text" defaultValue='sample' placeholder='Max character 10' labelBefore={true} label={'Label #3'} />
              </View>

              <View style={styles.item}>
                <Input style={styles.textInput} ref={ref => this.textBox=ref} type="text" defaultValue='' placeholder='Max character 10' multiline={true} allowSpace={true} hideLabel={true} />
              </View>
          </View>

          <StaticList onSelectItem={this.onSelectListItem.bind(this)} style={styles.listView}>

            <StaticList.Section>
              <StaticList.Item tag="switch" selectable={false} >
                  <View style={styles.listItemView}>
                      <Text style={styles.listItemText}>{'Switch'}</Text>
                  </View>
                  <Switch ref={ref=>this._pushSwicth = ref} style={{marginBottom: 0, marginRight: 10}} onChange={this.onValueChangeSwitch.bind(this)} value={this.state.isOn} />
              </StaticList.Item>

              <StaticList.Item tag="selectable">
                  <View style={styles.listItemView}>
                      <Text style={styles.listItemText}>{'Selectable'}</Text>
                  </View>
              </StaticList.Item>
            </StaticList.Section>

            <StaticList.Section>
              <StaticList.Item tag="permission.openSettings">
                  <View style={styles.listItemView}>
                      <Text style={styles.listItemText}>{'OpenSettings'}</Text>
                  </View>
                  <Text style={styles.listItemText}>{'Open'}</Text>
              </StaticList.Item>

              <StaticList.Item tag="permission.backgroundRefresh">
                  <View style={styles.listItemView}>
                      <Text style={styles.listItemText}>{'BackgroundRefresh'}</Text>
                  </View>
                  <Text style={styles.listItemText}>{this.state.permissions.backgroundRefresh}</Text>
              </StaticList.Item>

              <StaticList.Item tag="permission.bluetooth">
                  <View style={styles.listItemView}>
                      <Text style={styles.listItemText}>{'Bluetooth'}</Text>
                  </View>
                  <Text style={styles.listItemText}>{this.state.permissions.bluetooth}</Text>
              </StaticList.Item>

              <StaticList.Item tag="permission.camera">
                  <View style={styles.listItemView}>
                      <Text style={styles.listItemText}>{'Camera'}</Text>
                  </View>
                  <Text style={styles.listItemText}>{this.state.permissions.camera}</Text>
              </StaticList.Item>

              <StaticList.Item tag="permission.contacts">
                  <View style={styles.listItemView}>
                      <Text style={styles.listItemText}>{'Contacts'}</Text>
                  </View>
                  <Text style={styles.listItemText}>{this.state.permissions.contacts}</Text>
              </StaticList.Item>

              <StaticList.Item tag="permission.event">
                  <View style={styles.listItemView}>
                      <Text style={styles.listItemText}>{'Event'}</Text>
                  </View>
                  <Text style={styles.listItemText}>{this.state.permissions.event}</Text>
              </StaticList.Item>

              <StaticList.Item tag="permission.location">
                  <View style={styles.listItemView}>
                      <Text style={styles.listItemText}>{'Location'}</Text>
                  </View>
                  <Text style={styles.listItemText}>{this.state.permissions.location}</Text>
              </StaticList.Item>

              <StaticList.Item tag="permission.microphone">
                  <View style={styles.listItemView}>
                      <Text style={styles.listItemText}>{'Microphone'}</Text>
                  </View>
                  <Text style={styles.listItemText}>{this.state.permissions.microphone}</Text>
              </StaticList.Item>

              <StaticList.Item tag="permission.notification">
                  <View style={styles.listItemView}>
                      <Text style={styles.listItemText}>{'Notification'}</Text>
                  </View>
                  <Text style={styles.listItemText}>{this.state.permissions.notification}</Text>
              </StaticList.Item>

              <StaticList.Item tag="permission.photo">
                  <View style={styles.listItemView}>
                      <Text style={styles.listItemText}>{'Photo'}</Text>
                  </View>
                  <Text style={styles.listItemText}>{this.state.permissions.photo}</Text>
              </StaticList.Item>

              <StaticList.Item tag="permission.reminder">
                  <View style={styles.listItemView}>
                      <Text style={styles.listItemText}>{'Reminder'}</Text>
                  </View>
                  <Text style={styles.listItemText}>{this.state.permissions.reminder}</Text>
              </StaticList.Item>

              <StaticList.Item tag="permission.speechRecognition">
                  <View style={styles.listItemView}>
                      <Text style={styles.listItemText}>{'SpeechRecognition'}</Text>
                  </View>
                  <Text style={styles.listItemText}>{this.state.permissions.speechRecognition}</Text>
              </StaticList.Item>
            </StaticList.Section>

            <StaticList.Section selectable={false}>
              <StaticList.Item tag="device.getUniqueID" selectable={false}>
                <View style={styles.listItemView}>
                  <Text style={styles.listItemLabel}>Unique ID</Text>
                  <Text style={styles.listItemText}>{Device.getUniqueID()}</Text>
                </View>
              </StaticList.Item>

              <StaticList.Item tag="device.getDeviceID">
                <View style={styles.listItemView}>
                  <Text style={styles.listItemLabel}>Device ID</Text>
                  <Text style={styles.listItemText}>{Device.getDeviceID()}</Text>
                </View>
              </StaticList.Item>

              <StaticList.Item tag="device.getManufacturer">
                <View style={styles.listItemView}>
                  <Text style={styles.listItemLabel}>Manufacturer</Text>
                  <Text style={styles.listItemText}>{Device.getManufacturer()}</Text>
                </View>
              </StaticList.Item>

              <StaticList.Item tag="device.getModel">
                <View style={styles.listItemView}>
                  <Text style={styles.listItemLabel}>Model</Text>
                  <Text style={styles.listItemText}>{Device.getModel()}</Text>
                </View>
              </StaticList.Item>

              <StaticList.Item tag="device.getBrand">
                <View style={styles.listItemView}>
                  <Text style={styles.listItemLabel}>Brand</Text>
                  <Text style={styles.listItemText}>{Device.getBrand()}</Text>
                </View>
              </StaticList.Item>

              <StaticList.Item tag="device.getSystemName">
                <View style={styles.listItemView}>
                  <Text style={styles.listItemLabel}>SystemName</Text>
                  <Text style={styles.listItemText}>{Device.getSystemName()}</Text>
                </View>
              </StaticList.Item>

              <StaticList.Item tag="device.getSystemVersion">
                <View style={styles.listItemView}>
                  <Text style={styles.listItemLabel}>SystemVersion</Text>
                  <Text style={styles.listItemText}>{Device.getSystemVersion()}</Text>
                </View>
              </StaticList.Item>

              <StaticList.Item tag="device.getAndroidSDKVersion">
                <View style={styles.listItemView}>
                  <Text style={styles.listItemLabel}>Android SDK Version</Text>
                  <Text style={styles.listItemText}>{Device.getAndroidSDKVersion()}</Text>
                </View>
              </StaticList.Item>

              <StaticList.Item tag="device.getBundleID">
                <View style={styles.listItemView}>
                  <Text style={styles.listItemLabel}>BundleID</Text>
                  <Text style={styles.listItemText}>{Device.getBundleID()}</Text>
                </View>
              </StaticList.Item>

              <StaticList.Item tag="device.getBuildNumber">
                <View style={styles.listItemView}>
                  <Text style={styles.listItemLabel}>BuildNumber</Text>
                  <Text style={styles.listItemText}>{Device.getBuildNumber()}</Text>
                </View>
              </StaticList.Item>

              <StaticList.Item tag="device.getVersion">
                <View style={styles.listItemView}>
                  <Text style={styles.listItemLabel}>Version</Text>
                  <Text style={styles.listItemText}>{Device.getVersion()}</Text>
                </View>
              </StaticList.Item>

              <StaticList.Item tag="device.getReadableVersion">
                <View style={styles.listItemView}>
                  <Text style={styles.listItemLabel}>ReadableVersion</Text>
                  <Text style={styles.listItemText}>{Device.getReadableVersion()}</Text>
                </View>
              </StaticList.Item>

              <StaticList.Item tag="device.getDisplayName">
                <View style={styles.listItemView}>
                  <Text style={styles.listItemLabel}>DisplayName</Text>
                  <Text style={styles.listItemText}>{Device.getDisplayName()}</Text>
                </View>
              </StaticList.Item>

              <StaticList.Item tag="device.getDeviceName">
                <View style={styles.listItemView}>
                  <Text style={styles.listItemLabel}>DeviceName</Text>
                  <Text style={styles.listItemText}>{Device.getDeviceName()}</Text>
                </View>
              </StaticList.Item>

              <StaticList.Item tag="device.getDeviceLocale">
                <View style={styles.listItemView}>
                  <Text style={styles.listItemLabel}>DeviceLocale</Text>
                  <Text style={styles.listItemText}>{Device.getDeviceLocale()}</Text>
                </View>
              </StaticList.Item>

              <StaticList.Item tag="device.getLanguage">
                <View style={styles.listItemView}>
                  <Text style={styles.listItemLabel}>Language</Text>
                  <Text style={styles.listItemText}>{Device.getLanguage()}</Text>
                </View>
              </StaticList.Item>

              <StaticList.Item tag="device.getDeviceCountry">
                <View style={styles.listItemView}>
                  <Text style={styles.listItemLabel}>DeviceCountry</Text>
                  <Text style={styles.listItemText}>{Device.getDeviceCountry()}</Text>
                </View>
              </StaticList.Item>

              <StaticList.Item tag="device.getTimezone">
                <View style={styles.listItemView}>
                  <Text style={styles.listItemLabel}>Timezone</Text>
                  <Text style={styles.listItemText}>{Device.getTimezone()}</Text>
                </View>
              </StaticList.Item>

              <StaticList.Item tag="device.isEmulator">
                <View style={styles.listItemView}>
                  <Text style={styles.listItemLabel}>isEmulator</Text>
                  <Text style={styles.listItemText}>{Device.isEmulator() ? 'true' : 'false'}</Text>
                </View>
              </StaticList.Item>

              <StaticList.Item tag="device.isTablet">
                <View style={styles.listItemView}>
                  <Text style={styles.listItemLabel}>isTablet</Text>
                  <Text style={styles.listItemText}>{Device.isTablet() ? 'true' : 'false'}</Text>
                </View>
              </StaticList.Item>
            </StaticList.Section>
          </StaticList>

          <View style={styles.content}>

            <View style={styles.item}>
              <TimerText time={timestamp} reverse={false} enabled={true} />
            </View>

            <View style={styles.item}>
              <Button style={styles.button} onPress={this.onClickActionSheet.bind(this)}><Text>ActionSheet</Text></Button>
            </View>

            <View style={styles.item}>
              <Button style={styles.button} onPress={this.onClickDialog.bind(this)}><Text>Dialog</Text></Button>
            </View>

            <View style={styles.item}>
              <Button style={styles.button} onPress={this.onClickToast.bind(this)}><Text>Toast</Text></Button>
            </View>

            <DatePicker ref={ref => this.datePicker=ref} style={styles.datePicker} currentDate={'1990-01-01'} endDate={'2000-12-31'} onSelectDate={this.onSelectDate.bind(this)} />

            <View style={styles.item}>
              <View style={{flex:1}}>
                <Input style={styles.checkbox} tag='1' type='checkbox' labelBefore={false} label={'Label'} onChange={this.onChangeCheckBox.bind(this)}/>
                <Input style={styles.checkbox} tag='2' type='checkbox' labelBefore={false} label={'Label'} onChange={this.onChangeCheckBox.bind(this)}/>
                <Input style={styles.checkbox} tag='3' type='checkbox' labelBefore={false} label={'Label'} onChange={this.onChangeCheckBox.bind(this)}/>
              </View>

              <View style={{flex:1}}>
                <Input style={styles.radio} tag='1' type='radio' checked={this.state.selectedRadio === '1'} labelBefore={false} label={'Label #1'} onChange={this.onChangeRadio.bind(this)}/>
                <Input style={styles.radio} tag='2' type='radio' checked={this.state.selectedRadio === '2'} labelBefore={false} label={'Label #2'} onChange={this.onChangeRadio.bind(this)}/>
                <Input style={styles.radio} tag='3' type='radio' checked={this.state.selectedRadio === '3'} labelBefore={false} label={'Label #3'} onChange={this.onChangeRadio.bind(this)}/>
              </View>
            </View>

            <View style={styles.item}>
              <TextField style={styles.textField} ref={ref => this.textField=ref} defaultValue='' placeholder='Input' />
            </View>

            <View style={styles.item}>
              <PageControl numberOfPages={3} currentPage={this.state.currentPage} activeColor='#C43E3D' style={styles.pageControl} />
            </View>

            <View style={styles.item}>
              <Segment style={styles.segmentView} defaultPage={this.state.segmentPage} activeStyle={styles.segmentItemActived} onItemSelected={ this.onSegmentItemSelected.bind(this) }>
                  <Segment.Item style={styles.segmentItem}><Text style={(this.state.segmentPage === 0?styles.segmentItemActivedText:styles.segmentItemText)}>{'P1'}</Text></Segment.Item>
                  <Segment.Item style={styles.segmentItem}><Text style={(this.state.segmentPage === 1?styles.segmentItemActivedText:styles.segmentItemText)}>{'P2'}</Text></Segment.Item>
                  <Segment.Item style={styles.segmentItem}><Text style={(this.state.segmentPage === 2?styles.segmentItemActivedText:styles.segmentItemText)}>{'P3'}</Text></Segment.Item>
              </Segment>
            </View>

          </View>
        </ScrollView>
      </View>
    );
  }

  getTextInputRefs( ) {
    return [this.textInput, this.textBox];
  }

  onClickActionSheet(e) {

    var actions = [
        {title:'Item #1', callback: () => {

        }},
        {title:'Item #2', callback: () => {

        }},
        {title:'Cancel', type:'cancel'}
    ];

    ActionSheet.show({
        title: '',
        message: '',
        actions: actions,
        onPress: (index) => {

        }
    });
  }

  onSelectDate( date ) {
    console.log( date );
  }

  onClickDialog(e) {

    var actions = [
        {title:'Confirm', callback: () => {

        }},
        {title:'Cancel', type:'cancel'}
    ];

    Dialog.show({
        title: 'Notice',
        message: 'Execute??',
        actions: actions,
        onPress: (index) => {

        }
    });
  }

  onClickToast(e) {
    Toast.show('Wow~!!!!', {position:Toast.positions.CENTER});
  }

  onChangeCheckBox(e) {
    console.log( e.props.tag );
  }

  onChangeRadio(e) {
    this.setState({
      selectedRadio: e.props.tag,
    });
  }

  onSegmentItemSelected(segmentIndex) {

    this.setState({
      segmentPage: segmentIndex,
    });
  }

  onSelectListItem(e) {

    if (e.props.tag.indexOf('permission.') !== -1) {
      let permissionComponents = e.props.tag.split('.');
      let permission = permissionComponents[1];
      let typeOptions = undefined;

      if (permission === 'openSettings') {
        Permissions.openSettings();
        return;
      }

      if (this.state.permissions[permission] === 'denied') {
        Dialog.show({
            title: 'Permission Denied',
            message: '“' + Device.getDisplayName() + '” Would Like to Access ' + permission + ' usage?',
            actions: [
                {title:'Not Now', type:'cancel', callback: () => {

                }},
                {title:'Open Settings', callback: () => {
                    Permissions.openSettings();
                }}
            ],
        });
        return;
      }

      if (permission === 'notification') {
        typeOptions = ['alert','badge','sound'];
      }

      let messageOptions = {};
      messageOptions.title = '\"' + Device.getDisplayName() + '\" Would Like to Access the' + permission;
      messageOptions.message = 'This app requires access to the ' + permission;

      Permissions.request(permission, typeOptions, messageOptions)
        .then((status) => {
          let permissions = this.state.permissions;
          permissions[permission] = status;
          this.setState({
            permissions: permissions,
          });
        });
    }
  }

  onValueChangeSwitch(e) {
    let isOn = !this.state.isOn;

    this.setState({
      isOn: isOn
    });
  }

  onTabItemSelected( tabIndex ) {

    this.setState({
      tabPage: tabIndex,
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#F4F4F4'
  },
  scroll: {
    width: screenSize.width,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginTop: 20,
  },
  item: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 8,
    marginHorizontal: 10,
  },

  button: {
    flex: 1,
  },
  datePicker: {

  },
  checkbox: {

  },
  radio: {

  },
  textInput: {
    flex: 1,
    height: 60,
    borderWidth: 1,
    borderColor: '#000',
    marginHorizontal: 10,
  },
  textField: {
    flex: 1,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    marginHorizontal: 10,
  },
  pageControl: {

  },
  segmentView: {
    width: '100%',
    height: 60,
    marginTop: 32,
    borderColor: '#1A1A1A',
    backgroundColor: '#EAEAEA',
  },
  segmentItem: {
    borderColor: '#1A1A1A',
  },
  segmentItemActived: {
    backgroundColor: '#1A1A1A',
  },
  segmentItemText: {
    color:'#292929',
    fontSize: 12 * (screenSize.width / 375),
    textAlign: 'center',
  },
  segmentItemActivedText: {
    fontSize: 12 * (screenSize.width / 375),
    fontWeight: 'bold',
    color:'#fff',
    textAlign: 'center',
  },
  listView: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    width: '100%'
  },
  listItemView: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemLabel: {
    width: 100,
    fontSize: 11,
  },
  listItemText: {
    flex: 1,
  },
  listItemRightText: {
    flex: 1,
    textAlign:'right',
  },
});

const tabStyles = StyleSheet.create({

  wrapper: {
    width: '100%',
    height: 50,
  },
  container: {
    width: '100%', height: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 10,
    backgroundColor: '#fff'
  },
  line: {
    zIndex: 11,
  },
  item: {
    flex: 1,
    borderBottomWidth: 4,
    borderBottomColor: '#E5E5E5',
  },
  itemText: {
    color: '#ccc',
  },
  itemTextActived: {
    color: '#1a1a1a',
  },
});
