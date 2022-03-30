import { appConfig } from '../../config/appConfig'
import fetch from 'node-fetch'

export const getLinkPreviewResult = async ({ url }) => {
  // Fetch PreviewLink data
  const requestBody = {
    key: appConfig.get('linkPreview.apiKey'),
    q: url
  }

  try {
    const linkPreviewResponse = await fetch(appConfig.get('linkPreview.apiUrl'), {
      method: 'post',
      body: JSON.stringify(requestBody),
      mode: 'cors'
    })
    if (linkPreviewResponse.status === 200) {
      const linkPreviewResponseJSON = await linkPreviewResponse.json()
      return linkPreviewResponseJSON
    } else {
      console.log('LinkPreview error ')
      return null
    }
  } catch (e) {
    console.log('LinkPreview error ', e)
  }
}
