import React, {Component} from 'react';
import { Mutation} from 'react-apollo';
import {withRouter} from 'react-router-dom';
import {ADD_PET, GET_ALL_PETS} from '../../quries';
import Error from '../Error';
import withAuth from '../withAuth';

const initialState = {
    name: '',
    category: 'cat',
    desc: '',
    text: '',
    username: '',
    imageUrl: ''
}

class AddPet  extends Component {
    state = {...initialState};

    componentDidMount() {
        this.setState({username: this.props.session.getCurrentUser.username})
    }

    handleChange = e => {
        const {name, value} = e.target;
        this.setState({[name]: value})
        console.warn(this.state)
    }

    handleChangeImg = (e) => {
        const selectedFile = e.target.files[0];
        const reader = new FileReader();

        reader.onload = event => {
            this.setState({imageUrl: event.target.result})
        };
        reader.readAsDataURL(selectedFile);
    }


    clearState = () => {
        this.setState({...initialState})
    }

    validateForm = () => {
        const {name, category, desc, text, username, imageUrl} = this.state;

        const valid = name && category && desc && text && username && imageUrl;

        return !valid;
    }

    handleSubmit = (e, addPet) => {
        e.preventDefault();

        addPet().then(({data}) => {
            this.clearState();
            this.props.history.push('/')
        })
    }

    updateCache = (cache, {data: {addPet}}) => {
        const {getAllPets} = cache.readQuery({query: GET_ALL_PETS});

        console.warn(getAllPets)

        cache.writeQuery({
            query: GET_ALL_PETS,
            data: {
                getAllPets: [addPet, ...getAllPets]
            }
        })
    }

    render() {
        const {name, category, desc, text, username, imageUrl} = this.state;

        return (
            <Mutation mutation={ADD_PET} variables={{name, category, desc, text, username, imageUrl}} update={this.updateCache}>
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
                            <input type="text" name="imageUrl" placeholder="image url" onChange={this.handleChange} value={imageUrl}/>
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

export default withAuth(session => session.data && session.data.getCurrentUser)(withRouter(AddPet));