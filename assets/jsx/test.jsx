var Button = React.createClass({
    getInitialState: function() {
        return{
            ruby: 1,
            quesions: []
        };
    },
    selectQuesion: function(event) {
        $.ajax({
            url: "/quesions/" + event.target.value,
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
    render: function() {
        return (
            <div className="pure-menu pure-menu-horizontal">
                <p className="pure-menu-heading">Reserved word typing</p>
                <ul className="pure-menu-list">
                    <button className="pure-menu-item" onClick={this.selectQuesion} value={this.state.ruby}>Ruby</button>
                </ul>
            </div>
        );
    }
});

ReactDOM.render(
    <Button />,
    document.getElementById('buttons')
);
