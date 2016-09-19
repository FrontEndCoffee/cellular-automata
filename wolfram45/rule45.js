window.onload = function() {

  var canvas = document.getElementsByTagName('canvas')[0]
  var ctx = canvas.getContext('2d')
  window.ctx = ctx
  var gridHeight = 320
  var gridWidth = 481
  var genCount = 0
  var aliveColor = '#333'
  var deathColor = '#2ecc71'
  var generationInterval = 0
  var lastGen = genRandomGeneration(gridWidth)
  // var lastGen = genLoneCellGen(gridWidth)

  canvas.height = canvas.width/gridWidth * gridHeight

  var ticktock = setInterval(function() {

    renderGen(lastGen)
    lastGen = genNextGen(lastGen)

  }, generationInterval)

  function genNextGen(prevGen) {
    return newGen = prevGen.split('')
      .map(applyRulesToCell(prevGen))
      .join('')
  }

  function renderGen(gen) {
    var cellWidth = canvas.width/gridWidth
    gen.split('')
      .forEach(function(v, i) {
        ctx.fillStyle = (v === "#") ? aliveColor : deathColor
        ctx.fillRect(cellWidth*i, cellWidth*genCount, cellWidth, cellWidth)
      })
    genCount++
  }

  function applyRulesToCell(previousGeneration) {
    return function(v, i) {
      return applyRules(getPast(i, previousGeneration))
    }
  }

  function getPast(pos, gen) {
    var left = (pos>0) ? gen.charAt((pos-1)%gen.length) : gen.charAt(gen.length -1)
    var center = gen.charAt(pos%gen.length)
    var right = gen.charAt((pos+1)%gen.length)
    return left + center + right
  }

  function applyRules(prevThree) {
    switch(prevThree) {
      case "###": return "."
      case "##.": return "."
      case "#.#": return "#"
      case "#..": return "."
      case ".##": return "#"
      case ".#.": return "#"
      case "..#": return "."
      case "...": return "#"
      default: throw "poop"
    }
  }

  function genRandomGeneration(width) {
    var res = ""
    for (var i=0; i<width; i++) {
      res += (Math.random()<0.5) ? "#" : "."
    }
    return res
  }
  function genLoneCellGen(width) {
    var emptySpace = ""
    for (var i=0; i<(width/2|0); i++) {
      emptySpace += "."
    }
    return emptySpace + "#" + emptySpace
  }
}
