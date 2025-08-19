import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Education } from "./components/Education";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import ExperienceCards from "./components/ExperienceCards";
import WhatIDo from "./components/WhatIDo";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
        <WhatIDo />
      <Education />
      <Skills />
        <ExperienceCards />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );

}


export default App;
