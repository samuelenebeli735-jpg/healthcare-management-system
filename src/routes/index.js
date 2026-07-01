import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "SHMS API v1"
    });
});

export default router;