import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "../screens/home";
import Dashboard from "../components/dashboard.component";
import RegistrationForm from "../components/form.component";
import SpotRegistration from "../components/SpotRegistration.component";
const Main = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
  // registraion: registraion,
  registrationform:RegistrationForm,
  dashboard:Dashboard,
  spotregistration:SpotRegistration
  
});

export default createAppContainer(Main);
