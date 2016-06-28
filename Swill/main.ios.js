/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  AsyncStorage,
  Navigator,
  TextInput,
} from 'react-native';

const ACCESS_TOKEN = 'access_token';

import Category from './category-drinks'
import Search from './search-results'
import Error from './error'
import Register from './register'

const categories = ['Vodka','Tequila', 'Light rum', 'Gin', 'Dark rum', 'Scotch', 'Whiskey', 'Bourbon', 'Mezcal', 'Brandy', 'Champagne', 'Rum', 'Cognac', 'Kahlua', 'Peanut Liqueur', 'Sake', 'Peppermint schnapps', 'Everclear', 'Beer' ]

class Main extends Component {

  componentWillMount() {
    this.getToken();
  }

  async getToken() {
    try {
      let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
      if(!accessToken) {
          console.log("Token not set");
      } else {
          this.verifyToken(accessToken)
      }
    } catch(error) {
        console.log("Something went wrong");
    }
  }

  //If token is verified we will redirect the user to the home page
 async verifyToken(token) {
   let accessToken = token

   try {
     let response = await fetch('http://localhost:3000/api/verify?session%5Baccess_token%5D='+accessToken);
     let res = await response.text();
     if (response.status >= 200 && response.status < 300) {
       console.log("res is:" + res);
       //Verified token means user is loggen in to we redirect to home.
       this.navigate('home');
     } else {
         //Handle error
         let error = res;
         throw error;
     }
   } catch(error) {
       console.log("error response: " + error);
   }
 }

  constructor(props) {
    console.log("constructor")
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      search: "",
    };
  }

  componentWillMount() {
    console.log("constructor")
  }

  componentDidMount() {
    console.log("constructor")
    this.fetchData();
  }

  fetchData() {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(categories),
          loaded: true,
        });
  }

  navigate(routeName, drinkCategory) {
    this.props.navigator.push({
      name: routeName,
      passProps: {
        category: drinkCategory,
        results: drinkCategory
      }
    });
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (

      <View style={styles.container}>


        <View>
          <Text style={styles.title}>
            Welcome to Swill!
          </Text>
           <TouchableHighlight
          onPress={this.navigate.bind(this, 'register')}
        >
          <Text style={styles.title}>Register</Text>
        </TouchableHighlight>

         <TouchableHighlight
          onPress={this.navigate.bind(this, 'login')}
        >
          <Text style={styles.title}>Login</Text>
        </TouchableHighlight>
        </View>



        <TextInput
          style={styles.search}
          onChangeText={(text) => this.setState({search: text})}
          placeholder="Search"
          autoCorrect={false}
          value={this.state.search}
          onSubmitEditing={(text) => {
            this.navigate('search', this.state.search )
            this.state.search = ""
            }
          }
        />
          <Text style={styles.title}>
            Pick a Category
          </Text>

        <View style={styles.ListView}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderCategory.bind(this)}
          />
        </View>
      </View>
    );
  }


  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading categories...
        </Text>
      </View>
    );
  }


  renderCategory(category) {
    return (

      <View style={styles.listContainer}>
        <View style={styles.category}>

          <TouchableHighlight
            onPress={this.navigate.bind(this, 'category', category)}
          >
            <Text style={styles.title}>{category}</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#B8D8D8',
    marginTop: 24,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    marginTop: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  ListView: {
    flex: 1,
  },
  category: {
    flex: 1,
    marginLeft: 40,
    marginRight: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#FE5F55',
    backgroundColor: '#EEF5DB'
  },
  search: {
    height: 40,
    borderColor: '#FE5F55',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#EEF5DB'
  },
  listContainer: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#B8D8D8',
    marginTop: 10,
  }
});

export default Main

// AppRegistry.registerComponent('Swill', () => Swill);
