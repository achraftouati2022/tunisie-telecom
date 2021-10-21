import React, {Component} from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {

    constructor(props) {
        super(props);

        this.onChangeTodoCentral = this.onChangeTodoCentral.bind(this);
        this.onChangeTodoConstructeur = this.onChangeTodoConstructeur.bind(this);
        this.onChangeTodoType = this.onChangeTodoType.bind(this);
        this.onChangeTodoEquipements = this.onChangeTodoEquipements.bind(this);
        this.onChangeTodoNombreab = this.onChangeTodoNombreab.bind(this);
        this.onChangeTodoTaux = this.onChangeTodoTaux.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            central: '',
            constructeur: '',
            type: '',
            equipements:'',
            nombreab:'',
            taux:'',
        }
    }

    onChangeTodoCentral(e) {
        this.setState({
            central: e.target.value
        });
    }

    onChangeTodoConstructeur(e) {
        this.setState({
            constructeur: e.target.value
        });
    }

    onChangeTodoType(e) {
        this.setState({
            type: e.target.value
        });
    }
    onChangeTodoEquipements(e) {
        this.setState({
            equipements: e.target.value
        });
    }
    onChangeTodoNombreab(e) {
        this.setState({
            nombreab: e.target.value
        });
    }
    onChangeTodoTaux() {
        if (isNaN(((this.state.nombreab/this.state.equipements)*100).toFixed(2) )) {
          return 0
        } else {
            return Number(((this.state.nombreab/this.state.equipements)*100).toFixed(2))
            
    }
    }
    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Todo Central: ${this.state.central}`);
        console.log(`Todo constructeur: ${this.state.constructeur}`);
        console.log(`Todo type: ${this.state.type}`);
        console.log(`Todo equipements: ${this.state.equipements}`);
        console.log(`Todo nombreab: ${this.state.nombreab}`);
        console.log(`Todo taux: ${this.onChangeTodoTaux()}`);
        const newTodo = {
            central: this.state.central,
            constructeur: this.state.constructeur,
            type: this.state.type,
            equipements: this.state.equipements,
            nombreab: this.state.nombreab,
            taux: this.onChangeTodoTaux(),
        }

        axios.post('http://localhost:4000/todos/add', newTodo)
            .then(res => console.log(res.data));
        this.setState({
            central: '',
            constructeur: '',
            type: '',
            equipements:'',
            nombreab:'',
            taux:'',
        })
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Nouveau Equipement</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Central: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.central}
                                onChange={this.onChangeTodoCentral}
                                />
                    </div>
                    <div className="form-group">
                        <label>Constructeur: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.constructeur}
                                onChange={this.onChangeTodoConstructeur}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="typeOptions"
                                    id="typeip"
                                    value="IP"
                                    checked={this.state.type==='IP'}
                                    onChange={this.onChangeTodoType}
                                    />
                            <label className="form-check-label">IP</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="typeOptions"
                                    id="typeclassique"
                                    value="Classique"
                                    checked={this.state.type==='Classique'}
                                    onChange={this.onChangeTodoType}
                                    />
                            <label className="form-check-label">Classique</label>
                        </div>
                        <div className="form-group">
                        <label>Equipements: </label>
                        <input  type="number"
                                className="form-control"
                                value={this.state.equipements}
                                onChange={this.onChangeTodoEquipements}
                                />
                        </div>
                        <div className="form-group">
                        <label>Nombre d'abonnées: </label>
                        <input  type="number"
                                className="form-control"
                                value={this.state.nombreab}
                                onChange={this.onChangeTodoNombreab}
                                />
                        </div>
                       
                    </div>
                    <div className="form-group">
                        <input type="submit" value="VALIDER" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}