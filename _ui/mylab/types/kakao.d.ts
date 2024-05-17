declare namespace Kakao {
  function init(appKey: string): void

  namespace Link {
    type LinkCallback = (...args: any[]) => any

    interface ButtonObject {
      title: string
      link: LinkObject
    }

    interface CommerceObject {
      regularPrice: number
      productName?: string | undefined
      discountPrice?: number | undefined
      discountRate?: number | undefined
      fixedDiscountPrice?: number | undefined
    }

    interface ContentObject {
      title: string
      imageUrl: string
      link: LinkObject
      imageWidth?: number | undefined
      imageHeight?: number | undefined
      description?: string | undefined
    }

    interface BaseObject<ObjectType extends string> {
      objectType: ObjectType
      buttonTitle?: string | undefined
      buttons?: ButtonObject[] | undefined
      installTalk?: boolean | undefined // default false
      callback?: LinkCallback | undefined
      serverCallbackArgs?:
        | {
            [key: string]: any
          }
        | string
        | undefined // reference https://developers.kakao.com/docs/latest/ko/message/js#set-kakaolink-callback
    }

    interface DefaultCommerceSettings extends BaseObject<'commerce'> {
      content: ContentObject
      commerce: CommerceObject
    }

    interface DefaultFeedSettings extends BaseObject<'feed'> {
      content: ContentObject
      social?: SocialObject | undefined
    }

    interface DefaultListSettings extends BaseObject<'list'> {
      headerTitle: string
      headerLink: LinkObject
      contents: ContentObject[]
    }

    interface DefaultLocationSettings extends BaseObject<'location'> {
      content: ContentObject
      address: string
      addressTitle?: string | undefined
      social?: SocialObject | undefined
    }

    interface DefaultTextSettings extends BaseObject<'text'> {
      text: string
      link: LinkObject
    }

    interface ImageInfos {
      original: {
        url: string
        length: number
        content_type: string
        width: number
        height: number
      }
    }

    interface LinkObject {
      webUrl?: string | undefined
      mobileWebUrl?: string | undefined
      androidExecParams?: string | undefined
      iosExecParams?: string | undefined
    }

    interface SocialObject {
      likeCount?: number | undefined
      commentCount?: number | undefined
      sharedCount?: number | undefined
      viewCount?: number | undefined
      subscriberCount?: number | undefined
    }

    type DefaultSettings =
      | DefaultFeedSettings
      | DefaultListSettings
      | DefaultLocationSettings
      | DefaultCommerceSettings
      | DefaultTextSettings

    function cleanup(): void

    function createCustomButton(settings: {
      container: string | HTMLElement
      templateId: number
      templateArgs?:
        | {
            [key: string]: any
          }
        | undefined
      installTalk?: boolean | undefined // default false
      callback?: LinkCallback | undefined
      serverCallbackArgs?:
        | {
            [key: string]: any
          }
        | string
        | undefined // reference https://developers.kakao.com/docs/latest/ko/message/js#set-kakaolink-callback
    }): void

    function createDefaultButton(
      settings: {
        container: string | HTMLElement
      } & DefaultSettings
    ): void

    function createScrapButton(settings: {
      container: string | HTMLElement
      requestUrl: string
      templateId?: number | undefined
      templateArgs?:
        | {
            [key: string]: any
          }
        | undefined
      installTalk?: boolean | undefined // default false
      callback?: LinkCallback | undefined
      serverCallbackArgs?:
        | {
            [key: string]: any
          }
        | string
        | undefined
    }): void

    function deleteImage(settings: { imageUrl: string }): Promise<unknown>

    function scrapImage(settings: { imageUrl: string }): Promise<ImageInfos>

    function sendCustom(settings: {
      templateId: number
      templateArgs: {
        [key: string]: any
      }
      installTalk?: boolean | undefined // default false
      callback?: LinkCallback | undefined
      serverCallbackArgs?:
        | {
            [key: string]: any
          }
        | string
        | undefined
    }): void

    function sendDefault(settings: DefaultSettings): void

    function sendScrap(settings: {
      requestUrl: string
      templateId?: number | undefined
      templateArgs?:
        | {
            [key: string]: any
          }
        | undefined
      installTalk?: boolean | undefined // default false
      callback?: LinkCallback | undefined
      serverCallbackArgs?:
        | {
            [key: string]: any
          }
        | string
        | undefined
    }): void

    function uploadImage(settings: { file: FileList }): Promise<ImageInfos>
  }
}
