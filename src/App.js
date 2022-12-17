import './App.css';
import { useEffect, useState } from 'react';
import video from './food.mp4';
import icon from './751463.png';
import RecipiesComponent from './RecipiesComponent';
import Button from './Button';

function App() {
  
  const MY_ID = process.env.REACT_APP_ID;
  const MY_KEY = process.env.REACT_APP_KEY;

  const [mySearch, setMySearch] = useState('');
  const [myRecipies, setMyRecipies] = useState([]);
  const [wordSubmitted, setWordSubmitted] = useState('');
  const [myFiltred, setMyFiltred] = useState([]);

  useEffect( () => {
    async function fetchData() {
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}&app_id=${MY_ID}&app_key=${MY_KEY}`)
      const data = await response.json()
      setMyRecipies(data.hits)
      setMyFiltred(data.hits)
    }
    fetchData()
  },[wordSubmitted, MY_ID, MY_KEY])

  const RecipeSearch = (e) => {
    setMySearch(e.target.value)
  }

  const finalSearch = (e) => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  }

  const ChosenMeals = (dishType) => {
    const newMeals = myRecipies.filter(item => item.recipe.dishType[0] === dishType);
    setMyFiltred(newMeals);
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
          <input 
            className='search' 
            placeholder='ingredient...' 
            onChange={RecipeSearch} value={mySearch} />
        </form>
          <button 
            type='submit'
          >
            <img src={icon} width='35px' alt='button search' />
          </button>
      </div>

      <div className='container-btn'>
        <Button filtredMeals={ChosenMeals}/>
      </div>

      <div className='container-recipies'>
        {myFiltred.map((item, index) => (
          <RecipiesComponent 
            key={index}
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
