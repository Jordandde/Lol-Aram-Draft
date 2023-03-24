import React, {Component} from "react";
import axios from 'axios';
//import {Card, Header, Form, Input, Icon} from "semantic-ui-react";

interface IProps {}

interface IState {
    data: string[]
    rolled: boolean
}

class Generator extends Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            rolled: false,
            data: [],
        }
    }
    
    componentDidMount() {
        this.getChampions();
    }

    getChampions = () => {
        axios.get('https://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json').then(
            (res: any) => {
                this.setState({
                    data: Object.keys(res.data.data),
                });
                console.log(this.state.data);
            }
        );
    }
    getRandChamps = () => {
        let champs = [];
        for(let i = 0; i < 15; i++) {
            champs.push(this.state.data[Math.floor(Math.random() * this.state.data.length)]);
        }
       return(
        <h3>{champs.map(champ => (
            <li key={champ}>
                <img src={`https://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/${champ}.png`}/>
            </li>
        ))}</h3>
       )
    }
    render() {
    return (
        <div>
          <h1>Champions:</h1>
          <ul>
            {this.state.data.map(champion => (
              <li key={champion}>
                <img src={`https://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/${champion}.png`}/>
                {champion}</li>
            ))}
          </ul>
          <h2>Random 15</h2>
          <ul>
            {this.getRandChamps()}
          </ul>
        </div>
      )
            }
}

export default Generator