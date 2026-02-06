const db = require("../config/db");

class ReviewModel {
  constructor() {
    this.collection = db.collection("reviews");
  }

  // Check if a student has already reviewed this course
  async hasStudentReviewed(courseId, studentId) {
    try {
      const snapshot = await this.collection
        .where("courseId", "==", courseId)
        .where("studentId", "==", studentId)
        .get();
        

        //snapshot.doc().delete();
        //change to overwrite instead

      return !snapshot.empty; // Returns true if review exists
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addReview(reviewData) {
    try {
      // Data Structure:
      // {
      //   courseId: "...",
      //   studentId: "...",
      //   studentName: "...",
      //   rating: 4,
      //   description: "Great course, learned a lot!",
      //   createdAt: ...
      // }

      const docRef = await this.collection.add({
        ...reviewData,
        createdAt: new Date().toISOString(),
      });
      return { id: docRef.id, ...reviewData };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Helper to check if student already reviewed this course
  async hasStudentReviewed(courseId, studentId) {
    const snapshot = await this.collection
      .where("courseId", "==", courseId)
      .where("studentId", "==", studentId)
      .get();

      let x;

      snapshot.forEach((doc) => {
            //there should only be one
            console.log(doc.id, "=>", doc.data());
            x = doc.id;
            //doc.delete();
        });
        if(x!==undefined)
          await this.collection.doc(x).delete();

    return true;
  }

  // 3. Get reviews for a course by courseId
  async getReviewsByCourseId(courseId) {
    try {
      /*const snapshot = await this.collection
        .where("courseId", "==", courseId)
        .orderBy("createdAt", "desc")
        .get();*/

        const snapshot = await this.collection
        .where("courseId", "==", courseId)
        .get();

      if (snapshot.empty) return [];

      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return []; // Return empty array on error to prevent crash
    }
  }
}

module.exports = new ReviewModel();
