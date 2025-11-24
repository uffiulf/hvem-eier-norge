import Section1_Hook from './components/Section1_Hook';
import Section2_Facts from './components/Section2_Facts';
import Section3_Space from './components/Section3_Space';
import Section4_Comparative from './components/Section4_Comparative';
import Section5_Concept from './components/Section5_Concept';
import Section6_Consequences from './components/Section6_Consequences';
import Section7_Politics from './components/Section7_Politics';
import Section8_Conclusion from './components/Section8_Conclusion';
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
      <Section7_Politics />
      <Section8_Conclusion />
    </main>
  );
}

export default App;

