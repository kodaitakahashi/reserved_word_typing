var MainContents=React.createClass({displayName:"MainContents",render:function(){return React.createElement("div",null,React.createElement(Button,null))}}),Button=React.createClass({displayName:"Button",getInitialState:function(){return{ruby:1,selectProgramId:null,pushed:!1}},setProgramId:function(e){var t=e.target.value;this.setState({selectProgramId:t,pushed:!0})},canselHandling:function(){this.setState({selectProgramId:null,pushed:!1})},render:function(){var e,t;return this.state.pushed?(e=React.createElement("button",{className:this.state.pushed?"pure-menu-item":"pushed-display-none",onClick:this.canselHandling},"キャンセル"),t=React.createElement(TypingWindow,{programId:this.state.selectProgramId})):(e=React.createElement("button",{className:this.state.pushed?"pushed-display-none":"pure-menu-item",onClick:this.setProgramId,value:this.state.ruby},"Ruby"),t=""),React.createElement("div",null,React.createElement("div",{id:"buttons"},React.createElement("div",{className:"pure-menu pure-menu-horizontal"},React.createElement("p",{className:"pure-menu-heading"},"Reserved word typing"),React.createElement("ul",{className:"pure-menu-list"},e))),t)}}),TypingWindow=React.createClass({displayName:"TypingWindow",getInitialState:function(){return{dataStated:!1,gameStarted:!1,textValue:"",quesions:[]}},componentWillMount:function(){$.ajax({url:"/quesions/"+this.props.programId,dataType:"json",cache:!1,success:function(e){this.setState({quesions:e,dataStated:!0}),console.log(this.state.quesions)}.bind(this),error:function(e,t,a){console.log("error")}.bind(this)})},componentDidMount:function(){window.addEventListener("keydown",this.keyDownHandling,!1)},changeHandling:function(){this.setState({gameStarted:!0})},keyDownHandling:function(e){e.preventDefault();var t={Backspace:function(e){return e.substr(0,e.length-1)}},a=this.state.textValue;e.key in t?a=t[e.key](a):e.keyCode>=65&&e.keyCode<=90&&(a+=e.key),this.setState({textValue:a})},componentWillUnmount:function(){window.removeEventListener("keydown",this.keyDownHandling,!1)},render:function(){var e;e=this.state.dataStated?"":React.createElement("p",null,"データを準備中です...");var t;return this.state.gameStarted?t=React.createElement("div",null,React.createElement("div",{className:" pure-u-1 game-description"},React.createElement("p",null,this.state.quesions[0].description)),React.createElement("div",{className:"game-input-disp"},React.createElement("p",null,this.state.textValue)),React.createElement("div",{className:"game-input"})):this.state.dataStated&&(t=React.createElement("div",{className:"game-start-button"},React.createElement("button",{onClick:this.changeHandling},"Start"))),React.createElement("div",null,React.createElement("div",{id:"game-place",className:"pure-u-1 square"},e,t))}});ReactDOM.render(React.createElement(MainContents,null),document.getElementById("contents"));