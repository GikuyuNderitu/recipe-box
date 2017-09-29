import React, {Component} from 'react';
import './RecipeDetail.css';

import {RecipeModal} from '../RecipeAll/RecipeAll'

const DefaultView = (props) => (
    <section className="RecipeDetail default">
        <h1>Recipe Book</h1>
        <p>
            Welcome to Recipe Book! you can add a recipe with the "+" button to the left. You can also select any recipe on the side list to see that recipe and its ingredients
        </p>
    </section>
)

const Ingredient = (props) => (
    <li className="Ingredient">{props.name}</li>
)

class RecipeDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false
        }

        this.toggleModal = this.toggleModal.bind(this);
    }

    renderIngredients() {
        return this.props.detail.ingredientArray.map((val, idx) => (
            <Ingredient key={idx} name={val} />
        ))
    }

    toggleModal() {
        this.setState({modalVisible: !this.state.modalVisible})
    }

    render() {
        const {detail} = this.props
        const {modalVisible} = this.state
        return (
            detail === undefined ? <DefaultView /> :
            <section className="RecipeDetail">
                <h1>{detail.name}</h1>

                {modalVisible ? 
                    <RecipeModal
                        addRecipe={this.props.updateRecipe}
                        idx={this.props.idx}
                        toggleModal={this.toggleModal}
                        ingredients={this.props.detail.ingredientArray.join(", ")}
                        name={this.props.detail.name} /> :
                    null
                }

                <ul className="RecipeDetail-ingredients">
                    {this.renderIngredients()}
                </ul>

                <button
                    onClick={this.toggleModal}
                    className="RecipeDetail-edit" >Edit</button>
                <button className="RecipeDetail-remove">Remove</button>
            </section>
        )
    }
}

export default RecipeDetail;