import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'
import {store, persistor} from "./store"
import ErrorBoundry from "./components/error-boundry"
import SportServiceContext from "./components/sport-service-context"
import {BrowserRouter as Router} from "react-router-dom"
import App from './components/app'
import AuthService from './service/authService'
import TraineeService from './service/traineeService'
import CoachService from './service/coachService'
import PostService from './service/postService'
import GymService from './service/gymService'
import CategoryService from './service/categoryService'

const authService = new AuthService()
const traineeService = new TraineeService()
const postService = new PostService();
const coachService = new CoachService();
const gymService = new GymService();
const categoryService = new CategoryService()

ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorBoundry>
          <SportServiceContext.Provider
            value={{
              authService: authService, 
              traineeService: traineeService,
              postService: postService,
              gymService: gymService,
              coachService: coachService,
              categoryService: categoryService
            }}>
            <Router>
              <App/>
            </Router>
          </SportServiceContext.Provider>
        </ErrorBoundry>
      </PersistGate>
    </Provider>,
    document.getElementById('root')
  )