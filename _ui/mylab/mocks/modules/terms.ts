import { rest } from 'msw'
import { GetTermsRes } from '~/apis/model/termsModel'

const Terms: GetTermsRes[] = [
  {
    id: 1,
    version: 1,
    status: 'O',
    title: '약관 1',
    contents: '약관 내용1',
    createdDate: new Date(),
    modifiedDate: new Date(),
    type: 'M',
    termsType: {
      id: 1,
      name: '약관1',
    },
    necessary: 'Y',
    target: 'C',
  },
  {
    id: 2,
    version: 1,
    status: 'O',
    title: '약관 2',
    contents: '약관 내용2',
    createdDate: new Date(),
    modifiedDate: new Date(),
    type: 'M',
    termsType: {
      id: 1,
      name: '약관2',
    },
    necessary: 'Y',
    target: 'C',
  },
  {
    id: 3,
    version: 1,
    status: 'O',
    title: '약관 3',
    contents: '약관 내용3',
    createdDate: new Date(),
    modifiedDate: new Date(),
    type: 'M',
    termsType: {
      id: 1,
      name: '약관3',
    },
    necessary: 'Y',
    target: 'C',
  },
]

export default [
  rest.get('/v1/api/terms', (_, res, ctx) => {
    return res(ctx.json(Terms))
  }),
]
