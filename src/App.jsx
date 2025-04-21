import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Blog from './pages/Blog';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NotFound from  './pages/NotFound';
import Privacy from   './pages/Privacy';
import Terms from     './pages/Terms';
import Aboutus from   './pages/Aboutus';



import DashboardC from './pages/DashboardC'
import PricingPro from "./pages/PricingPro"
import PricingBasic from './pages/PricingBasic'
import PricingEnterprice from './pages/PricingEnterprice'


import ProtectedRoute from './components/ProtectedRoute';



import Explore from './pages/Explore';
import AIBidGenerator from './pages/features/Bids';
import AIBidEnhancer from './pages/features/BidsEnhance';
import TenderEnhancer from './pages/features/TendersEnhance';
import ProposalEnhancer from './pages/features/ProposalsEnhance';
import AITenderGenerator from './pages/features/Tenders';
import AIProposalGenerator from './pages/features/Proposals';













function App() {
  return (  
    <Routes>
      <Route path ='/admin/*' element ={<DashboardC/>}></Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="blog" element={<Blog />} />

          
        
          
            
          
        
          
          <Route path="explore"  element={<Explore/>} />
     
          
          

          <Route path="pricing" element={<Pricing />} />
        <Route element={<ProtectedRoute />}>

          <Route path="pricing/pro" element={<PricingPro />} />
                    <Route path="pricing/basic" element={<PricingBasic />} />
                    <Route path="pricing/enterprise" element={<PricingEnterprice />} />
          
          <Route path="/ai-generated-bids"  element={<AIBidGenerator    />} />
          <Route path="/ai-generated-tenders"  element={<AITenderGenerator    />} />
          <Route path="/ai-generated-proposals"  element={<AIProposalGenerator    />} />
          
          <Route path="/enhance-bids"  element={<AIBidEnhancer    />} />
          <Route path="/enhance-tenders"  element={<TenderEnhancer    />} />
          <Route path="/enhance-proposals"  element={<ProposalEnhancer    />} />
        
          
        </Route>
        
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="privacy" element={<Privacy/>} />
        <Route path="terms" element={<Terms/>} />
        <Route path="aboutus" element={<Aboutus/>} />
        
        
        <Route path="*" element={<NotFound />} />
      
      
      


      </Route>
    </Routes>
  );
}

export default App;