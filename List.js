import React, { Component } from 'react';
import {
    View,
    KeyboardAvoidingView,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import Note from './Note';

export default class List extends Component {

    constructor(props){
        super(props);
        this.state = {
            noteArray: [],
            noteText: '',
        };
    }

    componentDidMount(){
      return fetch('https://safe-river-44228.herokuapp.com/notes')
      .then(response => {return response.json()})
      .then(jsonresponse => {
        this.setState({noteArray: jsonresponse})
      }).catch((error)=>{
         console.log("Api call error");
         alert(error.message);
      })
    }

    componentWillUpdate(){
      return fetch('https://safe-river-44228.herokuapp.com/notes')
      .then(response => {return response.json()})
      .then(jsonresponse => {
        this.setState({noteArray: jsonresponse})
      }).catch((error)=>{
         console.log("Api call error");
         alert(error.message);
      })
    }

    render() {
        let notes = this.state.noteArray.map((object)=>{
            return <Note key={object.id} keyval={object.id} val={object}
                    deleteMethod={()=>this.deleteNote(object.id)}/>
        });

        return (
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>24List</Text>
                </View>
                <KeyboardAvoidingView style={styles.footer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Add New Note'
                        onChangeText={(noteText)=> this.setState({noteText: noteText})}
                        value={this.state.noteText}
                        placeholderTextColor='white'
                        underlineColorAndroid='transparent'>
                    </TextInput>
                    <Text>

                    </Text>
                </KeyboardAvoidingView>
                <ScrollView style={styles.scrollContainer}>
                    {notes}
                </ScrollView>
                <TouchableOpacity onPress={ this.addNote.bind(this) } style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }


    addNote(){
      if(this.state.noteText){
        this.setState({ noteArray: this.state.noteArray });
        this.setState({noteText:''});
      }
      
        return fetch(`https://safe-river-44228.herokuapp.com/notes/`, {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: this.state.noteText
          })
        });
    }

    deleteNote(key){
        return fetch(`https://safe-river-44228.herokuapp.com/notes/${key}`, {method: 'delete'});
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#FFBE00',
        alignItems: 'center',
        justifyContent:'center',
        borderBottomWidth: 10,
        borderBottomColor: '#ddd'
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        padding: 26
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 10
    },
    footer: {
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10
    },
    textInput: {
        alignSelf: 'stretch',
        color: '#fff',
        padding: 20,
        backgroundColor: '#252525',
        borderTopWidth:2,
        borderTopColor: '#ededed'
    },
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 50,
        backgroundColor: '#FFBE00',
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24
    }
});
