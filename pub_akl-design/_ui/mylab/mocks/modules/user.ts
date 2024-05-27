import { rest } from 'msw'
import { KitStatus } from '~/apis/model/kitModel'
import { GetMemberRes, GetMemberKitHistoryRes, Sex, MemberType } from '~/apis/model/userModel'

const members: GetMemberRes[] = [
  {
    id: 1,
    kitId: '123',
    username: '1번 고갱',
    birth: '2021-01-01',
    sex: Sex.MEN,
    status: KitStatus.ANALYZING,
    type: MemberType.MEMBER,
    zipCode: '',
    address: '',
    addressDetail: '',
    pickupDate: null,
    surveyDate: null,
    arrivalDate: null,
    completeDate: null,
  },
]

const memberKitHistories: GetMemberKitHistoryRes[] = [
  {
    seq: 1,
    status: KitStatus.ANALYZING,
    pickupDate: new Date(),
    postCode: '123456',
    pickupAddress1: '대한민국 삼성동',
    pickupAddress2: '살만한 곳',
  },
]

export default [
  rest.get<GetMemberRes[]>('/v1/api/user/list/:distNo', (_, res, ctx) => {
    return res(ctx.json(members))
  }),
  rest.get<GetMemberRes>('/v1/api/user/info/', (_, res, ctx) => {
    return res(ctx.json(members[0]))
  }),
  rest.get<GetMemberRes>('/v1/api/user/info/:seq', (req, res, ctx) => {
    const { seq } = req.params
    const data = members.find((data) => data.id === +seq)
    if (data) {
      return res(ctx.json(data))
    }

    return res(ctx.status(204))
  }),
  rest.get<GetMemberKitHistoryRes[]>('/v1/api/user/:seq/kit-histories', (req, res, ctx) => {
    const { seq } = req.params

    return res(ctx.json(memberKitHistories))
  }),
]
