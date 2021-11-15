import './App.css';
import {doc, runTransaction, onSnapshot} from "firebase/firestore"
import {db} from "./firebaseConfig/firebaseConfig"
import {useEffect, useState} from "react"

function App() {
    const sfDocRef = doc(db, "cities", "SF");
    const [population, setPopulation] = useState(0)

    const orderIndex = async () => {
        try {
            const newPopulation = await runTransaction(db, async (transaction) => {
                const sfDoc = await transaction.get(sfDocRef);
                console.log('sfDoc: ', sfDoc)
                if (!sfDoc.exists()) {
                    throw "Document does not exist!";
                }
                const newPop = sfDoc.data().population + 1;
                if (newPop <= 100000) {
                    transaction.update(sfDocRef, {population: newPop});
                    return newPop;
                } else {
                    return Promise.reject("Sorry! Population is too big");
                }
            });
            setPopulation(newPopulation)
            console.log("Population increased to ", newPopulation);
        } catch (e) {
            // This will be a "population is too big" error.
            console.error(e);
        }
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(sfDocRef, doc => {
            console.log('doc: ', doc.data())
            const data = doc.data()
            setPopulation(data.population)
        })

        return () => unsubscribe()
    }, [])

    return (
        <div className="App">
            App Firebase
            <div>
                <button onClick={orderIndex}> + </button>
                <span>{ population }</span>
            </div>
        </div>
    );
}

export default App;
