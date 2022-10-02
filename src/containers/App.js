import { Component } from 'react';
import CardList from '../components/card-list/card-list.component';
import SearchBar from "../components/search-bar/search-bar.component";
import "tachyons";
import './App.css';

class App extends Component {
    constructor() {
      super();
      this.state = {
        monsters: [],
        searchField: '',
      }
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users")
          .then((response) => response.json())
          .then((users) => this.setState(() => {
            return {monsters: users}
          }))    
    }

    onSearchChange = (event) => {
      const searchField = event.target.value.toLocaleLowerCase();
      this.setState(() => { return { searchField } });
    }

    render() {
      const { monsters, searchField } = this.state;
      const { onSearchChange } = this;
      
      const filteredMonsters = monsters.filter((monster) => {
        return monster.name.toLocaleLowerCase().includes(searchField); 
      });

      return (
        <div className="App">
          <h1 className="app-title">Monster Rolodex</h1>
          <SearchBar 
            className="monsters-search-box"
            onChangeHandler={onSearchChange}
            placeHolder={"search monsters"}/>

          <CardList 
            monsters={filteredMonsters}/>
            
            
        </div>
      );
    
}}
export default App;
