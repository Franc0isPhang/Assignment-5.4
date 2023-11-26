
import React, { useEffect, useState } from "react";

import { StatusBar } from "expo-status-bar";

import {

 StyleSheet,

 Text,

 View,

 ImageBackground,

 Dimensions,

} from "react-native";

import { Pedometer } from "expo-sensors";

import CircularProgress from "react-native-circular-progress-indicator";
      
 

export default function App() {

 const [PedomaterAvailability, SetPedomaterAvailability] = useState("");

 const [StepCount, SetStepCount] = useState(0);

 

 var WindowHeight = Dimensions.get("window").height;

 

 var Dist = StepCount / 1300;

 var DistanceCovered = Dist.toFixed(4);

 

 var cal = DistanceCovered * 60;

 var caloriesBurnt = cal.toFixed(4);

 React.useEffect(() => {

   subscribe();

 }, []);

 

 subscribe = () => {

   const subscription = Pedometer.watchStepCount((result) => {

     SetStepCount(result.steps);

   });

 

   Pedometer.isAvailableAsync().then(

     (result) => {

       SetPedomaterAvailability(String(result));

     },

     (error) => {

       SetPedomaterAvailability(error);

     }

   );

 };

 

 return (

   <View style={styles.container}>

     <ImageBackground

       style={{ flex: 1 }}

       source={require("./assets/jogging3.jpg")}

       resizeMode="cover"

     >

       <View style={{ flex: 1, justifyContent: "center" }}>

         <Text style={styles.headingDesign}>

           Is Pedometer available on the device : {PedomaterAvailability}

         </Text>

       </View>

       <View style={{ flex: 3 }}>

         <CircularProgress

           value={StepCount}

           maxValue={6500}

           radius={210}

           textColor={"#ecf0f1"}

           activeStrokeColor={"#337CFF"}

           inActiveStrokeColor={"#33D3FF"}

           inActiveStrokeOpacity={0.5}

           inActiveStrokeWidth={40}

           activeStrokeWidth={40}

           title={"Step Count"}

           titleColor={"#337CFF"}

           titleStyle={{ fontWeight: "bold" }}

         />

       </View>

 

       <View style={{ flex: 1, justifyContent: "center" }}>

         <View style={{ flex: 1 }}>

           <Text

             style={[

               styles.textDesign,

               { paddingLeft: 20, marginLeft: '23%' },

             ]}

           >

             Target : 6500 steps(5kms)

           </Text>

         </View>

 

         <View style={{ flex: 1 }}>

           <Text

             style={[

               styles.textDesign,

               { width: "93%", paddingLeft: 20, marginLeft: '-3.5%' },
           
             ]}

           >

             Distance Covered : {DistanceCovered} km

           </Text>

         </View>

 

         <View style={{ flex: 1 }}>

           <Text

             style={[

               styles.textDesign,

               {  paddingLeft: 10, marginLeft: '23%' },

             ]}

           >

             Calories Burnt : {caloriesBurnt}

           </Text>

         </View>

 

         <StatusBar style="auto" />

       </View>

     </ImageBackground>

   </View>

 );

}

 

const styles = StyleSheet.create({

 container: {

   flex: 1,

   backgroundColor: "#fff",

 },

 headingDesign: {

   backgroundColor: "#33D3FF",

 

   alignSelf: "center",

   fontSize: 20,

   color: "white",

   fontWeight: "bold",

   fontFamily: "Papyrus",

 },

 textDesign: {

   backgroundColor: "#33D3FF",

   height: 50,

   width : '85%',

   borderColor: "white",

   borderWidth: 1,

   borderRadius: 20,

   overflow: "hidden",

   fontSize: 25,

   color: "white",

   fontWeight: "bold",

   fontFamily: "Papyrus",

 },

});

//do npm install react-native-circular-progress-indicator and npm install whenever main cannot be found
//npx expo install react-native-reanimated
//https://www.youtube.com/watch?v=VVoXcr18mdo
//https://www.youtube.com/watch?v=RaSyX6COTDk

//git commit
//You press i, and you enter insert mode.
// You can navigate around the text and insert what ever you want. When done, press Esc. This makes you exit insert mode. Next you have to press :wq, which means to write and quit.

// import { StatusBar } from 'expo-status-bar';
// import {Platform,ScrollView,StyleSheet,Text,TextInput,TouchableOpacity,View, } from 'react-native';
// import { Pedometer } from 'expo-sensors';
// import { useState, useEffect } from 'react';
// import Constants from "expo-constants";
// import * as SQLite from "expo-sqlite";


// export default function App() {
//   const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
//   const [pastStepCount, setPastStepCount] = useState(0);
//   const [currentStepCount, setCurrentStepCount] = useState(0);
//   const [weeklyStepCount, setWeeklyStepCount] = useState(0);
//   const [text, setText] = useState(null);
//   const [forceUpdate, forceUpdateId] = useForceUpdate();

//   useEffect(() => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         "create table if not exists items (id integer primary key not null, done int, value text);//if there is no table it will create"
//       );
//     });
//   }, []);

//   const add = (text) => {
//     // is text empty?
//     if (text === null || text === "") {
//       return false;
//     }

//     db.transaction(
//       (tx) => {
//         tx.executeSql("insert into items (done, value) values (0, ?)", [text]);
//         tx.executeSql("select * from items", [], (_, { rows }) =>
//           console.log(JSON.stringify(rows))
//         );
//       },
//       null,
//       forceUpdate
//     );
//   };



