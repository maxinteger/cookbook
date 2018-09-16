import { pickBy } from 'ramda'
import { app } from '../app/fireApp'
import { BaseModel } from './model'
const db = app.firestore()

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
})

const omitInvalidFields = pickBy((val: any, key: string) => val !== undefined && key !== 'id')

export class Service<T extends BaseModel> {
  private collectionName: string

  constructor(collectionName: string) {
    this.collectionName = collectionName
  }

  create = (ingredient: T): Promise<any> => {
    return db.collection(this.collectionName).add(omitInvalidFields(ingredient) as any)
  }

  update = (ingredient: T): Promise<any> => {
    return db
      .collection(this.collectionName)
      .doc(ingredient.id)
      .set(omitInvalidFields(ingredient) as any)
  }

  store = (ingredient: T): Promise<any> => {
    return ingredient.id ? this.update(ingredient) : this.create(ingredient)
  }

  get = (id: string): Promise<T> => {
    return db
      .collection(this.collectionName)
      .doc(id)
      .get()
      .then(doc => {
        if (doc.exists) {
          return { id: doc.id, ...doc.data() } as T
        } else {
          throw new Error('Not found')
        }
      })
  }

  getAll = (): Promise<T[]> => {
    return db
      .collection(this.collectionName)
      .get()
      .then(res => {
        const list: T[] = []
        res.forEach(doc => list.push({ id: doc.id, ...doc.data() } as T))
        return list
      })
  }
}
