const db = require("../config/db");

class GradeModel {
  constructor() {
    this.collection = db.collection("grades");
  }

  async submitAttempt(studentId, assessmentId, resultData) {
    try {
      // RESULT DATA STRUCTURE
      // {
      //   score: 85,
      //   timeTaken: 450, (seconds) <--- For 'Speed vs Grade' insight
      //   answers: [
      //     { qId: "q1", isCorrect: true, timeSpent: 30 }, // <--- Deep Dive Analytics
      //     { qId: "q2", isCorrect: false, selected: "B" }
      //   ]
      // }
      await this.collection.add({
        studentId,
        assessmentId,
        ...resultData,
        submittedAt: new Date().toISOString(),
      });
      return { success: true };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
module.exports = new GradeModel();
