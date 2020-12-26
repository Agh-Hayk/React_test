import logo from './logo.svg';
import Header from './components/Homework5/Header'
import Footer from './components/Homework5/Footer'
import Section from './components/Homework5/Section'
import Product from './components/Homework6.7/Product'
import ToDo from '../src/components/Homework8,9/ToDo' 
import './App.css';

function App() {
  return (
    <div className="App">
        <h2>Homework 5</h2>
        <Header />
        <Section />
        <Footer />
        <h2>Homework 6,7</h2>
        <Product name="BMW 745e" price="950$" description="The standard features of the BMW 745e xDrive iPerformance include 3.0L I-6 389hp hybrid gas intercooled turbo engine, 8-speed automatic transmission with overdrive..." />
        <h2>Homework 8,9</h2>
        <ToDo />
    </div>
  );
}

export default App;
