import React from 'react';
import { Switch, Redirect, Route} from 'react-router-dom'
import {
    Equipe,
    HomePage,
    WhitePaper,
    RoadMap,
    Prestataire,
    SCPresta,
    SC,
    CGV,
    Commentaires,
    Creation,
    Profil
} from './views'

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/Homepage"
      />
      <Route path="/Homepage">
          <HomePage />
      </Route>
      <Route path="/WhitePaper">
          <WhitePaper />
      </Route>
      <Route path="/Equipe">
          <Equipe />
      </Route>
      <Route path="/WhitePaper">
          <WhitePaper />
      </Route>
      <Route path="/RoadMap">
          <RoadMap />
      </Route>
      <Route path="/Devenir prestataire">
          <Prestataire />
      </Route>
      <Route path="/Service client/prestataire">
          <SCPresta />
      </Route>
      <Route path="/Service client">
          <SC />
      </Route>
      <Route path="/CGV">
          <CGV />
      </Route>
      <Route path="/Retour sur votre experience">
          <Commentaires />
      </Route>
      <Route path="/Creation de l'offre">
          <Creation />
      </Route>
      <Route path="/Profil">
         <Profil />
      </Route>
    </Switch>
  );
};

export default Routes;