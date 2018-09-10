import { app } from '../app/fireApp'
const db = app.firestore()

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
})

const RECIPE = 'recipes'

export function getRecipe(id:string): Promise<Recipe>{
	return db
		.collection(RECIPE)
    .doc(id)
		.get()
		.then(doc => {
		  if (doc.exists) {
		    return {id: doc.id, ...doc.data()} as Recipe
      } else {
		    throw new Error("Not found")
      }
		})
}

export function getRecipes(): Promise<Recipe[]> {
	return db
		.collection(RECIPE)
		.get()
		.then(res => {
			const list: Recipe[] = []
			res.forEach(doc => list.push({ id: doc.id, ...doc.data() } as Recipe))
			return list
		})
}

export function newRecipe(recipe: Recipe): Promise<any> {
  return db
    .collection(RECIPE)
    .add(recipe as any)
    .then(function(docRef) {
      console.log('Document written with ID: ', docRef.id)
    })
    .catch(function(error) {
      console.error('Error adding document: ', error)
    })
}
