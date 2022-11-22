// @description: wrapText wraps HTML canvas text onto a canvas of fixed width
// @param ctx - the context for the canvas we want to wrap text on
// @param text - the text we want to wrap.
// @param x - the X starting point of the text on the canvas.
// @param y - the Y starting point of the text on the canvas.
// @param maxWidth - the width at which we want line breaks to begin - i.e. the maximum width of the canvas.
// @param lineHeight - the height of each line, so we can space them below each other.
// @returns an array of [ lineText, x, y ] for all lines
export const wrapText = function (
  ctx: any,
  text: string,
  x: number,
  maxWidth: number,
  maxHeight: number,
  lineHeight: number
) {
  // First, start by splitting all of our text into words, but splitting it into an array split by spaces
  let words = text.split(/\s+/)
  let line = '' // This will store the text of the current line
  let lineArray: [string, number, number][] = [] // This is an array of lines, which the function will return
                                                 // [text, x, y] 

  // Lets iterate over each word
  for (const word of words) {
    // Create a test line, and measure it..
    let metrics = ctx.measureText(line + ' ' + word)
    let testWidth = metrics.width
    // If the width of this line is more than the max width
    if (testWidth > maxWidth && ctx.measureText(word).width <= maxWidth) {
      // Then the line is finished, push the current line into "lineArray"
      lineArray.push([line, x, 0])
      // Update line to use this word as the first word on the next line
      line = word
    } else {
      // If the test line is still less than the max width, then add the word to the current line
      line += ' ' + word
    }
  }

  // Push the last words
  lineArray.push([line, x, 0])

  const textHeight = lineArray.length * lineHeight
  let firstY = maxHeight / 2 - textHeight / 2 + lineHeight
  let y = firstY

  for (const line of lineArray) {
    line[0]
    line[2] = y;
    y += lineHeight;
  }

  // Return the line array
  return { lineArray, textHeight }
}
