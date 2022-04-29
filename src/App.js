import './App.css';
import { useEffect, useState } from 'react'
import video from './food.mp4'
import icon from './751463.png'
import RecipiesComponent from './RecipiesComponent';
import Button from './Button';

function App() {

  const MY_ID = '5ff670c9'
  const MY_KEY = '8c28f0555c9644bfae5598e5f086ee39'

  const [mySearch, setMySearch] = useState('')
  const [myRecipies, setMyRecipies] = useState([])
  const [wordSubmitted, serWordSubmitted] = useState('')
  const [myFiltred, setMyFiltred] = useState([])

  useEffect( () => {
    async function fetchData() {
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}&app_id=${MY_ID}&app_key=${MY_KEY}`)
      const data = await response.json()
      setMyRecipies(data.hits)
      setMyFiltred(data.hits)
    }
    fetchData()
  },[wordSubmitted])

  const RecipeSearch = (e) => {
    setMySearch(e.target.value)
  }

  const finalSearch = (e) => {
    e.preventDefault()
    serWordSubmitted(mySearch)
  }

  const ChosenMeals = (dishType) => {
    const newMeals = myRecipies.filter(item => item.recipe.dishType[0] === dishType)
    setMyFiltred(newMeals)
  }

  return (
    <div className="App">
      <div className="container">
        <video autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>
        <h1>Find a Recipe</h1>
      </div>

      <div className="container">
        <form onSubmit={finalSearch}>
          <input className='search' placeholder='ingredient...' onChange={RecipeSearch} value={mySearch}></input>
        </form>
          <button onClick={finalSearch}>
            <img src={icon} width='35px' alt='button search' />
          </button>
      </div>

      <div className='container-btn'>
        <Button filtredMeals={ChosenMeals}/>
      </div>

      <div className='container-recipies'>
        {myFiltred.map((item, index) => (
          <RecipiesComponent key={index}
          label={item.recipe.label} 
          image={item.recipe.image} 
          calories={item.recipe.calories}
          ingredients={item.recipe.ingredientLines}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
