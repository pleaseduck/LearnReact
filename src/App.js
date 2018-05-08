import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
var EventEmitter = require('wolfy87-eventemitter');
var ee = new EventEmitter();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { news: myNews };
  }
  componentDidMount() {
    var self = this;
    ee.addListener('News.add', function(item) {
    var nextNews = item.concat(self.state.news);
    self.setState({news: nextNews});
  });
  }
  componentWillUnmount() {
    ee.removeListener('News.add');
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Новости</h1>
        </header>
        <Add />
        <News data = {this.state.news}/>
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

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agreeNotChecked: true,
      authorIsEmpty: true,
      textIsEmpty: true
    };
  }
  componentDidMount() {
   ReactDOM.findDOMNode(this.refs.author).focus();
  }
  onCheckRuleClick(e) {
    this.setState({agreeNotChecked: !this.state.agreeNotChecked})
  }
  onBtnClick(e) {
      e.preventDefault();
      var author = ReactDOM.findDOMNode(this.refs.author).value;

      var textEl = ReactDOM.findDOMNode(this.refs.text);
      var text = textEl.value;

      var item = [{
        author: author,
        text: text,
        bigText: '...'
      }];

  ee.emit('News.add', item);

  textEl.value = '';
  this.setState({textIsEmpty: true});

  }
  onFieldChange(fieldName,e) {
    if (e.target.value.trim().length > 0) {
    this.setState({[''+fieldName]:false})
  } else {
    this.setState({[''+fieldName]:true})
  }
  }
  render() {
    var agreeNotChecked = this.state.agreeNotChecked,
        authorIsEmpty = this.state.authorIsEmpty,
        textIsEmpty = this.state.textIsEmpty;
    return (
      <form className='add cf'>
        <input
          type='text'
          className='add__author'
          defaultValue=''
          placeholder='Ваше имя'
          ref='author'
          onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
        />
        <textarea
          className='add__text'
          defaultValue=''
          placeholder='Текст новости'
          ref='text'
          onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
        ></textarea>
        <label className='add__checkrule'>
          <input type='checkbox'
            ref='checkrule'
            onClick={this.onCheckRuleClick.bind(this)}/>
             Я согласен с правилами
        </label>
        <button
          className='add__btn'
          ref='alert_button'
          disabled={agreeNotChecked || authorIsEmpty || textIsEmpty}
          onClick={this.onBtnClick.bind(this)}>
          Добавить новость
        </button>
      </form>
    )
  }
}
export default App;
