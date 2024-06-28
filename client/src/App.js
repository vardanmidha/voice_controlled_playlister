import './App.css';
import { React } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store';
import {
  AppBanner,
  HomeWrapper,
  LoginScreen,
  RegisterScreen,
  AllListScreen,
  SplashScreen,
  HomeScreen,
  UserScreen,
  SuperScreen,
} from './components';
import SpellCheck from './components/spellCheck';
import VoiceSearch from './components/VoiceSearch';

import ApiKey from './components/ApiKey';
import spellCheck from './components/spellCheck';
import System1 from './components/System1';
import FileUpload from './components/System1';
const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <GlobalStoreContextProvider>
          <AppBanner />
          <Switch>
            <Route path="/" exact component={SplashScreen} />
            <Route path="/Playlister/" exact component={SuperScreen} />
            <Route path="/login/" exact component={LoginScreen} />
            <Route path="/register/" exact component={RegisterScreen} />
            <Route path="/Playlister/spellCheck/" exact component={SpellCheck} />
            <Route path="/Playlister/voiceSearch/" exact component={VoiceSearch} />
          </Switch>
        </GlobalStoreContextProvider> 
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
