module.exports = function(app, db, upload) {
    app.post('/upload', upload.single('photo'), (req, res) => {
        console.log(req);
        if(req.file) {
            const image = { url: req.file.path,
                date: new Date().getTime(),
                credit: req.body.credit,
                place: req.body.place,
                desc: req.body.desc };
            db.collection('images').insert(image, (err, result) => {
                if (err) {
                    res.send({ 'error': 'An error has occurred' });
                } else {
                    res.send(result.ops[0]);
                }})
        }
        else throw 'error';
    });
    app.get('/images', (req, res) => {
       db.collection('images').find({}).toArray(function(error, documents) {
           if (error) throw error;

           res.send(documents);
       });
    });
};