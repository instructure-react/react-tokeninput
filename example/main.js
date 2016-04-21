import React from 'react';
import ReactDOM from 'react-dom';
import TokenInput, {Option as ComboboxOption} from '../index';

import without from 'lodash/without';
import uniq from 'lodash/uniq';
import names from './names';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      input: '',
      loading: false,
      selected: [],
      options: names,
    };
  }

  handleChange(value) {
    this.setState({
      selected: value,
    });
  }

  handleRemove(value) {
    const selectedOptions = uniq(without(this.state.selected, value));
    this.handleChange(selectedOptions);
  }

  handleSelect(newValue) {
    let value = newValue;

    if (typeof value === 'string') {
      value = { id: value, name: value };
    }

    const selected = uniq(this.state.selected.concat([value]));
    this.setState({
      selected,
      selectedToken: null,
    });

    this.handleChange(selected);
  }

  handleInput(userInput) {
    this.setState({
      input: userInput,
      loading: true,
      options: [],
    });

    setTimeout(() => {
      this.filterTags(this.state.input);
      this.setState({ loading: false });
    }, 500);
  }

  filterTags(userInput) {
    if (userInput === '') {
      this.setState({ options: [] });
      return;
    }

    const filter = new RegExp(`^${userInput}`, 'i');
    const filteredNames = names.filter(state => filter.test(state.name))
      .filter(state => this.state.selected
          .map(value => value.name)
          .indexOf(state.name) === -1
      );
    this.setState({
      options: filteredNames,
    });
  }

  renderComboboxOptions() {
    return this.state.options.map(name => (
      <ComboboxOption
        key={name.id}
        value={name}
      >{name.name}</ComboboxOption>
    ));
  }

  render() {
    const selectedNames = this.state.selected.map(tag => <li key={tag.id}>{tag.name}</li>);

    const options = this.state.options.length ?
      this.renderComboboxOptions() : [];

    const loadingComponent = <img role="presentation" src="spinner.gif" />;

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
          placeholder="Enter tokens here"
        />

        <h2>Selected</h2>
        <ul>
          {selectedNames}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('application'));
