import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

if (__DEV__) {
  const tron = Reactotron.configure()
    .use(reactotronRedux())
    .useReactNative()
    .connect();

  tron.clear();

  console.tron = tron;
}
