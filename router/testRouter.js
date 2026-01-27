import {Router} from "express";
import {queryTest} from "../controller/testController.js";
const router = Router();

router.get('/',(req,res,next)=>{
    res.json({'location':"Endpoint of test router",
    'title':'test router',
    'purpose':'Test anything we dont know'}
    )
}
)

router.get('/query-test',queryTest,(next,err)=>{
    if(err){
        next(err)
    }
})

export default router;