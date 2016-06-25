import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator,
  TouchableHighlight
} from 'react-native';

var REQUEST_URL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="

class Recipe extends Component {
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
    this.fetchData();
  }

  fetchData() {
    var drink_id = this.props.drinkId
    fetch(REQUEST_URL + drink_id)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData)

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.drinks),
          loaded: true,
        });
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>
            {this.props.type}
          </Text>
        </View>
        <View style={styles.ListView}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRecipe.bind(this)}
            style={styles.ListView}
          />
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

  pairIngredientsMeasurements(recipe) {
    var ingredients = {};
    for (key of Object.keys(recipe)) {
      if(recipe[key] && recipe[key].trim()){
        if(key.includes("strIngredient")){

          var i = ingredients[key.slice(13)];
          if(i === undefined){
            ingredients[key.slice(13)] = {
              ingredient: recipe[key]
            }
          }
          else{
            i.ingredient = recipe[key]
          }
        }
        else if(key.includes("strMeasure")){

          var i = ingredients[key.slice(10)];
          if(i === undefined){
            ingredients[key.slice(10)] = {
              measurement: recipe[key]
            }
          }
          else{
            i.measurement = recipe[key]
          }
        }
      }
    }
    return JSON.stringify(ingredients);
  }

  renderRecipe(recipe) {
    var ingrMeasHash = this.pairIngredientsMeasurements(recipe)
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{recipe.strDrink}</Text>
          <Text style={styles.text}>{ingrMeasHash}</Text>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    marginTop: 24,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  ListView: {
    flex: 1,
    paddingTop: 10,
  },
  category: {
    flex: 1,
  },
  text: {
    fontSize: 20,
  }
});

export default Recipe;
