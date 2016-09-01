var MainContents = React.createClass({
    render: function() {
        return(
            <div>
                <Button initializeId="0"/>
            </div>
        );
    }
});

var Button = React.createClass({
    getInitialState: function() {
        return{
            ruby: 1,
            selectProgramId: this.props.initializeId
        };
    },
    setProgramId: function(event) {
        this.setState({selectProgramId: event.target.value});
        console.log(this.state.selectProgramId);
    },
    /* selectQuesion: function(event) {
     *     $.ajax({
     *         url: "/quesions/" + event.target.value,
     *         dataType: 'json',
     *         cache: false,
     *         success: function(data) {
     *             this.setState({quesions: data});
     *         }.bind(this),
     *         error: function(xhr, status, error){
     *             console.log("error");
     *         }.bind(this)
     *     });
     * },*/
    render: function() {
        return (
            <div>
                <div id="buttons">
                    <div className="pure-menu pure-menu-horizontal">
                        <p className="pure-menu-heading">Reserved word typing</p>
                        <ul className="pure-menu-list">
                            <button className="pure-menu-item" onClick={this.setProgramId} value={this.state.ruby}>Ruby</button>
                        </ul>
                    </div>
                </div>
                <TypingWindow programId={this.state.selectProgramId} />
            </div>
        );
    }
});

var TypingWindow = React.createClass({
    getInitialState: function() {
        return{
            programId: this.props.programId,
            quesions: []
        };
    },
    componentWillReceiveProps: function() {
        this.setState({programId: this.props.programId});
        $.ajax({
            url: "/quesions/" + this.state.programId,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({quesions: data});
                console.log(this.state.quesions);
            }.bind(this),
            error: function(xhr, status, error){
                console.log("error");
            }.bind(this)
        });
    },
    render: function(){
        var node = this.state.quesions.map(function(data, i){
            return(
                <div key={i} className="hoge">
                    <p>{data.word}</p>
                    <p>{data.description}</p>
                </div>
            );
        });
        return(
            <div>
                {node}
            </div>
        );
    }
});
ReactDOM.render(
    <MainContents />,
    document.getElementById('contents')
);
