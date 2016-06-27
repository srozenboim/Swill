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
      <View style={styles.nav}>
      <TouchableHighlight
        onPress={this.back.bind(this, 'recipe')}
      >
        <Text style={styles.bButton}>  &lsaquo; </Text>
      </TouchableHighlight>
      <Text style={styles.navtitle}>
        {this.props.drink.strDrink}
      </Text>

      </View>
        <View>
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
    var total = 0
    for (key of keys) {
      amount = convertToOunce(ingredients[key].measurement).scalar
      total += amount
    }

    totalPix = totalPix*(total/16)
    console.log(totalPix);
    console.log(total)

    return(
      <Text style={styles.text}>
      {keys.map(function(key, index){
         amount = convertToOunce(ingredients[key].measurement).scalar;
         return callback(ingredients[key], key, totalPix*(amount/total))
       })}
       </Text>
     )
  }

  convertToOunce(measurement) {
    if(measurement){
      var match = measurement.match(/(((\d?)(\.)?\d+\s+)|(\d+(\/)\d+))((\d+(\/)\d+))?(\s*\w+)?/);


      var substitutions = {'shot': 1.5, 'shots': 1.5, 'splash': 0.03125 , 'dash': 0.03125, 'dashes': 0.03125,  'jigger': 1.5, 'scoop': 4, 'scoops': 4}

      if(match){
        var matchString = match[0];

        if(matchString.match(/(\d+(\/)\d+)/) && matchString.match(/(\d+(\/)\d+)/)[0]){
          var num = matchString.split(" ")
          if(num.length <= 2){
            numeratorDenominator = num[0].split("/")
            var decimal = parseFloat(numeratorDenominator[0])/parseFloat(numeratorDenominator[1])
            matchString = decimal +" "+ num[1]
          }
          else{
            numeratorDenominator = num[1].split("/")
            var decimal = parseFloat(num[0])+ parseFloat(numeratorDenominator[0])/parseFloat(numeratorDenominator[1])
            matchString = decimal +" "+ num[2]
          }
        }

        num = matchString.split(" ")
        if(num.length>1){
          if(substitutions[num[1]]){
            decimal = parseFloat(num[0]) * substitutions[num[1]]
            matchString = decimal + " floz"

          }
          // else if (!substitutions[num[1]] && !Qty.getUnits('volume')) {
          //   matchString= 0 + "floz"
          // }
        }

        var amount = matchString.replace(/\s+oz/, "floz").replace("tsp", "teaspoon").replace("tblsp", "tablespoon")

        try{
          qty = new Qty(amount);
          return qty.to('floz');
        }
        catch(e){

        }
      }
    }
  }

  renderGuide(ingredient, key, height) {
    var colors = ['#FF66E3', '#e1f7d5', '#ffbdbd', '#c9c9ff', '#f1cbff', '#b3d9ff', '#ff9999', '#ffff99', '#99ff99', '#80ffff', '#EFA9FE', '#44B4D5', "#FFFF84", "#E4C6A7", "#FFA4A4"];
    var rand = Math.floor((Math.random() * colors.length));
    return (
        <View key={ key } style={[styles.section, {
              width: 358,
              height:  height,
              backgroundColor: colors[rand],
              alignItems: 'center',
              borderWidth: 1,
              borderColor: 'grey',
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
    // alignItems: 'stretch',
    backgroundColor: '#B8D8D8',
    marginTop: 24,
    // paddingLeft: 8,
    // paddingRight: 8,
    // paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8,
    justifyContent: 'space-between',
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
    // padding: 3,
    textAlign: 'left',
    marginTop: 0,
    fontSize: 40,
    width: 55,
    // paddingBottom: 10,
    fontWeight: 'bold',
  },
  nav: {
      marginLeft: -8,
    justifyContent: 'flex-start',
    width: 378,
    height: 50,
    backgroundColor: '#FE5F55',
    // alignItems: 'center',
    flexDirection: 'row',
  },
  navtitle: {

    marginTop: 18,
    textAlign: 'center',
    fontSize: 15,
    color: 'white',

  },


});

export default Guide;
