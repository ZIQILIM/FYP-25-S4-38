const db = require("../config/db");

class testAttemptModel {
    constructor() {
        this.collection = db.collection("testAttempt");
    }

    async submitTestData(uid, testID, courseID, attemptData) {
        //first check if test is in the db
        const docRef = this.collection.doc();
        const doc = await docRef.get();

        if(!doc.exists)
        {
            
        }
        await docRef.set({test_ID: testID, user: uid, course: courseID, questions: attemptData});
    }

    async haspreviousattempt(uid, testID){
        const snapshot = await this.collection.where("test_ID", "==", testID).where("user", "==", uid).get();
        
        if(snapshot.docs.length === 0)
        {
            console.log("No matching documents.");
            return false;
        }
        else{
            return true;
        }
    }

    async pullalldata(){
        const snapshot = await this.collection.get();

        snapshot.forEach((doc) => {
            //there should only be one
            console.log(doc.id, "=>", doc.data());
        
        });

        const courses = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        //const doc = await docRef.get();
        //const x = docRef.data();
        return courses;
    }

    async deleteItem(attemptId){
        try{
            await this.collection.doc(attemptId).delete();
            return { success: true };
        } catch(error){

        }
    }
}

module.exports = new testAttemptModel(); 