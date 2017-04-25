import PubNub from 'pubnub'

let pubnub = new PubNub({
  publishKey: 'pub-c-8fd5e639-8131-4b76-867c-c38d0c1d15fc',
  subscribeKey: 'sub-c-7eaa1852-2563-11e7-bb8a-0619f8945a4f'
})

pubnub.addListener({
    status: (event) => {
      const category = event.category
      if (category === 'PNUnknownStatus') {
        console.log('error on subscription')
      } else {
        console.log('subscribed!')
      }
    }
})

pubnub.subscribe({
  channels: ['nous']
})

export default pubnub
