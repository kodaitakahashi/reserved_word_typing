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
    changeHandling: function() {
        this.setState({
            gameStarted: true
            });
    },
    changeText: function(event) {
        this.setState({
            textValue: event.target.value
        });
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
                        <input onChange={this.changeText} type="text" value={this.state.textValue} />
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
