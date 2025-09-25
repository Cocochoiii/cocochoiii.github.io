import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
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
    useEffect(() => {
        const onScroll = () => {
            const h = document.documentElement;
            const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
            h.style.setProperty('--progress', `${Math.max(0, Math.min(1, scrolled)) * 100}%`);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className="App">
            <div className="scroll-progress" />
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
