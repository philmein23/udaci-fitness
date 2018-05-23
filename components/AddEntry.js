import React from 'react';
import { View, Text, Stylesheet } from 'react-native';
import { getMetricMetaInfo } from '../utils/helpers';
import UdaciSteppers from './UdaciSteppers';
import UdaciSliders from './UdaciSliders';

class AddEntry extends React.Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
  };

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

  render() {
    const metaInfo = getMetricMetaInfo();
    return (
      <View>
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
      </View>
    );
  }
}

export default AddEntry;