//   const subscribe = async () => {
//     const isAvailable = await Pedometer.isAvailableAsync();
//     setIsPedometerAvailable(String(isAvailable));

//     if (isAvailable) {
//       const end = new Date();
//       const start = new Date();
//       start.setDate(end.getDate() - 1);

//       const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
//       if (pastStepCountResult) {
//         setPastStepCount(pastStepCountResult.steps);
//       }

//        // Subscribe to real-time step count updates
//       const subscription = Pedometer.watchStepCount(result => {
//       setCurrentStepCount(result.steps);

//       // Calculate weekly step count (assuming a week is 7 days)
//       setWeeklyStepCount((prevWeeklyStepCount) => prevWeeklyStepCount + result.steps);
//       });

//       return subscription;
      
//     }
//   };

//   useEffect(() => {
//     const subscription = subscribe();
//     return () => subscription && subscription.remove();
//   }, []);



// return (
//   <>
//     {/* <ThemeProvider theme={theme}>
//       <Box flex={1} alignItems="center" backgroundColor="background">
//         <Box marginTop={6} padding={4} backgroundColor="primary" shadow="md">
//           <Text style={{ color: 'white' }}>Hello from a box component!</Text>
//         </Box>
//       </Box>
//       <StatusBar style="auto" />
//     </ThemeProvider> */}

//     <View style={styles.container}>
//       <Text style={styles.heading}>SQLite Example</Text>

//       {Platform.OS === 'web' ? (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <Text style={styles.heading}>Expo SQlite is not supported on web!</Text>
//         </View>
//       ) : (
//         <>
//           <View style={styles.flexRow}>
//             <TextInput
//               onChangeText={(text) => setText(text)}
//               onSubmitEditing={() => {
//                 add(text);
//                 setText(null);
//               }}
//               placeholder="what do you need to do?"
//               style={styles.input}
//               value={text}
//             />
//           </View>
//           <ScrollView style={styles.listArea}>
//             <Items
//               key={`forceupdate-todo-${forceUpdateId}`}
//               done={false}
//               onPressItem={(id) =>
//                 db.transaction(
//                   (tx) => {
//                     tx.executeSql(`update items set done = 1 where id = ?;`, [id]);
//                   },
//                   null,
//                   forceUpdate
//                 )
//               }
//             />
//             <Items
//               done
//               key={`forceupdate-done-${forceUpdateId}`}
//               onPressItem={(id) =>
//                 db.transaction(
//                   (tx) => {
//                     tx.executeSql(`delete from items where id = ?;`, [id]);
//                   },
//                   null,
//                   forceUpdate
//                 )
//               }
//             />
//           </ScrollView>
//         </>
//       )}
//     </View>
//   </>
// );
//   return (
//     <View style={styles.container}>
//       <Text>Pedometer.isAvailableAsync(): {isPedometerAvailable}</Text>
//       <Text>Steps taken in the last 24 hours: {pastStepCount}</Text>
//       <Text>Walk! And watch this go up: {currentStepCount}</Text>
//       <Text>Total Steps in a Week: {weeklyStepCount}</Text>
//     </View>
//   );
// }

// function openDatabase() {
//   if (Platform.OS === "web") {
//     return {
//       transaction: () => {
//         return {
//           executeSql: () => {},
//         };
//       },
//     };
//   }

//   const db = SQLite.openDatabase("db.db");
//   return db;
// }

// const db = openDatabase();

// function Items({ done: doneHeading, onPressItem }) {
//   const [items, setItems] = useState(null);

//   useEffect(() => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         `select * from items where done = ?;`,
//         [doneHeading ? 1 : 0],
//         (_, { rows: { _array } }) => setItems(_array)
//       );
//     });
//   }, []);

//   const heading = doneHeading ? "Completed" : "Todo";

//   if (items === null || items.length === 0) {
//     return null;
//   }

  
//   return (
//     <View style={styles.sectionContainer}>
//       <Text style={styles.sectionHeading}>{heading}</Text>
//       {items.map(({ id, done, value }) => (
//         <TouchableOpacity
//           key={id}
//           onPress={() => onPressItem && onPressItem(id)}
//           style={{
//             backgroundColor: done ? "#1c9963" : "#fff",
//             borderColor: "#000",
//             borderWidth: 1,
//             padding: 8,
//           }}
//         >
//           <Text style={{ color: done ? "#fff" : "#000" }}>{value}</Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// }



// function useForceUpdate() {
//   const [value, setValue] = useState(0);
//   return [() => setValue(value + 1), value];
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#fff",
//     flex: 1,
//     paddingTop: Constants.statusBarHeight,
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   flexRow: {
//     flexDirection: "row",
//   },
//   input: {
//     borderColor: "#4630eb",
//     borderRadius: 4,
//     borderWidth: 1,
//     flex: 1,
//     height: 48,
//     margin: 16,
//     padding: 8,
//   },
//   listArea: {
//     backgroundColor: "#f0f0f0",
//     flex: 1,
//     paddingTop: 16,
//   },
//   sectionContainer: {
//     marginBottom: 16,
//     marginHorizontal: 16,
//   },
//   sectionHeading: {
//     fontSize: 18,
//     marginBottom: 8,
//   },
// });