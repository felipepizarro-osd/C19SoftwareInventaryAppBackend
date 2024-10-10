import {Router} from 'express';
import {getOCS,createOC,searchOC} from "../controllers_pg/ocs.controller.pg";

const router = Router();

router.get("/postgres/all_ocs",getOCS);
router.post("/postgres/create_oc",createOC);
router.get("/postgres/ocs", searchOC);
export default router;
