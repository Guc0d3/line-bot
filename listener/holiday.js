const database = require('../database')
const line = require('../line')
const CommandType = require('../Type/Command')

const listener = async (event) => {
  if (!event.message) return false
  if (event.message.type !== 'text') return false
  if (event.message.text !== CommandType.holiday) return false
  console.debug('call listener.holiday')
  let messages = []
  let rows = await database('setting').where('option', 'HOLIDAY_IMAGE')
  if (rows[0].value) {
    messages.push({
      type: 'image',
      originalContentUrl: rows[0].value,
      previewImageUrl: rows[0].value,
    })
  }
  rows = await database('setting').where('option', 'HOLIDAY_MESSAGE')
  if (rows[0].value) {
    messages.push({
      type: 'text',
      text: rows[0].value,
    })
  }
  await line.replyMessage(event.replyToken, messages)
  return true
}

module.exports = listener
