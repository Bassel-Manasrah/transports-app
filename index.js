import { registerRootComponent } from "expo";

import App from "./App";
import TransportsScreen from "./src/screens/TransportsScreen";
import ContainersScreen from "./src/screens/ContainersScreen";
import ContainerDetailsScreen from "./src/screens/ContainerDetailsScreen";
import CreateRecipientScreen from "./src/screens/CreateRecipientScreen";
import Test from "./src/screens/Test";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

// registerRootComponent(Test);

registerRootComponent(App);
// registerRootComponent(CreateRecipientScreen);
// registerRootComponent(CreateRecipientScreen);

// registerRootComponent(Test);
