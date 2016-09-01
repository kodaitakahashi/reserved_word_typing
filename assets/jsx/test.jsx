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
    render: function(){
        var node;
        if(this.state.dataStated){
            node = this.state.quesions.map(function(data, i){
                return(
                    <div key={i} className="hoge">
                        <p>{data.word}</p>
                        <p>{data.description}</p>
                    </div>
                );
            });
        }else
        node = <p>データを準備中です...</p>;
        return(
            <div>
                <div id="game-place" className="pure-u-1 square">
                    {node}
                </div>
            </div>
        );
    }
});
ReactDOM.render(
    <MainContents />,
    document.getElementById('contents')
);
