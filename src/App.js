import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { render } from 'react-dom';
import { LinearGradient } from 'expo-linear-gradient';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';


export default class App extends React.Component {
  
  state = {
    "egg" : false,
    "cow" : false,
    "pig" : false,
    "chi" : false,
    "sae" : false,
    "gae" : false,
    "squid" : false,
    "high" : false,
    "jo" : false,
    "milk" : false,
    "nut" : false,
    "brainnut" : false,
    "jat" : false,
    "big" : false,
    "tomato" : false,
    "peach" : false,
    "mil" : false,
    "memil" : false,
    "wine" : false
  }
  
  saveItem = async () => {
    await AsyncStorage.setItem('@app:state',JSON.stringify(this.state));
  }
  getItem = async () => {
    await AsyncStorage.getItem('@app:state').then((state)=> {
      /*console.log('------')
      console.log(this.state);
      console.log(JSON.parse(state))*/
      let tempObj = Object.assign({}, JSON.parse(state))
      this.setState(tempObj)
      console.log(this.state)
    });
  }

  render() {
    return (
      <LinearGradient colors={['#FFA296', '#FFC7BF', '#FFD4CE']} style={styles.container}>
          <View style={styles.border}>
            <Button
              title="NFC"
              color="#FF6666"
              onPress={this.NFC}
            />
            <ScrollView style={styles.scrollw}>
            <BouncyCheckbox
              size={35}
              style={{ marginTop: 16 }}
              fillColor="pink"
              text="난류"
              iconStyle={{ borderColor: "pink" }}
              textStyle={{
                textDecorationLine: "none",
                fontSize: 22
              }}
              onPress={() => {
                if (this.state.egg==false) {
                  this.state.egg=true;
                }
                else {
                  this.state.egg=false;
                }
                console.log(this.state);
              }
              }
              isChecked = {this.state.egg}
            />
            </ScrollView>
            <View style={styles.banner}>
            <Text style={{fontSize:19, fontWeight:'bold', color:'#FFEFEF'}}>{"\n"}당신의 알레르기 정보를 입력하여 주세요.</Text>
          </View>
        </View>
        
      </LinearGradient> 
    );
  };

  /*componentDidMount() {
    console.log('1')
    NfcManager.start();
    NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      console.warn('tag', tag);
      NfcManager.setAlertMessageIOS('I got your tag!');
      NfcManager.unregisterTagEvent().catch(() => 0);
    });
  }

  componentWillUnmount() {
    console.log('2')
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.unregisterTagEvent().catch(() => 0);
  }*/

  async NFC() {
    console.log('nfc start');
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      let parsed = null;
      console.log(tag.ndefMessage);
      if (tag.ndefMessage) {
          const ndefRecords = tag.ndefMessage;

          function decodeNdefRecord(record) {
              if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
                  return ['text', Ndef.text.decodePayload(record.payload)];
              } else if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
                  return ['uri', Ndef.uri.decodePayload(record.payload)];
              }

              return ['unknown', '---']
          }

          parsed = ndefRecords.map(decodeNdefRecord);
          console.warn('data found', parsed);
      }
      else {
        console.warn('none data..');
      }
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  }

}
 




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD2CC',
    alignItems:'stretch',
    justifyContent: 'center',
  },
  border: {
    flex: 1,
    margin: 15,
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: '#FFEAE2',
  },
  banner: {
    flexBasis:80,
    minHeight: 1,
    alignItems: 'center',
    backgroundColor: '#FFA99E',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20
  },
  scrollw : {
    flexBasis: 1,
    marginTop:10,
    marginLeft: 20,
    marginBottom: 10
  },
});
