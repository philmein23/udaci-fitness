import React from 'react';
import { createStore } from 'redux';
import { View, StyleSheet } from 'react-native';
import AddEntry from './components/AddEntry';
import reducer from './reducers';
import { Provider } from 'react-redux';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <AddEntry />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
