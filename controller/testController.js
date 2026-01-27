export function queryTest(req, res,next) {
    let query = req.query;
    if(Object.keys(query).length ===0){
        res.json({"message":"no matches"})
    }
    res.json(typeof query.value)


}