import PN from 'pubnub'

const keys = {
  publishKey: 'pub-c-8fd5e639-8131-4b76-867c-c38d0c1d15fc',
  subscribeKey: 'sub-c-7eaa1852-2563-11e7-bb8a-0619f8945a4f'
}

export default
class PubNub extends PN
{
    constructor()
    {
        super(keys)
    }
}
