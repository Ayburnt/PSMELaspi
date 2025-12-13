// backend/schemaTypes/index.ts
import event from './event'
import news from "./news"
import member from './member'
import membershipInfo from './membershipInfo'
import whyJoinUs from './whyJoinUs'
import aboutUs from './aboutUs'
import { leadershipBoard } from './leadership'
import hero from './hero'
import siteSettings from './siteSettings'

export const schemaTypes = [
	siteSettings,
	hero,
	aboutUs,
	leadershipBoard,
	event,
	news,
	member,
	membershipInfo,
	whyJoinUs,
]