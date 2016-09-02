var MainContents = React.createClass({
    render: function() {
        return(
            <div>
                <Button/>
            </div>
        );
    }
});

var Button = React.createClass({
    getInitialState: function() {
        return{
            ruby: 1,
            selectProgramId: null,
            pushed: false
        };
    },
    setProgramId: function(event) {
        var selectId = event.target.value;
        this.setState({
            selectProgramId: selectId,
            pushed: true
        });
    },
    canselHandling: function() {
        this.setState({
            selectProgramId: null,
            pushed: false
        });
    },
    render: function() {
        var buttons;
        var window;
        if (this.state.pushed){
            buttons = <button className={this.state.pushed ? 'pure-menu-item' : 'pushed-display-none'} onClick={this.canselHandling}>キャンセル</button>;
            window = <TypingWindow programId={this.state.selectProgramId} />;
        }else{
            buttons = <button className={this.state.pushed ? 'pushed-display-none': 'pure-menu-item'} onClick={this.setProgramId} value={this.state.ruby}>Ruby</button>;
            window = '';
        }
        return (
            <div>
                <div id="buttons">
                    <div className="pure-menu pure-menu-horizontal">
                        <p className="pure-menu-heading">Reserved word typing</p>
                        <ul className={'pure-menu-list'}>
                            {buttons}
                        </ul>
                    </div>
                </div>
                {window}
            </div>
        );
    }
});

var TypingWindow = React.createClass({
    getInitialState: function() {
        return{
            dataStated: false,
            gameStarted: false,
            textValue: '',
            quesions: []
        };
    },
    componentWillMount: function() {
        $.ajax({
            url: "/quesions/" + this.props.programId,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({
                    quesions: data,
                    dataStated: true
                });
                console.log(this.state.quesions);
            }.bind(this),
            error: function(xhr, status, error){
                console.log("error");
            }.bind(this)
        });
    },
    componentDidMount: function() {
        window.addEventListener("keydown", this.keyDownHandling, false);
    },
    changeHandling: function() {
        this.setState({
            gameStarted: true
        });
    },
    keyDownHandling: function(event){
        event.preventDefault();
        var keyDictionary = {
            'Backspace': function(text){
                return text.substr(0,text.length - 1);
            }
        };
        var inputText = this.state.textValue;
        if (event.key in keyDictionary){
            inputText = keyDictionary[event.key](inputText);
        }else if(event.keyCode >= 65 && event.keyCode <= 90)
            inputText += event.key;
        this.setState({
            textValue: inputText
        });
    },
    componentWillUnmount: function() {
        window.removeEventListener("keydown", this.keyDownHandling, false);
    },
    render: function(){
        var node;
        if(!this.state.dataStated)
            node = <p>データを準備中です...</p>;
        else
            node = '';
        var game;
        if(this.state.gameStarted){
            game =
                <div>
                    <div className=" pure-u-1 game-description">
                        <p>{this.state.quesions[0].description}</p>
                    </div>
                    <div className="game-input-disp">
                        <p> 
                            {this.state.textValue}
                        </p>
                    </div>
                    <div className="game-input">
                        
                    </div>
                </div>;
        }else if(this.state.dataStated){
            game =  
                <div className="game-start-button">
                    <button onClick={this.changeHandling} >Start</button>  
                </div>;
        }
        return(
            <div>
                <div id="game-place" className="pure-u-1 square">
                    {node}
                    {game}
                </div>
            </div>
        );
    }
});
ReactDOM.render(
    <MainContents />,
    document.getElementById('contents')
);
