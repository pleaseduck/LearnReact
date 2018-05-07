import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Новости</h1>
        </header>
        <TestInput />
        <News data = {myNews}/>
      </div>
    );
  }
}


var myNews = [
  {
    author: "Саша печкин",
    text: "В четверг, четвертого числа...",
    bigText: "в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж."
  },
  {
    author: "Просто Вася",
    text: "Считаю, что $ должен стоить 35 рублей!",
    bigText: "А евро 42!"
  },
  {
    author: "Гость",
    text: "Бесплатно. Скачать. Лучший сайт - http://localhost:3000",
    bigText: "На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение"
  }
]

class News extends Component {

  render() {
    var data = this.props.data;
    var newsTemplate;
    if (data.length > 0) {
      newsTemplate = data.map(function(item,index) {
        return(
          <div key={index}>
            <Article data={item}/>
          </div>
        );
      })
    } else {
      newsTemplate = <div>К сожалению новостей нет</div>
    }
    return(
      <div className="news">
        {newsTemplate}
        <strong className={data.length>0? 'news_count': "none"}>Всего новостей: {data.length}</strong>
      </div>
    )
  }
}

class Article extends Component {

  constructor(props) {
    super(props);
    this.state = { visible: false  };
  }
  readMoreClick(e) {
    e.preventDefault();
    this.setState({visible: true});
  }
  render() {
    var visible = this.state.visible
    var author = this.props.data.author;
    var text = this.props.data.text;
    var bigText = this.props.data.bigText;
    return (
      <div className= "article">
        <p className = "news__author">
          {author} :
        </p>
        <p className = "news__text">
          {text}
        </p>
        <a href="#" onClick={this.readMoreClick.bind(this)} className = {!visible? 'news__readmore': "none"}>Подробнее</a>
        <p  className={visible? 'news__readmore': "none"}>
        {bigText}
        </p>
      </div>
    )
  }
}

class TestInput extends Component {
  componentDidMount() { 
   ReactDOM.findDOMNode(this.refs.myTestInput).focus();
  }
  onButtonClickHandler(e) {
    e.preventDefault();
    alert(ReactDOM.findDOMNode(this.refs.myTestInput).value);
  }
  render() {
    return (
      <div>
        <input className='test-input' defaultValue='' ref='myTestInput' placeholder='Введите значение'/>
        <button onClick={this.onButtonClickHandler.bind(this)} >Кнопка</button>
      </div>
    )
  }
}
export default App;
