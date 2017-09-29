import React, { Component } from 'react';
import './App.css';

import {RecipeAll, RecipeDetail} from './components'

const Header = () => (
  <header className="Header">
    <h1>Recipe Box</h1>
  </header>
)

const recipeStorage = window.localStorage
const STORAGE_PREFIX = "atyp-fcc"

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      curIdx: 0,
      currentRecipe: undefined,
      recipes: [],
    }

    this.addRecipe = this.addRecipe.bind(this);
    this.displayRecipe = this.displayRecipe.bind(this);
    this.updateRecipe = this.updateRecipe.bind(this);
    this.removeRecipe = this.removeRecipe.bind(this);
  }

  // TODO: Get and set recipes from local storage
  componentDidMount() {
    const storageState = recipeStorage.getItem(`${STORAGE_PREFIX}-recipe`)
    const state = JSON.parse(storageState)
    console.log(state);
    if(state) this.setState({...state})

  }

  updateLocalStorage() {
    setTimeout(() => recipeStorage.setItem(`${STORAGE_PREFIX}-recipe`, JSON.stringify(this.state)), 1)
  }

  /*
   * Receives a recipe, adds it to localstorage and updates recipes array
  */
  addRecipe(recipe) {
    console.log(recipe);
     const {
      recipes
     } = this.state

    const newRecipes = [...recipes, recipe]
    this.setState({recipes: newRecipes})
    this.updateLocalStorage()
  }

  /*
   * Receives a reciper and some identifier, updates the current values stored in local storage and updates recipes array 
  */
  updateRecipe(recipe, idx) {
    const newRecipes = [... this.state.recipes];
    newRecipes[idx] = recipe
    this.setState({recipes: newRecipes, currentRecipe: recipe})
    this.updateLocalStorage()
  }

  removeRecipe(idx) {
    const newRecipes = [...this.state.recipes];
    newRecipes.splice(idx, 1)
    const {curIdx} = this.state
    const newIdx = curIdx >= newRecipes.length ? curIdx - 1 : curIdx
    this.setState({recipes: newRecipes, curIdx: newIdx, currentRecipe: newRecipes[newIdx]})
    this.updateLocalStorage()
  }

  displayRecipe(recipe, idx) {
    this.setState({currentRecipe: recipe, curIdx: idx})
    this.updateLocalStorage()
  }

  render() {
    const {
      currentRecipe,
      recipes,
      curIdx
    } = this.state
    return (
      <div className="App">
        <Header />
        
        <RecipeAll
          removeRecipe={this.removeRecipe}
          addRecipe={this.addRecipe}
          recipes={recipes}
          displayRecipe={this.displayRecipe} />
        <RecipeDetail
          removeRecipe={this.removeRecipe}
          idx={curIdx}
          updateRecipe={this.updateRecipe}
          detail={currentRecipe}/>
      </div>
    );
  }
}

export default App;
