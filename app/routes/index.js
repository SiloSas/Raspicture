const noteRoutes = require('./note_routes');

module.exports = function(app, db, upload) {
    noteRoutes(app, db, upload);
    // Other route groups could go here, in the future
};