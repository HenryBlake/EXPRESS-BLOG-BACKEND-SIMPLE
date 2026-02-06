import {Router} from "express";
import {queryTest} from "../controller/testController.js";
import {jwtAuthentication} from "../middleware/jwtAuhMiddleware.js";
import authorizationMiddleware from "../middleware/authorizationMiddleware.js";
const router = Router();

router.use(jwtAuthentication)
router.get('/',(req,res,next)=>{
    res.json({'location':"Endpoint of test router",
    'title':'test router',
    'purpose':'Test anything we dont know'}
    )
}
)

router.get('/query-test',authorizationMiddleware,queryTest,(next,err)=>{
    if(err){
        next(err)
    }
})

export default router;