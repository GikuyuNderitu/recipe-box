import React, { Component } from 'react';
import './RecipeAll.css';

const Recipe = (props) => (
    <li onClick={() => props.toggleDisplay(props.recipe, props.idx)}
        className="Recipe">
        <span>{props.recipe.name}</span> 
        {/* Update the delete */}
        <button
            onClick={e => {
                e.stopPropagation()
                props.removeRecipe(props.idx)
            }} 
            className="Recipe-delete">X</button>
    </li>    
)


class MyToolbar extends Component {
    render() {
        return (
            <div className="MyToolbar">
                <h2>All Recipes</h2>
                <button onClick={this.props.toggleModal}>+</button>
            </div>
        )
    }
}

export class RecipeModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.name ? props.name: '',
            ingredients: props.ingredients ? props.ingredients : '',
            ingredientArray: [],
        }

        this.handleEdit = this.handleEdit.bind(this);
    }

    componentDidMount() {
        this.name.focus()
        this.ingredients.value = this.state.ingredients
        this.name.value = this.state.name
    }

    handleEdit(e) {
        e.preventDefault();
        const {
            name,
            ingredients
        } = this.state

        const ingredientArray = ingredients.split(',').map(val => val.trim()).filter(val => val !== '')

        const newRecipe = {
            name,
            ingredientArray    
        }

        this.props.addRecipe(newRecipe, this.props.idx)
        this.props.toggleModal();
    }

    handleNameChange(e) {
        this.setState({name: e.target.value})
    }
    
    handleIngredientChange(e) {
        const curval = e.target.value
        this.setState({ingredients: curval})      
    }

    render() {
        return (
                <div className="Recipe-Modal" onClick={this.props.toggleModal}>
                    <div className="Recipe-Modal-inner" onClick={e => e.stopPropagation()}>
                        <h1>Add a Recipe</h1>
            
                        <form className="Recipe-Add-Style" onSubmit={this.handleEdit}>
                            <label>
                                Name:
                                <input
                                    onChange={(e) => this.handleNameChange(e)}
                                    ref={input => this.name = input} type="text"/>
                            </label>
                            <label>
                                Ingredients:
                                <textarea
                                    ref={textarea => this.ingredients = textarea}
                                    onChange={e => this.handleIngredientChange(e)}></textarea>
                            </label>
                            <button type="submit">Add recipe</button>
                        </form>
                    </div>
                </div>
            )
    }
} 


class RecipeAll extends Component {
    constructor(props) {
        super(props);
        this.state={
            modalVisible: false
        }

        this.toggleModal = this.toggleModal.bind(this);
    }

    renderRecipes() {
        return this.props.recipes.map((val, idx) => (
            <Recipe
                removeRecipe={this.props.removeRecipe}
                toggleDisplay={this.props.displayRecipe}
                key={idx}
                idx={idx}
                recipe={val} />
        ))
    }

    toggleModal() {
        this.setState({modalVisible: !this.state.modalVisible})
    }

    render() {
        const {
            modalVisible
        } = this.state
        return(
            <aside className="RecipeAll">
                <MyToolbar toggleModal={this.toggleModal}/>

                {modalVisible ? 
                    <RecipeModal
                        addRecipe={this.props.addRecipe}
                        toggleModal={this.toggleModal} /> :
                    null}
                <ul id="recipeList">
                {this.renderRecipes()}
                </ul>
            </aside>
        )
    }
}

export default RecipeAll;