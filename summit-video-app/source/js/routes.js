import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import URL from './utils/url';

import App from './components/pages/App';
import AllVideos from './components/pages/AllVideos';
import Events from './components/pages/Events';
import EventDetail from './components/pages/EventDetail';
import Speakers from './components/pages/Speakers';
import SpeakerDetail from './components/pages/SpeakerDetail';
import Featured from './components/pages/Featured';
import Search from './components/pages/Search';

const Routes = (baseURL) => (
    <Router history={browserHistory}>
      <Route path={baseURL} component={App}>
      	<IndexRoute component={AllVideos} />
        <Route path="events" component={Events}/>
        <Route path="events/show/:id" component={EventDetail}/>
        <Route path="speakers" component={Speakers} />
        <Route path="speakers/show/:id" component={SpeakerDetail} />
        <Route path="featured" component={Featured} />
        <Route path="search" component={Search} />
      </Route>
    </Router>
);

export default Routes;