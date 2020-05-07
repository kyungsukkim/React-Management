import React, {Component} from 'react';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const sytles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit *3,
    overflowX: "auto"
  },
  table : {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
})

/*
  React Lib 순서
  
  1) constructor()

  2) componentWillMound()

  3) render()

  4) compoenetDidMount()

  props or state 가변경되는 경우 => shouldComponentUpdate() 렌더함수를 불러와서 
  뷰를 갱신해주게 된다. 상태의 변화를 알아서 감지해서 다시 뿌려주니 상태관리만 잘 하면된다.


*/



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      completed: 0
    }
  }

  stateRefresh = () => {
    this.setState({
      customers:'',
      completed: 0
    });
    this.callApi()
    .then(res => this.setState({customers: res}))
    .catch(err => console.log(err));
  }


  //API에서 데이터 받아올때 쓰는 친구
  //API를 불러와서 특정한 뷰를 출력하고자 한다면 비동기적으로 이친구를 호출
  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1});
  }


  render(){
    const {classes}= this.props;
    return (
      <div>
      <Paper className = {classes.root}>
        <Table className = {classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
          this.state.customers ? this.state.customers.map(c => {
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
          : 
          <TableRow>
            <TableCell colSpan ="6" align="center">
              <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
            </TableCell>
          </TableRow>
          } 
          </TableBody>
        </Table>
      </Paper>
      <CustomerAdd stateRefresh={this.stateRefresh}/>
      </div>
    );
  }
  
}

export default withStyles(sytles)(App);
