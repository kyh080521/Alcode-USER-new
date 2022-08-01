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
            <BouncyCheckbox
              size={35}
              style={{ marginTop: 16 }}
              fillColor="pink"
              text="소고기"
              iconStyle={{ borderColor: "pink" }}
              textStyle={{
                textDecorationLine: "none",
                fontSize: 22
              }}
              onPress={() => {
                if (this.state.cow==false) {
                  this.state.cow=true;
                }
                else {
                  this.state.cow=false;
                }
              }
              }
              isChecked = {this.state.cow}
            />
            <BouncyCheckbox
              size={35}
              style={{ marginTop: 16 }}
              fillColor="pink"
              text="돼지고기"
              iconStyle={{ borderColor: "pink" }}
              textStyle={{
                textDecorationLine: "none",
                fontSize: 22
              }}
              onPress={() => {
                if (this.state.pig==false) {
                  this.state.pig=true;
                }
                else {
                  this.state.pig=false;
                }
              }
              }
              isChecked = {this.state.pig}
            />
            <BouncyCheckbox
              size={35}
              style={{ marginTop: 16 }}
              fillColor="pink"
              text="닭고기"
              iconStyle={{ borderColor: "pink" }}
              textStyle={{
                textDecorationLine: "none",
                fontSize: 22
              }}
              onPress={() => {
                if (this.state.chi==false) {
                  this.state.chi=true;
                }
                else {
                  this.state.chi=false;
                }
              }
              }
              isChecked = {this.state.chi}
            />
            <BouncyCheckbox
              size={35}
              style={{ marginTop: 16 }}
              fillColor="pink"
              text="새우"
              iconStyle={{ borderColor: "pink" }}
              textStyle={{
                textDecorationLine: "none",
                fontSize: 22
              }}
              onPress={() => {
                if (this.state.sae==false) {
                  this.state.sae=true;
                }
                else {
                  this.state.sae=false;
                }
              }
              }
              isChecked = {this.state.sae}
            />
            <BouncyCheckbox
              size={35}
              style={{ marginTop: 16 }}
              fillColor="pink"
              text="게"
              iconStyle={{ borderColor: "pink" }}
              textStyle={{
                textDecorationLine: "none",
                fontSize: 22
              }}
              onPress={() => {
                if (this.state.gae==false) {
                  this.state.gae=true;
                }
                else {
                  this.state.gae=false;
                }
              }
              }
              isChecked = {this.state.gae}
            />
            <BouncyCheckbox
              size={35}
              style={{ marginTop: 16 }}
              fillColor="pink"
              text="오징어"
              iconStyle={{ borderColor: "pink" }}
              textStyle={{
                textDecorationLine: "none",
                fontSize: 22
              }}
              onPress={() => {
                if (this.state.squid==false) {
                  this.state.squid=true;
                }
                else {
                  this.state.squid=false;
                }
              }
              }
              isChecked = {this.state.squid}
            />
            <BouncyCheckbox
              size={35}
              style={{ marginTop: 16 }}
              fillColor="pink"
              text="고등어"
              iconStyle={{ borderColor: "pink" }}
              textStyle={{
                textDecorationLine: "none",
                fontSize: 22
              }}
              onPress={() => {
                if (this.state.high==false) {
                  this.state.high=true;
                }
                else {
                  this.state.high=false;
                }
              }
              }
              isChecked = {this.state.high}
            />
            <BouncyCheckbox
              size={35}
              style={{ marginTop: 16 }}
              fillColor="pink"
              text="조개류"
              iconStyle={{ borderColor: "pink" }}
              textStyle={{
                textDecorationLine: "none",
                fontSize: 22
              }}
              onPress={() => {
                if (this.state.jo==false) {
                  this.state.jo=true;
                }
                else {
                  this.state.jo=false;
                }
              }
              }
              isChecked = {this.state.jo}
            />
            <BouncyCheckbox
              size={35}
              style={{ marginTop: 16 }}
              fillColor="pink"
              text="우유"
              iconStyle={{ borderColor: "pink" }}
              textStyle={{
                textDecorationLine: "none",
                fontSize: 22
              }}
              onPress={() => {
                if (this.state.milk==false) {
                  this.state.milk=true;
                }
                else {
                  this.state.milk=false;
                }
              }
              }
              isChecked = {this.state.milk}
            />
            <BouncyCheckbox
              size={35}
              style={{ marginTop: 16 }}
              fillColor="pink"
              text="땅콩"
              iconStyle={{ borderColor: "pink" }}
              textStyle={{
                textDecorationLine: "none",
                fontSize: 22
              }}
              onPress={() => {
                if (this.state.nut==false) {
                  this.state.nut=true;
                }
                else {
                  this.state.nut=false;
                }
              }
              }
              isChecked = {this.state.nut}
            />
            <BouncyCheckbox
              size={35}
              style={{ marginTop: 16 }}
              fillColor="pink"
              text="호두"
              iconStyle={{ borderColor: "pink" }}
              textStyle={{
                textDecorationLine: "none",
                fontSize: 22
              }}
              onPress={() => {
                if (this.state.brainnut==false) {
                  this.state.brainnut=true;
                }
                else {
                  this.state.brainnut=false;
                }
              }
              }
              isChecked = {this.state.brainnut}
            />
            <BouncyCheckbox
              size={35}
              style={{ marginTop: 16 }}
              fillColor="pink"
              text="잣"
              iconStyle={{ borderColor: "pink" }}
              textStyle={{
                textDecorationLine: "none",
                fontSize: 22
              }}
              onPress={() => {
                if (this.state.jat==false) {
                  this.state.jat=true;
                }
                else {
                  this.state.jat=false;
                }
              }
              }
              isChecked = {this.state.jat}
            />
            <BouncyCheckbox
              size={35}
              style={{ marginTop: 16 }}
              fillColor="pink"
              text="대두"
              iconStyle={{ borderColor: "pink" }}
              textStyle={{
                textDecorationLine: "none",
                fontSize: 22
              }}
              onPress={() => {
                if (this.state.big==false) {
                  this.state.big=true;
                }
                else {
                  this.state.big=false;
                }
              }
              }
              isChecked = {this.state.big}
            />
            <BouncyCheckbox
              size={35}
              style={{ marginTop: 16 }}
              fillColor="pink"
              text="토마토"
              iconStyle={{ borderColor: "pink" }}
              textStyle={{
                textDecorationLine: "none",
                fontSize: 22
              }}
              onPress={() => {
                if (this.state.tomato==false) {
                  this.state.tomato=true;
                }
                else {
                  this.state.tomato=false;
                }
              }
              }
              isChecked = {this.state.tomato}
            />
            <BouncyCheckbox
              size={35}
              style={{ marginTop: 16 }}
              fillColor="pink"
              text="복숭아"
              iconStyle={{ borderColor: "pink" }}
              textStyle={{
                textDecorationLine: "none",
                fontSize: 22
              }}
              onPress={() => {
                if (this.state.peach==false) {
                  this.state.peach=true;
                }
                else {
                  this.state.peach=false;
                }
              }
              }
              isChecked = {this.state.peach}
            />
            <BouncyCheckbox
              size={35}
              style={{ marginTop: 16 }}
              fillColor="pink"
              text="밀"
              iconStyle={{ borderColor: "pink" }}
              textStyle={{
                textDecorationLine: "none",
                fontSize: 22
              }}
              onPress={() => {
                if (this.state.mil==false) {
                  this.state.mil=true;
                }
                else {
                  this.state.mil=false;
                }
              }
              }
              isChecked = {this.state.mil}
            />
            <BouncyCheckbox
              size={35}
              style={{ marginTop: 16 }}
              fillColor="pink"
              text="메밀"
              iconStyle={{ borderColor: "pink" }}
              textStyle={{
                textDecorationLine: "none",
                fontSize: 22
              }}
              onPress={() => {
                if (this.state.memil==false) {
                  this.state.memil=true;
                }
                else {
                  this.state.memil=false;
                }
              }
              }
              isChecked = {this.state.memil}
            />
            <BouncyCheckbox
              size={35}
              style={{ marginTop: 16 }}
              fillColor="pink"
              text="아황산류"
              iconStyle={{ borderColor: "pink" }}
              textStyle={{
                textDecorationLine: "none",
                fontSize: 22
              }}
              onPress={() => {
                if (this.state.wine==false) {
                  this.state.wine=true;
                }
                else {
                  this.state.wine=false;
                }
              }
              }
              isChecked = {this.state.wine}
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
