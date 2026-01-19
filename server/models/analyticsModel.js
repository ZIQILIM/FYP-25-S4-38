const db = require('../db');

class AnalyticsModel {
    constructor() {
        this.collection = db.collection('analytics');
    }

    // async setAnalyticsData(userId, data) {
    //     try{
    //         await this.collection.doc(userId).set({
    //             ...data,
    //             updatedAt: new Date().toISOString()
    //         }, { merge: true });
    //         return { userId, ...data };
    //     } catch (error) {
    //         throw new Error(`Error setting analytics data: ${error.message}`);
    //     }
    // }

    async getAnalyticsByUser(userId) {
        try{
            const doc = await this.collection.doc(userId).get();
            return doc.exists ? doc.data() : null;  
        } catch (error) {
            throw new Error(`Error retrieving analytics data: ${error.message}`);
        }
    }

    async getAnalyticsByCourse(courseId) {
        try {
            const snapshot = await this.collection.where('courseId', '==', courseId).get();
            
            return snapshot.docs.map(doc => ({ userId: doc.id, ...doc.data() }));
        } catch (error) {
            throw new Error(`Error retrieving analytics data: ${error.message}`);
        }
    }
}
module.exports = new AnalyticsModel();