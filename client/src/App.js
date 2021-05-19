import { Base } from './component/UI/layout/Base'
import { Routes } from './routes'
import { BrowserRouter } from 'react-router-dom'


function App() {

  return (
    <BrowserRouter>
      <Base>
        <Routes />
      </Base>
    </BrowserRouter>

  );
}

export default App;