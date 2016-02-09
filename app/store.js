import {DS as DataStore} from 'js-data'
import RethinkDBAdapter from 'js-data-rethinkdb'
import config from './config'

const store = new DataStore()
const rethinkAdapter = new RethinkDBAdapter({ db: config.db.name })

store.registerAdapter('rethink', rethinkAdapter, { default: true })

export default store
