const Robot = require("../../database/models/Robot");
const { getAllRobots } = require("./robotsControllers");

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
