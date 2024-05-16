import express from "express";
import { putGoodsInBasket } from "./basket.service.js";
import { authMiddlewareUser } from "../auth/middleware/user.js";
import { getMyGoods } from "./basket.service.js";
import { deleteGoods } from "./basket.service.js";
const router = express.Router();
router.post("/catalogue/add-goods/:id", authMiddlewareUser, async (req, res) => {
    try {
        const result = await putGoodsInBasket(req.params.id, req.user.id);
        res.status(200).send("Здарова");
    }
    catch (error) {
        console.log(error);
    }
});
router.get("/catalogue/get-goods", authMiddlewareUser, async (req, res) => {
    const result = await getMyGoods(req.user.id);
    res.status(200).send(result);
});
router.get("/catalogue/delete-goods/:id", authMiddlewareUser, async (req, res) => {
    const result = await deleteGoods(req.params.id, req.user.id);
    res.send(result);
});
export default router;
//# sourceMappingURL=basket.controller.js.map