import { defineStore } from 'pinia'
import { store } from '~/stores'
import {
  KitPickUpInfo,
  KitSurveyInfo,
  KitItem,
  kitOrderReq,
  SaveKitReq,
  KitPickUpReq,
  SampleKitTerms,
} from '~/apis/model/kitModel'
import { GetMemberRes } from '~/apis/model/userModel'

export const defaultKitStore: Partial<KitStore> = {
  terms: undefined,
  serialInfo: undefined,
  pickupInfo: undefined,
  survey: undefined,
  kitItem: undefined,
  kitPickUpReq: undefined,
  memberInfo: undefined,
}
interface KitStore {
  terms: SampleKitTerms[]
  serialInfo: kitOrderReq
  pickupInfo: KitPickUpInfo
  kitPickUpReq: KitPickUpReq
  survey: KitSurveyInfo
  kitItem: KitItem
  memberInfo: GetMemberRes
}

export const useKitStore = defineStore({
  id: 'kit',
  state: (): Partial<KitStore> => ({
    terms: undefined,
    serialInfo: undefined,
    pickupInfo: undefined,
    survey: undefined,
    kitItem: undefined,
    kitPickUpReq: undefined,
    memberInfo: undefined,
  }),
  getters: {
    getTerms(): SampleKitTerms[] | undefined {
      return this.terms
    },
    getSerialInfo(): kitOrderReq | undefined {
      return this.serialInfo
    },
    getPickupInfo(): KitPickUpInfo | undefined {
      return this.pickupInfo
    },
    getSurvey(): KitSurveyInfo | undefined {
      return this.survey
    },
    getKitItem(): KitItem | undefined {
      return this.kitItem
    },
    getSaveKitReq(): SaveKitReq {
      return {
        terms: this.terms!,
        distNo: this.serialInfo?.distNo ?? '',
        orderNo: this.serialInfo?.orderNo ?? '',
        kitSerial: this.serialInfo?.kitSerial ?? '',
        pickupDate: this.pickupInfo?.pickupDate ?? new Date(),
        postCode: this.pickupInfo?.postCode ?? '',
        pickupAddress1: this.pickupInfo?.pickupAddress1 ?? '',
        pickupAddress2: this.pickupInfo?.pickupAddress2 ?? '',
      }
    },
    getKitPickUpReq(): KitPickUpReq | undefined {
      return this.kitPickUpReq
    },
    getMemberInfo(): GetMemberRes | undefined {
      return this.memberInfo
    },
  },
  actions: {
    setMemberInfo(memberInfo: GetMemberRes) {
      this.memberInfo = memberInfo
    },
    setTerms(terms: SampleKitTerms[]) {
      this.terms = terms
    },
    setSerialInfo(serialInfo: kitOrderReq) {
      this.serialInfo = serialInfo
    },
    setPickupInfo(pickupInfo: KitPickUpInfo) {
      this.pickupInfo = pickupInfo
    },
    setKitSurveyInfo(survey: KitSurveyInfo) {
      this.survey = survey
    },
    setKitItem(kitItem: KitItem) {
      this.kitItem = kitItem
    },
    setKitPickUpReq(kitPickUpReq: KitPickUpReq) {
      this.kitPickUpReq = kitPickUpReq
    },
  },
})

// Need to be used outside the setup
export function useKitWithOut() {
  return useKitStore(store)
}
