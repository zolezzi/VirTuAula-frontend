const axios = require("axios");
const lessonService = (function() {
    function completeTask(classroomId, lessonId, tasks) {
        return axios.post(`/lessons/${classroomId}/${lessonId}`, tasks);
    }

    return {
        completeTask: completeTask
    }
})();

module.exports = lessonService;