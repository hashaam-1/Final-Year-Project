import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
const Papershow23 = ({navigation, route}) => {
  const {ttmcqs} = route.params;
  const [mcqData, setMcqData] = useState([]);
  useEffect(() => {
    setMcqData(ttmcqs);
  });
  return (
    <View>
      {mcqData.map(item => (
        <View key={item.Emcqid}>
          <Text>{item.Emcqid}</Text>
          <Text style={{color: 'black'}}>{item.mcqData}</Text>
        </View>
      ))}
    </View>
  );
};
export default Papershow23;
