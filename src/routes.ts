import { Router } from "express";


import UserController from "./controllers/UserController";
import FollowerController from "./controllers/FollowerController";
import FollowingController from "./controllers/FollowingController";
import RepositoriesController from "./controllers/RepositoriesController";
import RepositorieStarsController from "./controllers/RepositorieStarsController";

import ensureAuthenticated from "./middlewares/ensureAuthenticated";

const router = Router();

const userControllers = new UserController();
const followerControllers = new FollowerController();
const followingControllers = new FollowingController();
const repositoriesControllers = new RepositoriesController();
const repositoriesStarsControllers = new RepositorieStarsController();

router.post("/users", userControllers.create);
router.get("/users/:id", userControllers.index)
//router.put("/users/:id", userControllers.update);
router.delete("/users/:id", userControllers.destroy);

router.get("/follower/:id", followerControllers.index);
router.post("/follower", followerControllers.create);
//router.put("/follower/:id", followerControllers.update);
//router.delete("/follower/:id", followerControllers.destroy);

router.get("/following/:id", followingControllers.index);
router.post("/following", followingControllers.create);
router.delete("/following/:id", followingControllers.destroy);
//router.put("/following/:id", followingControllers.update);

router.get("/repositories/:id", repositoriesControllers.index);
router.post("/repositories", repositoriesControllers.create);
router.delete("/repositories/:id", repositoriesControllers.destroy);
router.put("/repositories/:id", repositoriesControllers.update);

router.get("/repositoriesStars/:id", repositoriesStarsControllers.index);
router.post("/repositoriesStars/:id", repositoriesStarsControllers.create);
router.delete("/repositoriesStars/:id", repositoriesStarsControllers.destroy);
//router.put("/repositoriesStars/:id", repositoriesStarsControllers.update);

export { router };