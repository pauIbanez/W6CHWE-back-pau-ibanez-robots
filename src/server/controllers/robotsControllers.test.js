const Robot = require("../../database/models/Robot");
const errorTypes = require("../middlewares/errorHandlers/errorTypes");
const { getAllRobots, getRobot } = require("./robotsControllers");

jest.mock("../../database/models/Robot");

describe("Given getAllRobots", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("When it's invoked with a res and a next", () => {
    test("Then it should invoke json() of res and not next", async () => {
      const res = {
        json: jest.fn(),
      };

      const robots = ["sasdasda", "sqdasdasdsa"];

      const next = jest.fn();
      Robot.find = jest.fn().mockResolvedValue(robots);

      await getAllRobots(null, res, next);

      expect(Robot.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ robots });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("When it's invoked with a res and a next and find throws error", () => {
    test("Then it should invoke next() with the catched error", async () => {
      const error = new Error("haha u fucked");
      const next = jest.fn();
      Robot.find = jest.fn().mockRejectedValue(error);

      await getAllRobots(null, null, next);

      expect(Robot.find).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given getRobot", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("When it's invoked with req, res and next", () => {
    test("Then it should invoke json() of res and not next", async () => {
      const res = {
        json: jest.fn(),
      };
      const req = {
        params: {
          id: 3,
        },
      };

      const robot = { name: "equisde" };

      const next = jest.fn();
      Robot.findById = jest.fn().mockResolvedValue(robot);

      await getRobot(req, res, next);

      expect(Robot.findById).toHaveBeenCalledWith(req.params.id);
      expect(res.json).toHaveBeenCalledWith(robot);
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("When it's invoked with a req and  next and findById returns null", () => {
    test("Then it should invoke next() with an error with type missingId", async () => {
      const error = expect.objectContaining({
        type: errorTypes.missingId,
      });
      const req = {
        params: {
          id: 3,
        },
      };
      const next = jest.fn();
      Robot.findById = jest.fn().mockResolvedValue(null);

      await getRobot(req, null, next);

      expect(Robot.findById).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it's invoked with a req, a res and next and findById returns null", () => {
    test("Then it should invoke next() with an error with type missingId", async () => {
      const error = expect.objectContaining({
        type: errorTypes.missingId,
      });
      const req = {
        params: {
          id: 3,
        },
      };
      const next = jest.fn();
      const res = {
        json: jest.fn(),
      };

      Robot.findById = jest.fn().mockResolvedValue(null);

      await getRobot(req, null, next);

      expect(Robot.findById).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("When it's invoked with a req, a res and next and findById returns null", () => {
    test("Then it should invoke next() with an error with type missingId", async () => {
      const expectedError = expect.objectContaining({
        type: errorTypes.invalidId,
      });

      const error = new Error("tot bé");

      const req = {
        params: {
          id: 3,
        },
      };
      const next = jest.fn();
      const res = {
        json: jest.fn(),
      };

      Robot.findById = jest.fn().mockRejectedValue(error);

      await getRobot(req, null, next);

      expect(Robot.findById).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expectedError);
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});
