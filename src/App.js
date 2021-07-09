
import './App.css';
import DropDownSelect from './components/DropDownSelect';
import ValidateField from './components/ValidateField';

function App() {
  return (
    <div>
      <div style={{margin: "20px"}}>
        <h3>SmartyStreets</h3>
        <DropDownSelect />
        <ValidateField service="smartyStreets" />
      </div>
      <div style={{margin: "20px"}}>
        <h3>USPS API</h3>
        <ValidateField service="usps" />
      </div>
    </div>
  );
}

export default App;
