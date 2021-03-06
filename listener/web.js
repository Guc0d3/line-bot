const database = require('../database')
const line = require('../line')
const CommandType = require('../Type/Command')
const TextType = require('../Type/Text')

const listener = async (event) => {
  if (!event.message) return false
  if (event.message.type !== 'text') return false
  if (event.message.text !== CommandType.web) return false
  console.debug('call listener.web')
  let rows = await database('setting').where({ option: 'WEB_URL' })
  if (rows.length !== 1) return false
  const uri = rows[0].value
  await line.replyMessage(event.replyToken, [
    {
      type: 'flex',
      altText: 'bot send web menu',
      contents: {
        type: 'bubble',
        body: {
          type: 'box',
          layout: 'vertical',
          spacing: 'md',
          contents: [
            {
              type: 'button',
              style: 'primary',
              action: {
                type: 'uri',
                label: TextType.friend,
                uri: uri + '/#/friend',
              },
            },
            {
              type: 'button',
              style: 'primary',
              action: {
                type: 'uri',
                label: TextType.history,
                uri: uri + '/#/history',
              },
            },
            {
              type: 'button',
              style: 'primary',
              action: {
                type: 'uri',
                label: TextType.setting,
                uri: uri + '/#/setting',
              },
            },
          ],
        },
      },
    },
  ])
  return true
}

module.exports = listener
