import React, {useState, useRef, useEffect} from 'react';
import { Button, StyleSheet, Text, View, ScrollView, Vibration, Alert,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { LinearGradient } from 'expo-linear-gradient';
import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Camera, CameraType, CameraScreen } from 'react-native-camera-kit';

const HomeScreen = ( navigation) =>{

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

  nfcRead = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      const parsed = tag.ndefMessage.map(decodeNdefRecord);
      console.log(parsed[0]);
      
      function decodeNdefRecord(record) {
        return Ndef.text.decodePayload(record.payload);
      }
      var text=parsed[0];
      console.log('tag: '+ text);
      var list = text.split('/');
      var warn = [];
      for (var item of list) {
        if (item == "") {
          continue;
        }
        var food = item.split('&')[0];
        var alles = item.split('&')[1].split(', ');
        for (var allergy of alles) {
          console.log(allergy);
          if (allergy=="??????" && this.state.egg==true) {
            warn.push("Egg is detected in the" + food)
          }
          if (allergy=="???" && this.state.mil==true) {
            warn.push("Wheat is detected in the" + food)
          }
          if (allergy=="??????" && this.state.milk==true) {
            warn.push("Milk is detected in the" + food)
          }
          if (allergy=="?????????" && this.state.chi==true) {
            warn.push("Chicken is detected in the" + food)
          }
          if (allergy=="?????????" && this.state.cow==true) {
            warn.push("Beef is detected in the" + food)
          }
          if (allergy=="??????" && this.state.sae==true) {
            warn.push("Shrimf is detected in the" + food)
          }
          if (allergy=="??????" && this.state.big==true) {
            warn.push("Soybean is detected in the" + food)
          }
          if (allergy=="????????????" && this.state.pig==true) {
            warn.push("Pork is detected in the" + food)
          }
          if (allergy=="?????????" && this.state.peach==true) {
            warn.push("Peach is detected in the" + food)
          }
          if (allergy=="?????????" && this.state.tomato==true) {
            warn.push("Tomato is detected in the" + food)
          }
          if (allergy=="???" && this.state.gae==true) {
            warn.push("Crab is detected in the" + food)
          }
          if (allergy=="?????????" && this.state.high==true) {
            warn.push("Mackerel is detected in the" + food)
          }
          if (allergy=="?????????" && this.state.jo==true) {
            warn.push("Shellfish is detected in the" + food)
          }
          if (allergy=="?????????" && this.state.squid==true) {
            warn.push("Squid is detected in the" + food)
          }
          if (allergy=="???" && this.state.jat==true) {
            warn.push("Pine nut is detected in the" + food)
          }
          if (allergy=="?????????" && this.state.wine==true) {
            warn.push("Sulfurous acid is detected in the" + food)
          }
          if (allergy=="??????" && this.state.brainnut==true) {
            warn.push("Walnut is detected in the" + food)
          }
          if (allergy=="??????" && this.state.memil==true) {
            warn.push("Buckwheat is detected in the" + food)
          }
          if (allergy=="??????" && this.state.nut==true) {
            warn.push("Peanut is detected in the" + food)
          }
        }
      }
      warn.sort();
      Alert.alert("Allergy Detection!",warn.join("\n"));
      Vibration.vibrate(400);
      } catch (ex) {
      this.setState({
          log: ex.toString()
      })
      NfcManager.cancelTechnologyRequest().catch(() => 0);
      }
  };
    return (
      <LinearGradient colors={['#FFA296', '#FFC7BF', '#FFD4CE']} style={styles.container}>
        <View style={styles.container}>
          <View style={styles.border}>
            <ScrollView style={styles.scrollw}>
              <BouncyCheckbox
                size={35}
                style={{ marginTop: 16 }}
                fillColor="pink"
                text="Egg"
                iconStyle={{ borderColor: "pink" }}
                textStyle={{
                  textDecorationLine: "none",
                  fontSize: 22
                }}
                onPress={() => {
                  this.state.egg = this.state.egg ? false : true;
                  console.log(this.state);
                }
                }
                isChecked = {this.state.egg}
              />
              <BouncyCheckbox
                size={35}
                style={{ marginTop: 16 }}
                fillColor="pink"
                text="Beef"
                iconStyle={{ borderColor: "pink" }}
                textStyle={{
                  textDecorationLine: "none",
                  fontSize: 22
                }}
                onPress={() => {
                  this.state.cow = this.state.cow ? false : true;
                }
                }
                isChecked = {this.state.cow}
              />
              <BouncyCheckbox
                size={35}
                style={{ marginTop: 16 }}
                fillColor="pink"
                text="Pork"
                iconStyle={{ borderColor: "pink" }}
                textStyle={{
                  textDecorationLine: "none",
                  fontSize: 22
                }}
                onPress={() => {
                  this.state.pig = this.state.pig ? false : true;
                }
                }
                isChecked = {this.state.pig}
              />
              <BouncyCheckbox
                size={35}
                style={{ marginTop: 16 }}
                fillColor="pink"
                text="Chicken"
                iconStyle={{ borderColor: "pink" }}
                textStyle={{
                  textDecorationLine: "none",
                  fontSize: 22
                }}
                onPress={() => {
                  this.state.chi = this.state.chi ? false : true;
                }
                }
                isChecked = {this.state.chi}
              />
              <BouncyCheckbox
                size={35}
                style={{ marginTop: 16 }}
                fillColor="pink"
                text="Shrimp"
                iconStyle={{ borderColor: "pink" }}
                textStyle={{
                  textDecorationLine: "none",
                  fontSize: 22
                }}
                onPress={() => {
                  this.state.sae = this.state.sae ? false : true;
                }
                }
                isChecked = {this.state.sae}
              />
              <BouncyCheckbox
                size={35}
                style={{ marginTop: 16 }}
                fillColor="pink"
                text="Crab"
                iconStyle={{ borderColor: "pink" }}
                textStyle={{
                  textDecorationLine: "none",
                  fontSize: 22
                }}
                onPress={() => {
                  this.state.gae = this.state.gae ? false : true;
                }
                }
                isChecked = {this.state.gae}
              />
              <BouncyCheckbox
                size={35}
                style={{ marginTop: 16 }}
                fillColor="pink"
                text="Squid"
                iconStyle={{ borderColor: "pink" }}
                textStyle={{
                  textDecorationLine: "none",
                  fontSize: 22
                }}
                onPress={() => {
                  this.state.squid = this.state.squid ? false : true;
                }
                }
                isChecked = {this.state.squid}
              />
              <BouncyCheckbox
                size={35}
                style={{ marginTop: 16 }}
                fillColor="pink"
                text="Mackerel"
                iconStyle={{ borderColor: "pink" }}
                textStyle={{
                  textDecorationLine: "none",
                  fontSize: 22
                }}
                onPress={() => {
                  this.state.high = this.state.high ? false : true;
                }
                }
                isChecked = {this.state.high}
              />
              <BouncyCheckbox
                size={35}
                style={{ marginTop: 16 }}
                fillColor="pink"
                text="Shellfish"
                iconStyle={{ borderColor: "pink" }}
                textStyle={{
                  textDecorationLine: "none",
                  fontSize: 22
                }}
                onPress={() => {
                  this.state.jo = this.state.jo ? false : true;
                }
                }
                isChecked = {this.state.jo}
              />
              <BouncyCheckbox
                size={35}
                style={{ marginTop: 16 }}
                fillColor="pink"
                text="Milk"
                iconStyle={{ borderColor: "pink" }}
                textStyle={{
                  textDecorationLine: "none",
                  fontSize: 22
                }}
                onPress={() => {
                  this.state.milk = this.state.milk ? false : true;
                }
                }
                isChecked = {this.state.milk}
              />
              <BouncyCheckbox
                size={35}
                style={{ marginTop: 16 }}
                fillColor="pink"
                text="Peanut"
                iconStyle={{ borderColor: "pink" }}
                textStyle={{
                  textDecorationLine: "none",
                  fontSize: 22
                }}
                onPress={() => {
                  this.state.nut = this.state.nut ? false : true;
                }
                }
                isChecked = {this.state.nut}
              />
              <BouncyCheckbox
                size={35}
                style={{ marginTop: 16 }}
                fillColor="pink"
                text="Walnut"
                iconStyle={{ borderColor: "pink" }}
                textStyle={{
                  textDecorationLine: "none",
                  fontSize: 22
                }}
                onPress={() => {
                  this.state.brainnut = this.state.brainnut ? false : true;
                }
                }
                isChecked = {this.state.brainnut}
              />
              <BouncyCheckbox
                size={35}
                style={{ marginTop: 16 }}
                fillColor="pink"
                text="Pine nut"
                iconStyle={{ borderColor: "pink" }}
                textStyle={{
                  textDecorationLine: "none",
                  fontSize: 22
                }}
                onPress={() => {
                  this.state.jat = this.state.jat ? false : true;
                }
                }
                isChecked = {this.state.jat}
              />
              <BouncyCheckbox
                size={35}
                style={{ marginTop: 16 }}
                fillColor="pink"
                text="Soybean"
                iconStyle={{ borderColor: "pink" }}
                textStyle={{
                  textDecorationLine: "none",
                  fontSize: 22
                }}
                onPress={() => {
                  this.state.big = this.state.big ? false : true;
                }
                }
                isChecked = {this.state.big}
              />
              <BouncyCheckbox
                size={35}
                style={{ marginTop: 16 }}
                fillColor="pink"
                text="Tomato"
                iconStyle={{ borderColor: "pink" }}
                textStyle={{
                  textDecorationLine: "none",
                  fontSize: 22
                }}
                onPress={() => {
                  this.state.tomato = this.state.tomato ? false : true;
                }
                }
                isChecked = {this.state.tomato}
              />
              <BouncyCheckbox
                size={35}
                style={{ marginTop: 16 }}
                fillColor="pink"
                text="Peach"
                iconStyle={{ borderColor: "pink" }}
                textStyle={{
                  textDecorationLine: "none",
                  fontSize: 22
                }}
                onPress={() => {
                  this.state.peach = this.state.peach ? false : true;
                }
                }
                isChecked = {this.state.peach}
              />
              <BouncyCheckbox
                size={35}
                style={{ marginTop: 16 }}
                fillColor="pink"
                text="Wheat"
                iconStyle={{ borderColor: "pink" }}
                textStyle={{
                  textDecorationLine: "none",
                  fontSize: 22
                }}
                onPress={() => {
                  this.state.mil = this.state.mil ? false : true;
                }
                }
                isChecked = {this.state.mil}
              />
              <BouncyCheckbox
                size={35}
                style={{ marginTop: 16 }}
                fillColor="pink"
                text="Buckwheat"
                iconStyle={{ borderColor: "pink" }}
                textStyle={{
                  textDecorationLine: "none",
                  fontSize: 22
                }}
                onPress={() => {
                  this.state.memil = this.state.memil ? false : true;
                }
                }
                isChecked = {this.state.memil}
              />
              <BouncyCheckbox
                size={35}
                style={{ marginTop: 16 }}
                fillColor="pink"
                text="Sulfurous acid"
                iconStyle={{ borderColor: "pink" }}
                textStyle={{
                  textDecorationLine: "none",
                  fontSize: 22
                }}
                onPress={() => {
                  this.state.wine = this.state.wine ? false : true;
                }
                }
                isChecked = {this.state.wine}
              />
            </ScrollView>
            <View style={styles.banner}>
              <Text style={{fontSize:19, fontWeight:'bold', color:'#FFEFEF'}}>{'\n'}Please enter your allergy information'</Text>
            </View>
          </View>
          <Button 
            title = 'QRcode'
            onPress={() =>
              navigation.navigate('QRcode', )
            }
          />     
        </View>       
      </LinearGradient> 
    )
};
  

