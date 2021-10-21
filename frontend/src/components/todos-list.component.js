import React, { Component } from 'react'
import axios from 'axios'
import { Input } from "semantic-ui-react";
import ReactTable from "react-table"; 
import 'react-table/react-table.css'
import { Link } from 'react-router-dom';
//import "./styles.css";
const getColor = (type) => {
  if (type === "Classique" ) return 'red';
  if (type === "IP" ) return 'blue';
  return '';
};
export default class TodosList extends Component {
  constructor(props){
    super(props)
    this.deleteTodo = this.deleteTodo.bind(this)
    this.state = {
      todos: [],
      filteredData: [],
      loading:true,
      searchInput: ""

    }
  }
  async getTodos() {
    axios.get('http://localhost:4000/todos/')
        .then(response => {
          console.log(response.data)

            this.setState(
                {
                    todos: response.data,
            });
        })
        .catch(function (error) {
            console.log(error);
        })
}
  componentDidMount(){
    this.getTodos()
  }
  deleteTodo(id) {
    axios.delete('http://localhost:4000/todos/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      todos: this.state.todos.filter(el => el._id !== id)
    })
  }
  handleChange = event => {
    this.setState({ searchInput: event.target.value }, () => {
      this.globalSearch();
    });
  };

  globalSearch = () => {
    let { searchInput,todos } = this.state;
    let filteredData = todos.filter(value => {
      return (
        value.central.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.constructeur.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.type.toLowerCase().includes(searchInput.toLowerCase()) 

      );
    });
    this.setState({  filteredData });
  };
 
  render() {
    let { filteredData,todos, searchInput } = this.state;

    const columns = [{  
      Header: 'Central',  
      accessor: 'central',
     }
     ,{  
      Header: 'Constructeur',  
      accessor: 'constructeur' ,
      }
     
     ,{  
     Header: 'Type',  
     accessor: 'type' ,
     Cell: row => {
     return  ( <span className="badge" style={{ color: getColor(row.original.type) }} >
          {row.original.type}
        </span>
      )
     }
    }
     ,{  
     Header: 'Equipements',  
     accessor: 'equipements',
     },
     {  
      Header: 'Nombre abonnées',  
      accessor: 'nombreab',
      },
      {  
        Header: 'Taux',  
        accessor: 'taux',
        },
        {  
          Header: 'Actions',  
          accessor: 'actions',
          
      Cell: (row) => (
        
        <div>

         <Link to={"/edit/"+row.original._id}>Edit</Link> | <a href="#" onClick={() => { this.deleteTodo(row.original._id) }}>Delete</a>
         </div>
      )
                    }
            
  ]
    return (
      <div>
        <br />
        <Input
          size="large"
          name="searchInput"
          value={searchInput || ""}
          onChange={this.handleChange}
          label="Search"
        />
        <br />
        <br />
        <ReactTable
          data={filteredData && filteredData.length ? filteredData : todos}
          columns={columns}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    )
  }
}