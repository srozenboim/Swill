import Qty from 'js-quantities';

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
            {this.displayIngredients(this.renderGuide, this.props.ingredients, this.convertToOunce)}
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

  displayIngredients(callback, ingredients, convertToOunce){
    var keys = Object.keys(ingredients)
    //the total number of pixels in the drink
    //this will be calculated by figuring out
    //the total number of inches in the drink
    //this is done by taking the total volume of the drink,
    //which is the sum of the volumes of the ingredients in the drink,
    //and using the volume to height calculation we came up with earlier
    var totalPix = 576 //6 inches in px default, this will need to be calculated
    return(
      <Text style={styles.text}>
      {keys.map(function(key, index){
         convertToOunce(ingredients[key].measurement);
         return callback(ingredients[key], key, totalPix/keys.length)
       })}
       </Text>
     )
  }

  convertToOunce(measurement) {
    console.log(measurement)
    if(measurement){
      var match = measurement.match(/((\d+\s+)|(\d+(\/)\d+))((\d+(\/)\d+))?(\s*\w+)?/);

      if(match){
        var matchString = match[0];
        // part, parts, shot, shots, splash, dash, jigger, scoops, chunks, swirl, fill, bag
        if(matchString.match(/(\d+(\/)\d+)/)[0]){
          var num = matchString.split(" ")
          if(num.length <= 2){
            numeratorDenominator = num[0].split("/")
            matchString = parseFloat(numeratorDenominator[0])/parseFloat(numeratorDenominator[1]) +" "+ num[1]
          }
          else{
            numeratorDenominator = num[1].split("/")
            matchString = (parseFloat(num[0])+ parseFloat(numeratorDenominator[0])/parseFloat(numeratorDenominator[1])) +" "+ num[2]
          }
        }

        console.log(matchString)

        var amount = match[0].replace("oz", "floz").replace("tsp", "teaspoon").replace("tblsp", "tablespoon")

        try{
          qty = new Qty(amount);
          console.log(qty.to('floz'));
        }
        catch(e){

        }
      }
    }
  }

  renderGuide(ingredient, key, height) {
    var colors = ['blue', 'red', 'yellow', 'grey', 'pink'];
    var rand = Math.floor((Math.random() * colors.length));
    return (
        <View key={ key } style={[styles.base, {
              width: 200,
              height:  height,
              backgroundColor: colors[rand],
              flex: 1,
              alignItems: 'center',
              borderWidth: 1
            }]}>
          <Text style={styles.text} key={ key }>
            {ingredient.measurement} {ingredient.ingredient}
          </Text>
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
