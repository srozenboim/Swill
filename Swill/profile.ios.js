import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator,
  TouchableHighlight,
} from 'react-native';


var REQUEST_URL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="
var API_URL = "https://swill-backend.herokuapp.com/"

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: this.props.accessToken,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  componentWillReceiveProps() {
    this.setState({loaded: false})
    this.render();
    fetch(API_URL+'api/userfavorites', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         favorite:{
           accessToken: this.props.accessToken,
           drink_id: this.props.drinkId,
         }
       })
     }).then((res) => res.json())
       .then((res) => {

         var favorite = res
         // var favorite = [Object.values(res)]
         console.log(favorite)
         this.setState({
           dataSource: this.state.dataSource.cloneWithRows(favorite),
           loaded: true,
         })
         this.render();

       })
       .catch((err) => console.log(err));
    console.log(this.state);
    console.log("dsafsgfjashhk")

  }

  componentWillMount() {
  //  console.log("it will mount!!!!!!")
  }

  componentDidMount() {
    // console.log("constructor")
    console.log("it will mount!!!!!!")
     this.fetchData();

  }



 fetchData() {
   fetch(API_URL+'api/userfavorites', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        favorite:{
          accessToken: this.props.accessToken,
          drink_id: this.props.drinkId,
        }
      })
    }).then((res) => res.json())
      .then((res) => {

        var favorite = res
        // var favorite = [Object.values(res)]
        console.log(favorite)
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(favorite.favorites),
          username: favorite.username,
          loaded: true,
        })


      })
      .catch((err) => console.log(err));

 }

parseFavorites(){
  var favoritesObj = JSON.parse(favorites)
    console.log(favoritesObj[14029])
}

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (

      <View style={styles.container}>

        <View style={styles.nav}>
        <TouchableHighlight underlayColor={'transparent'}
          onPress={this.back.bind(this)}
        >
          <Text style={styles.bButton}>  &lsaquo; </Text>
        </TouchableHighlight>
        <Text style={styles.navtitle}>
        {this.state.username}
        </Text>
        </View>
        <View style={styles.ListView}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderDrink.bind(this)}
            style={styles.ListView}
          />
        </View>
      </View>
    );
  }

  renderDrink(drink) {
    return (
      <View style={styles.container}>
        <View style={styles.category}>
          <TouchableHighlight underlayColor={'transparent'}
            onPress={this.navigate.bind(this, 'recipe', drink.id, drink.name)}
          >
            <Text style={styles.title}>{drink.name}</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading drinks...
        </Text>
      </View>
    );
  }

  back(routeName) {
    this.props.navigator.pop();
  }

  navigate(routeName, drink, name) {
    this.props.navigator.push({

      name: routeName,
      passProps: {drinkId: drink, accessToken: this.state.accessToken, drinkName: name }
    });
  }

}
// 'Avenir'
const styles = StyleSheet.create({
  container: {

    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#B8D8D8',
    marginTop: 24,
  },
  title: {
    fontFamily: 'OriyaSangamMN',
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
    // fontWeight: 'bold',

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
    backgroundColor: '#EEF5DB',
    paddingTop: 10,
    paddingBottom: 10
  },
  bButton: {
    backgroundColor: '#FE5F55',
    color: 'white',
    // padding: 3,
    textAlign: 'left',
    marginTop: 0,
    fontSize: 40,
    width: 55,
    // paddingBottom: 10,
    fontWeight: 'bold',
  },
  nav: {
    justifyContent: 'flex-start',
    width: 378,
    height: 50,
    backgroundColor: '#FE5F55',
    // alignItems: 'center',
    flexDirection: 'row',
  },
  navtitle: {
    fontFamily: 'Helvetica',
    marginTop: 15,
    marginLeft: 74,
    fontSize: 20,
    color: 'white',
    letterSpacing: 14,
  },
});

export default Profile;
