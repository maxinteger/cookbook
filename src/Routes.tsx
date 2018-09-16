import {History} from 'history'
import * as React from 'react'
import {Route, Router, Switch} from 'react-router-dom'
import {Header} from './components/Header'
import {Home} from './pages/Home'
import {RecipeDetailPage} from './pages/RecipeDetailPage'
import {IngredientList} from './pages/IngredientList'

interface RoutersProps {
  history: History
}

export const Routes = function(props: RoutersProps) {
  return (
    <Router history={props.history}>
      <div>
        <Header />
        <div className="content app-content">
          <Switch>
            <Route path="/" exact component={Home} />
						<Route exact path="/recipe/:recipeId" component={RecipeDetailPage} />
						<Route exact path="/ingredient-types" component={IngredientList} />
            {/*<Route component={Page404} />*/}
          </Switch>
        </div>

      </div>
    </Router>
  )
}
