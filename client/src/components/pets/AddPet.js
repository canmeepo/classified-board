import React, {Component} from 'react';
import { Mutation} from 'react-apollo';
import {withRouter} from 'react-router-dom';
import {ADD_PET, GET_ALL_PETS} from '../../quries';
import Error from '../Error'

const initialState = {
    name: '',
    category: 'cat',
    desc: '',
    text: '',
    username: ''
}

class AddPet  extends Component {
    state = {...initialState};

    componentDidMount() {
        this.setState({username: this.props.session.getCurrentUser.username})
    }

    handleChange = e => {
        const {name, value} = e.target;
        this.setState({[name]: value})
    }

    clearState = () => {
        this.setState({...initialState})
    }

    validateForm = () => {
        const {name, category, desc, text, username} = this.state;

        const valid = name && category && desc && text && username;

        return !valid;
    }

    handleSubmit = (e, addPet) => {
        e.preventDefault();

        addPet().then(data => {
            console.log(data)
            this.clearState();
            this.props.history.push('/')
        })
    }

    updateCache = (cache, {data: {addPet}}) => {
        const {getAllPets} = cache.readQuery({query: GET_ALL_PETS});

        cache.writeQuery({
            query: GET_ALL_PETS,
            data: {
                getAllPets: [addPet, ...getAllPets]
            }
        })
    }

    render() {
        const {name, category, desc, text, username} = this.state;

        return (
            <Mutation mutation={ADD_PET} variables={{name, category, desc, text, username}} update={this.updateCache}>
                {(addPet, {data, loading, error}) => {
                return (
                    <div>
                        <div>add pet</div>
                        <form onSubmit={(e) => this.handleSubmit(e, addPet)}>
                            <input type="text" name="name" placeholder="name" onChange={this.handleChange} value={name}/>
                            <select name="category" onChange={this.handleChange} value={category}>
                                <option value="cat">cat</option>
                                <option value="dog">dog</option>
                                <option value="another">another</option>
                            </select>
                            <input type="text" name="desc" placeholder="description" onChange={this.handleChange} value={desc}/>
                            <textarea name="text" placeholder="text" onChange={this.handleChange} value={text}></textarea>
                            <button disabled={loading || this.validateForm()}>submit</button>
                            {error && <Error error={error} />}
                        </form>
                    </div>
                )
            }}
            
            </Mutation>
        )
    }
}

export default withRouter(AddPet);