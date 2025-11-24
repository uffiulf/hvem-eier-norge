import Section1_Hook from './components/Section1_Hook';
import Section2_Facts from './components/Section2_Facts';
import Section3_Space from './components/Section3_Space';
import './App.css';

function App() {
  return (
    <main className="app-container">
      <Section1_Hook />
      <Section2_Facts />
      <Section3_Space />
      <div className="spacer" style={{ height: '50vh', background: '#000' }}></div>
    </main>
  );
}

export default App;