const QRcodeScanner = (navigation) => {
  const [foodList, setFoodList] = useState([''])
  const [scaned, setScaned] = useState(true);

  const onBarCodeRead = (event) =>{ 
    if(!scaned) return;
    setScaned(false);
    Vibration.vibrate(400);
    Alert.alert("QR Code Recognition successful");
    navigation.navigate('Home')
  }

  return (
    <View>
      <CameraScreen
          // Barcode props
          scanBarcode={true}
          onReadCode={(event) => Alert.alert('QR code found')} // optional
          showFrame={true} 
          laserColor="red" 
          frameColor="white" 
        />
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions = {({}) => ({ headerShown: false })}>
        <Stack.Screen 
          name="Home" 
          component = {HomeScreen} 
          options = {{
            title : 'Home',
            headerStyle : {
              backgroundColor :'#ffffff',
            }
          }}
        />
        <Stack.Screen 
          name="QRcode" 
          component={QRcodeScanner}
          options = {{
            title : 'QRcode',
            headerStyle : {
              backgroundColor :'#ffffff',
            }
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems:'stretch',
    justifyContent: 'center',
  },
  border: {
    flex: 1,
    marginLeft: 10,
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#FFF6F4',
    shadowOpacity: 0.8,
    elevation: 20,
    shadowRadius: 15 ,
    shadowOffset : { width: 1, height: 13},
  },
  banner: {
    flexBasis:80,
    minHeight: 1,
    alignItems: 'center',
    backgroundColor: '#FF6666',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20
  },
  scrollw : {
    flexBasis: 1,
    marginTop:10,
    marginLeft: 20,
    marginBottom: 10
  },
  button : {
    backgroundColor: "#FF6666",
    borderRadius: 10,
    margin: 10,
    marginBottom: 5,
    height: 40,
    shadowOpacity: 0.8,
    elevation: 12,
    shadowRadius: 15 ,
    shadowOffset : { width: 1, height: 13},
  },
  text : {
    textAlign: 'center',
    fontSize: 24,
    color: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  scanner : {
    flex : 1
  }

});
 
export default App;