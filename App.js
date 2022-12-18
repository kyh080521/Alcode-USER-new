import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Vibration, Alert, TouchableOpacity, FlatList, Button } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen( {navigation} ){
  const [foodList, setFoodList] = useState(['ii']);

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
      Alert.alert("NFC 리딩중...");
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
        setFoodList([...foodList, food]);
        var alles = item.split('&')[1].split(', ');
        for (var allergy of alles) {
          console.log(allergy);
          if (allergy=="계란" && this.state.egg==true) {
            warn.push("계란이 "+food+"에서 검출되었어요!")
          }
          if (allergy=="밀" && this.state.mil==true) {
            warn.push("밀이 "+food+"에서 검출되었어요!")
          }
          if (allergy=="우유" && this.state.milk==true) {
            warn.push("우유가 "+food+"에서 검출되었어요!")
          }
          if (allergy=="닭고기" && this.state.chi==true) {
            warn.push("닭고기가 "+food+"에서 검출되었어요!")
          }
          if (allergy=="쇠고기" && this.state.cow==true) {
            warn.push("쇠고기가 "+food+"에서 검출되었어요!")
          }
          if (allergy=="새우" && this.state.sae==true) {
            warn.push("새우가 "+food+"에서 검출되었어요!")
          }
          if (allergy=="대두" && this.state.big==true) {
            warn.push("대두가 "+food+"에서 검출되었어요!")
          }
          if (allergy=="돼지고기" && this.state.pig==true) {
            warn.push("돼지고기가 "+food+"에서 검출되었어요!")
          }
          if (allergy=="복숭아" && this.state.peach==true) {
            warn.push("복숭아가 "+food+"에서 검출되었어요!")
          }
          if (allergy=="토마토" && this.state.tomato==true) {
            warn.push("토마토가 "+food+"에서 검출되었어요!")
          }
          if (allergy=="게" && this.state.gae==true) {
            warn.push("게가 "+food+"에서 검출되었어요!")
          }
          if (allergy=="고등어" && this.state.high==true) {
            warn.push("고등어가 "+food+"에서 검출되었어요!")
          }
          if (allergy=="조개류" && this.state.jo==true) {
            warn.push("조개류 "+food+"에서 검출되었어요!")
          }
          if (allergy=="오징어" && this.state.squid==true) {
            warn.push("오징어가 "+food+"에서 검출되었어요!")
          }
          if (allergy=="잣" && this.state.jat==true) {
            warn.push("잣이 "+food+"에서 검출되었어요!")
          }
          if (allergy=="아황산" && this.state.wine==true) {
            warn.push("아황산류가 "+food+"에서 검출되었어요!")
          }
          if (allergy=="호두" && this.state.brainnut==true) {
            warn.push("호두가 "+food+"에서 검출되었어요!")
          }
          if (allergy=="메밀" && this.state.memil==true) {
            warn.push("메밀이 "+food+"에서 검출되었어요!")
          }
          if (allergy=="땅콩" && this.state.nut==true) {
            warn.push("땅콩이 "+food+"에서 검출되었어요!")
          }
        }
      }
      warn.sort();
      if(warn.length==0) {
        Alert.alert("알레르기 식품이 없습니다! :)");
      }
      else {
        Alert.alert("알레르기 검출!",warn.join("\n\n"));
      }
      Vibration.vibrate(400);
      NfcManager.cancelTechnologyRequest().catch(() => 0);
  } catch (ex) {
      this.setState({
          log: ex.toString()
      })
      
    }
  }
  return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.button}
                 onPress={() => {
                  this.nfcRead();
                }}>
                  <Text style={styles.text}>NFC</Text>
          </TouchableOpacity>
          <View style={styles.border}>
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
                text="소고기"
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
                text="돼지고기"
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
                text="닭고기"
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
                text="새우"
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
                text="게"
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
                text="오징어"
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
                text="고등어"
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
                text="조개류"
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
                text="우유"
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
                text="땅콩"
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
                text="호두"
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
                text="잣"
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
                text="대두"
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
                text="토마토"
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
                text="복숭아"
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
                text="밀"
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
                text="메밀"
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
                text="아황산류"
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
              <Text style={{fontSize:19, fontWeight:'bold', color:'#FFEFEF'}}>{"\n"}당신의 알레르기 정보를 입력하여 주세요.</Text>
            </View>
          </View>
          <Button 
            title = '식품 리스트'
            onPress={() =>
              navigation.navigate('Details', {food: {foodList}})
            }
          />     
      </View>
  );
}

function DetailsScreen( {route, navigation} ) {
  const { food } = route.params;

  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{JSON.stringify(food)}</Text>
        <Button title = 'Home' onPress = {() => {navigation.navigate('Home')}} />
      </View>
  );
}

const Screen = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Screen.Navigator>
        <Screen.Screen 
          name="Home" 
          component={HomeScreen} 
          options = {{
            title : 'Home',
            headerStyle : {
              backgroundColor :'#ffffff',
            }
          }}
        />
        <Screen.Screen 
          name="Details" 
          component={DetailsScreen}
          options = {{
            title : 'Food List',
            headerStyle : {
              backgroundColor :'#ffffff',
            }
          }} 
        />
      </Screen.Navigator>
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
    shadowColor: 'rgba(0, 0, 0, 0.1)',
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
    shadowColor: 'rgba(0, 0, 0, 0.1)',
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
  listOfFood : {

  }

});
 
export default App;