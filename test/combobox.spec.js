var React = require('react')
var TestUtils = require('react-addons-test-utils')

var Combobox = React.createFactory(require('../src/combobox'))
var Option = React.createFactory(require('../src/option'))

function makeOption(focusable, i) {
  return Option({
    value: i,
    key: i,
    isFocusable: focusable
  })
}

describe('combobox', function() {
  describe('nextFocusableIndex', () => {
    it('handles simple case', () => {
      var combobox = Combobox({}, [true, true, true, true].map(makeOption))
      var instance = TestUtils.renderIntoDocument(combobox)
      expect(instance.nextFocusableIndex(undefined)).to.equal(0)
      expect(instance.nextFocusableIndex(0)).to.equal(1)
      expect(instance.nextFocusableIndex(3)).to.equal(0)
    })

    it('handles components with isFocusable false', () => {
      var combobox = Combobox({}, [false, false, true, true, false].map(makeOption))
      var instance = TestUtils.renderIntoDocument(combobox)
      expect(instance.nextFocusableIndex(undefined)).to.equal(2)
      expect(instance.nextFocusableIndex(2)).to.equal(3)
      expect(instance.nextFocusableIndex(3)).to.equal(2)
    })
  })

  describe('previousFocusableIndex', () => {
    it('handles simple case', () => {
      var combobox = Combobox({}, [true, true, true, true].map(makeOption))
      var instance = TestUtils.renderIntoDocument(combobox)
      expect(instance.previousFocusableIndex(undefined)).to.equal(3)
      expect(instance.previousFocusableIndex(0)).to.equal(3)
      expect(instance.previousFocusableIndex(3)).to.equal(2)
    })

    it('handles components with isFocusable false', () => {
      var combobox = Combobox({}, [false, false, true, true, false].map(makeOption))
      var instance = TestUtils.renderIntoDocument(combobox)
      expect(instance.previousFocusableIndex(undefined)).to.equal(3)
      expect(instance.previousFocusableIndex(2)).to.equal(3)
      expect(instance.previousFocusableIndex(3)).to.equal(2)
    })
  })
})
