function Button({filtredMeals}) {
    return(
        <div>
            <button className="filter-bth" onClick={() => filtredMeals('salad')}>salad</button>
            <button className="filter-bth" onClick={() => filtredMeals('starter')}>starter</button>
            <button className="filter-bth" onClick={() => filtredMeals('soup')}>soup</button>
            <button className="filter-bth" onClick={() => filtredMeals('main course')}>main course</button>
            <button className="filter-bth" onClick={() => filtredMeals('sandwiches')}>sandwiches</button>
            <button className="filter-bth hidden" onClick={() => filtredMeals('bread')}>bread</button>
            <button className="filter-bth" onClick={() => filtredMeals('condiments and sauces')}>sauces</button>
            <button className="filter-bth" onClick={() => filtredMeals('dessert')}>dessert</button>
            <button className="filter-bth" onClick={() => filtredMeals('drinks')}>drinks</button>
        </div>
    )
}

export default Button

