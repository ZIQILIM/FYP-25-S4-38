const analyticsModel = require('../models/analyticsModel');

class AnalyticsController {
    // 1. Get Analytics Data for a student
    async getStudentAnalytics(req, res, next) {
        try{
            const userId = req.user.uid;
            const analyticsData = await analyticsModel.getAnalyticsByUser(userId);
            res.status(200).json({ success: true, data: analyticsData });
        } catch (error) {
            next(error);
        }
    }

    // 2. Get Analytics data for instructors
    async getInstructorAnalytics(req, res, next) {
        try{
            const { courseId } = req.params;
            const analyticsData = await analyticsModel.getAnalyticsByCourse(courseId);
            res.status(200).json({ success: true, data: analyticsData });
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new AnalyticsController();