import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
} from 'react-native';

const striked = {
  paddingLeft: 60,
  borderLeftWidth: 10,
  borderLeftColor: '#E91E63'
}

const notStriked = {
  paddingLeft: 60,
  borderLeftWidth: 10,
  borderLeftColor: '#E91E63',
  textDecorationLine: 'line-through',
  textDecorationStyle: 'solid'
}

const defaultStrike = {
  paddingLeft: 60,
  borderLeftWidth: 10,
  borderLeftColor: '#E91E63'
}


  export default class Note extends Component {

    constructor(props){
      super(props);
      this.state = {
          noteToggle: false,
          styleStrike: defaultStrike
      };
    }


    render() {
        return (
            <View key={this.props.keyval} style={styles.note}>
                <Switch
                  value={this.state.noteToggle}
                  onValueChange={(val) => this.toggleSwitch(val)}
                  style={styles.checkbox}
                />
                <Text style={this.state.styleStrike}>{this.props.val.note}</Text>

                <TouchableOpacity onPress={this.props.deleteMethod} style={styles.noteDelete}>
                    <Text style={styles.noteDeleteText}>X</Text>
                </TouchableOpacity>
            </View>
        );
    }

    toggleSwitch(value){
      this.setState({noteToggle : value});
      if (value == true){
        this.setState({styleStrike: notStriked})
      } else {
        this.setState({styleStrike: striked})
      }
    }


}


const styles = StyleSheet.create({
    note: {
        position: 'relative',
        padding: 20,
        paddingRight: 50,
        borderBottomWidth:2,
        borderBottomColor: '#ededed'
    },
    checkbox: {
        position: 'relative',
        top: 20,
    },
    noteText: {
        paddingLeft: 60,
        borderLeftWidth: 10,
        borderLeftColor: '#E91E63',
    },
    noteDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2980b9',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10
    },
    noteDeleteText: {
        color: 'white'
    }
});
