import Section1_Hook from './components/Section1_Hook';
import Section2_Facts from './components/Section2_Facts';
import Section3_Space from './components/Section3_Space';
import Section4_Comparative from './components/Section4_Comparative';
import Section5_Concept from './components/Section5_Concept';
import Section6_Consequences from './components/Section6_Consequences';
import './App.css';

function App() {
  return (
    <main className="app-container">
      <Section1_Hook />
      <Section2_Facts />
      <Section3_Space />
      <Section4_Comparative />
      <Section5_Concept />
      <Section6_Consequences />
      <div className="spacer" style={{ height: '50vh', background: '#000' }}></div>
    </main>
  );
}

export default App;

