import React, {Component} from 'react';
import logo from './logo.svg';
import Customer from './components/Customer'
import './App.css';
const customer = [ 
  {
  'id': 1,
  'image': 'https://placeimg.com/64/64/1',
  'name': '^^ㅣ부장',
  'birthday': '961222',
  'gender': '남자',
  'job': '대학생'
  },
  {
    'id': 2,
    'image': 'https://placeimg.com/64/64/2',
    'name': '^^ㅣ부장',
    'birthday': '961222',
    'gender': '남자',
    'job': '대학생'
    }
]
class App extends Component {
  render(){
    return (
      <div>
        {
          customer.map(c => {
            return (
              <Customer 
                key ={c.id}
                id={c.id}
                image={c.image}
                name={c.name}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job}
              />
            )
          })
        }
      </div>
    );
  }
  
}

export default App;
