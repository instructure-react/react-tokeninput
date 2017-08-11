import React from 'react'
import ReactDOM from 'react-dom'

import without from 'lodash/array/without'
import uniq from 'lodash/array/uniq'
import find from 'lodash/collection/find'

import TokenInput, {Option} from '../src/index'

import names from './names'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      input: '',
      loading: false,
      selected: [],
      options: names
    }
  }

  handleChange = (value) => {
    this.setState({
      selected: value
    })
  }

  handleRemove = (value) => {
    var selectedOptions = uniq(without(this.state.selected,value))
    this.handleChange(selectedOptions)
  }

  handleSelect = (value, combobox) => {
    if(typeof value === 'string') {
      value = {id: value, name: value};
    }

    var selected = uniq(this.state.selected.concat([value]))
    this.setState({
      selected: selected,
      selectedToken: null
    })

    this.handleChange(selected)
  }

  handleInput = (userInput) => {
    this.setState({
      input: userInput,
      loading: true,
      options: []
    })
    setTimeout(function () {
      this.filterTags(this.state.input)
      this.setState({
        loading: false
      })
    }.bind(this), 500)
  }

  filterTags = (userInput) => {
    if (userInput === '')
      return this.setState({options: []});

    var filter = new RegExp('^'+userInput, 'i');

    let filteredNames = names.filter((state) => {
      // match user input
      let result = filter.test(state.name)

      // make sure it's not already selected
      return result && !find(this.state.selected, {name: state.name})
    })

    this.setState({
      options: filteredNames
    });
  }

  renderComboboxOptions = () => {
    return this.state.options.map(function(name) {
      return (
        <Option
          key={name.id}
          value={name}
        >{name.name}</Option>
      );
    });
  }

  render() {
    var selectedNames = this.state.selected.map(function(tag) {
      return <li key={tag.id}>{tag.name}</li>
    })

    var options = this.state.options.length ?
      this.renderComboboxOptions() : [];

    const loadingComponent = (
      <img src='spinner.gif' />
    )

    return (
      <div>
        <h1>React TokenInput Example</h1>

        <TokenInput
            isLoading={this.state.loading}
            loadingComponent={loadingComponent}
            menuContent={options}
            onChange={this.handleChange}
            onInput={this.handleInput}
            onSelect={this.handleSelect}
            onRemove={this.handleRemove}
            selected={this.state.selected}
            placeholder='Enter tokens here'
          />

        <h2>Selected</h2>
        <ul>
          {selectedNames}
        </ul>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('application'))

if(module.hot) {
  module.hot.accept(function(err) {
    if(err) {
      console.error("Cannot apply hot update", err);
    }
  });
}
