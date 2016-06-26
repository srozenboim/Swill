import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator,
  TouchableHighlight,
  Image
} from 'react-native';

var REQUEST_URL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="

class Guide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  componentWillMount() {
    console.log("constructor")
  }

  componentDidMount() {
    console.log("constructor")
    this.setState({
      loaded: true,
    });
  }

  back(routeName, drink) {
    this.props.navigator.pop({
      name: routeName,
      passProps: {drinkId: drink}
    });
  }

  navigate(routeName, drinkCategory) {
    this.props.navigator.pop({
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
        <TouchableHighlight
          onPress={this.back.bind(this, 'recipe', this.props.drink.idDrink)}
        >
          <Text style={styles.bButton}> &larr; Back</Text>
        </TouchableHighlight>
          <Text style={styles.title}>
            {this.props.drink.strDrink}
          </Text>
          <Text style={styles.text}>
            {this.displayIngredients(this.renderGuide, this.props.ingredients)}
          </Text>
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

  displayIngredients(callback, ingredients){
    console.log("HErro")
    var keys = Object.keys(ingredients)
    console.log(keys)
    return(
      <Text style={styles.text}>
      {keys.map(function(key, index){
         console.log(key)
         return callback(ingredients[key], key)
       })}
       </Text>
     )
  }

  renderGuide(ingredient, key) {
    return (
          <Text style={styles.text} key={ key }>
            {ingredient.measurement} of {ingredient.ingredient}
          </Text>
      );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#B8D8D8',
    marginTop: 24,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#4F6367'
  },
  ListView: {
    flex: 1,
    paddingTop: 10,
  },
  category: {
    flex: 1,
  },
  text: {
    fontSize: 16,
  },
  drinkImage: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',

  },
  header: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  bButton: {
    backgroundColor: '#FE5F55',
    color: 'white',
    padding: 3,
    textAlign: 'left',
    marginLeft: 19,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius:4,
    width: 85,
    paddingBottom: 10,
    fontWeight: 'bold',
  },

});

export default Guide;
