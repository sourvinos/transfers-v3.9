import { Injectable } from '@angular/core'
import Dexie from 'dexie'
import { Setting } from '../classes/setting'

@Injectable({ providedIn: 'root' })

export class IndexDBService {

    private db: any

    constructor() {
        this.createDatabase()
    }

    addSetting(setting: Setting) {
        this.db.settings.put(setting)
    }

    async editSetting(setting: Setting) {
        if (await this.db.settings.get(setting.id)) {
            this.db.settings.put(setting)
        }
    }

    deleteSetting(id) {
        this.db.settings.delete(id)
    }

    private createDatabase() {
        this.db = new Dexie('Island Cruises')
        this.db.version(1).stores({ settings: 'id, key' })
    }

}