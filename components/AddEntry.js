import React from 'react';
import { View, Text, Stylesheet, TouchableOpacity } from 'react-native';
import { getMetricMetaInfo, timeToString } from '../utils/helpers';
import UdaciSteppers from './UdaciSteppers';
import UdaciSliders from './UdaciSliders';
import DateHeader from './DateHeader';
import TextButton from './TextButton';
import { Ionicons } from '@expo/vector-icons';
import { submitEntry, removeEntry } from '../utils/api';

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>SUBMIT</Text>
    </TouchableOpacity>
  );
}

class AddEntry extends React.Component {
  initialState = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
  };

  state = this.initialState;

  increment = metric => {
    const { max, step } = getMetricMetaInfo(metric);

    this.setState(state => {
      const count = state[metric] + step;

      return {
        [metric]: count > max ? max : count
      };
    });
  };

  decrement = metric => {
    this.setState(state => {
      const count = state[metric] - getMetricMetaInfo(metric).step;

      return {
        [metric]: count < 0 ? 0 : count
      };
    });
  };

  slider = (metric, value) => {
    this.setState(state => {
      return {
        [metric]: value
      };
    });
  };

  submit = () => {
    const key = timeToString();
    const entry = this.state;

    this.setState(() => this.initialState);

    submitEntry({ key, entry });
  };

  reset = () => {
    const key = timeToString();

    removeEntry({ key });
  };

  render() {
    const metaInfo = getMetricMetaInfo();

    if (this.props.alreadyLoggedIn) {
      return (
        <View>
          <Ionicons name="ios-happy-outline" size={100} />
          <Text>You already logged your information today</Text>
          <TextButton onPress={this.reset}>
            <Text>Reset</Text>
          </TextButton>
        </View>
      );
    }

    return (
      <View>
        <DateHeader date={new Date().toLocaleDateString()} />
        {Object.keys(metaInfo).map(key => {
          const { getIcon, type, ...rest } = metaInfo[key];
          const value = this.state[key];

          return (
            <View key={key}>
              {getIcon()}
              {type === 'slider' ? (
                <UdaciSliders
                  value={value}
                  onChange={value => this.slider(key, value)}
                  {...rest}
                />
              ) : (
                <UdaciSteppers
                  value={value}
                  onIncrement={() => this.increment(key)}
                  onDecrement={() => this.decrement(key)}
                />
              )}
            </View>
          );
        })}
        <SubmitBtn onPress={this.submit} />
      </View>
    );
  }
}

export default AddEntry;
