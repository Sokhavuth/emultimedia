import {Route} from 'react-router-dom';

import DHeader from '../dashboard/dheader/dheader.js';
import DSidebar from '../dashboard/dsidebar/dsidebar.js';
import DCategory from '../dashboard/dcategory/dcategory.js';
import DPost from '../dashboard/dpost/dpost.js';
import Footer from '../footer/footer.js';

const adminRouter = [
  <Route exact path="/admin">
    <DHeader dTitle="Dashboard" />
    <div className='region'>
      <DSidebar />
    </div>
  </Route>,

  <Route exact path="/admin/category">
    <DHeader dTitle="Category" />
    <div className='main region'>
      <DSidebar />
      <DCategory />
      <p></p>
      <div style={{textAlign: 'center'}}>
        <Footer />
      </div>
    </div>
  </Route>,

  <Route exact path="/admin/post">
  <DHeader dTitle="Post" />
  <div className='main region'>
    <DSidebar />
    <DPost />
    <p></p>
    <div style={{textAlign: 'center'}}>
      <Footer />
    </div>
  </div>
</Route>
];

export default adminRouter;