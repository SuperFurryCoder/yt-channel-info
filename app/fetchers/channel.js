const helper = require('../helper')

class YoutubeChannelFetcher {
  constructor(id, continuation) {
    this._url = `https://www.youtube.com/channel/${id}/`
    this.continuation = continuation
  }

  static async getChannelVideosNewest (channelId) {
    const channelUrl = `https://www.youtube.com/channel/${channelId}/videos?flow=grid&view=0&pbj=1`
    let channelPageResponse = await helper.makeChannelRequest(channelUrl)

    if (channelPageResponse.error) {
      // Try again as a user channel
      const userUrl = `https://www.youtube.com/user/${channelId}/videos?flow=grid&view=0&pbj=1`
      channelPageResponse = await helper.makeChannelRequest(userUrl)

      if (channelPageResponse.error) {
        const cUrl = `https://www.youtube.com/c/${channelId}/videos?flow=grid&view=0&pbj=1`
        channelPageResponse = await helper.makeChannelRequest(cUrl)
        if (channelPageResponse.error) {
          return Promise.reject(channelPageResponse.message)
        }
      }
    }

    return await helper.parseChannelVideoResponse(channelPageResponse, channelId)
  }

  static async getChannelVideosOldest (channelId) {
    const channelUrl = `https://www.youtube.com/channel/${channelId}/videos?view=0&sort=da&flow=grid&pbj=1`
    let channelPageResponse = await helper.makeChannelRequest(channelUrl)

    if (channelPageResponse.error) {
      // Try again as a user channel
      const userUrl = `https://www.youtube.com/user/${channelId}/videos?view=0&sort=da&flow=grid&pbj=1`
      channelPageResponse = await helper.makeChannelRequest(userUrl)

      if (channelPageResponse.error) {
        const cUrl = `https://www.youtube.com/c/${channelId}/videos?view=0&sort=da&flow=grid&pbj=1`
        channelPageResponse = await helper.makeChannelRequest(cUrl)
        if (channelPageResponse.error) {
          return Promise.reject(channelPageResponse.message)
        }
      }
    }

    return await helper.parseChannelVideoResponse(channelPageResponse, channelId)
  }

  static async getChannelVideosPopular (channelId) {
    const channelUrl = `https://www.youtube.com/channel/${channelId}/videos?view=0&sort=p&flow=grid&pbj=1`
    let channelPageResponse = await helper.makeChannelRequest(channelUrl)

    if (channelPageResponse.error) {
      // Try again as a user channel
      const userUrl = `https://www.youtube.com/user/${channelId}/videos?view=0&sort=p&flow=grid&pbj=1`
      channelPageResponse = await helper.makeChannelRequest(userUrl)

      if (channelPageResponse.error) {
        const cUrl = `https://www.youtube.com/c/${channelId}/videos?view=0&sort=p&flow=grid&pbj=1`
        channelPageResponse = await helper.makeChannelRequest(cUrl)
        if (channelPageResponse.error) {
          return Promise.reject(channelPageResponse.message)
        }
      }
    }

    return await helper.parseChannelVideoResponse(channelPageResponse, channelId)
  }
}

module.exports = YoutubeChannelFetcher
