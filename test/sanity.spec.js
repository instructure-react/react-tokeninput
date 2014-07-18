var React = require('react/addons')
var TestUtils = React.addons.TestUtils

var Tokeninput = require('../index')

describe('Sanity test', function() {

  it ('renders component', function() {
    var result = Tokeninput({
      selected: []
    })
    TestUtils.renderIntoDocument(result)
    var ul = TestUtils.findRenderedDOMComponentWithTag(result, 'ul')
    should.exist(ul)
  })

})
