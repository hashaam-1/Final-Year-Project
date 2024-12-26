import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Signup from './Signup';
import Login from './Login';
import UserDashboard from './User/UserDashboard';
import Chapterwise from './User/Chapterwise';
import AllQuestions from './User/Allquestion';
import AttemptQuiz from './User/AttemptQuiz';
import Attemptmcqs from './User/Attemptmcqs';
import Pastpaper from './User/Pastpaper';
import PrepareTopic from './User/PrepareTopic';
import AdminDashboard from './Admin/AdminDashboard';
import AddNew from './Admin/AddNew';
import AllPapers from './Admin/Allpapers';
import Papershow23 from './Admin/Papershow23';
import ChpwisePastPaper from './User/ChpwisePastPaper';
import ReviewQuizResult from './User/Reviewquizresult';
import ChpwisePast from './User/chapterwisepast';
const Stack = createNativeStackNavigator();

const UserStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="Signup" component={Signup}></Stack.Screen>
        <Stack.Screen
          name="UserDashboard"
          component={UserDashboard}></Stack.Screen>
        <Stack.Screen name="Chapterwise" component={Chapterwise}></Stack.Screen>
        <Stack.Screen
          name="Allquestion"
          component={AllQuestions}></Stack.Screen>
        <Stack.Screen name="AttemptQuiz" component={AttemptQuiz}></Stack.Screen>
        <Stack.Screen name="Attemptmcqs" component={Attemptmcqs}></Stack.Screen>
        <Stack.Screen name="Pastpaper" component={Pastpaper}></Stack.Screen>
        <Stack.Screen
          name="PrepareTopic"
          component={PrepareTopic}></Stack.Screen>
        <Stack.Screen
          name="AdminDashboard"
          component={AdminDashboard}></Stack.Screen>
        <Stack.Screen name="AddNew" component={AddNew}></Stack.Screen>
        <Stack.Screen name="Allpapers" component={AllPapers}></Stack.Screen>

        <Stack.Screen
          name="ChpwisePastPaper"
          component={ChpwisePastPaper}></Stack.Screen>
        <Stack.Screen
          name="Reviewquizresult"
          component={ReviewQuizResult}></Stack.Screen>

        <Stack.Screen name="chpwisepast" component={ChpwisePast}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default UserStack;
